// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{
  CustomMenuItem, LogicalPosition, Manager, PhysicalSize, Runtime, SystemTray, SystemTrayEvent,
  SystemTrayMenu, Window, WindowEvent,
};

fn main() {
  let builder = tauri::Builder::default();

  let set_pos = |window: &Window| {
    let monitor = Window::current_monitor(window).unwrap().unwrap();
    let monitor_size = monitor.size();
    let window_size = &window.outer_size().unwrap();
    let pos = size(monitor_size, window_size);

    window.set_position(pos).expect("Failed to resize");
    println!("set position");
  };

  builder
    .setup(move |app| {
      let handle = app.handle();
      let main_window = app.get_window("main").expect("Failed to get main window");
      set_pos(&main_window);
      let _tray_handle = SystemTray::new()
        .with_menu(
          SystemTrayMenu::new()
            .add_item(CustomMenuItem::new("test", "Title"))
            .add_item(CustomMenuItem::new("show", "Show window"))
            .add_item(CustomMenuItem::new("quit", "Quit")),
        )
        .on_event(move |e| match e {
          SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
            "test" => println!("{id}"),
            "show" => main_window
              .set_focus()
              .expect("Failed to focus for main window"),
            "quit" => handle.exit(0),
            &_ => (),
          },
          _ => (),
        })
        .build(app)?;

      Ok(())
    })
    .on_window_event(move |e| match e.event() {
      WindowEvent::Resized(_) => set_pos(&e.window()),
      WindowEvent::Destroyed => println!("destroy!"),
      WindowEvent::ScaleFactorChanged { .. } => set_pos(&e.window()),
      _ => (),
    })
    .invoke_handler(tauri::generate_handler![exit])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

fn exit_0<R: Runtime>(app: tauri::AppHandle<R>, _window: tauri::Window<R>) {
  app
    .tray_handle()
    .destroy()
    .expect("Failed to remove tasktray icon");
  app.exit(0);
}
#[tauri::command]
fn exit<R: Runtime>(app: tauri::AppHandle<R>, window: tauri::Window<R>) {
  exit_0(app, window)
}

fn size(pm: &PhysicalSize<u32>, pw: &PhysicalSize<u32>) -> LogicalPosition<f64> {
  const SCALE: f64 = 1.0;
  let m: tauri::LogicalSize<i32> = pm.to_logical(SCALE);
  let w: tauri::LogicalSize<i32> = pw.to_logical(SCALE);
  let val = [m.width, m.height, w.width, w.height];
  let default_value = || -> LogicalPosition<f64> { LogicalPosition::new(20.0, 20.0) };
  for v in &val {
    if *v <= 1 {
      return default_value();
    }
  }
  LogicalPosition::from([
    (&m.width / 2) - (&w.width / 2),
    (&m.height / 2) - (&w.height / 2),
  ])

  // if true {
  //   println!("equal");
  //   return Ok([&a.width / 2 - &b.width / 2, (&a.height - &b.height) / 2]);
  // };
}
// モニター.width / 2 - ウィンドウ.width / 2
