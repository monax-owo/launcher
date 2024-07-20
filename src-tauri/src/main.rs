// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{
  CustomMenuItem, LogicalPosition, Manager, SystemTray, SystemTrayMenu, Window, WindowEvent,
};

fn main() {
  let system_tray = SystemTray::new()
    .with_menu(SystemTrayMenu::new().add_item(CustomMenuItem::new("test", "title")));

  let set_pos = |window: &Window| {
    let monitor = Window::current_monitor(window).unwrap().unwrap();
    let monitor_size = &monitor.size();
    let window_size = window.outer_size().unwrap();

    window
      .set_position(LogicalPosition::<u32>::new(
        (monitor_size.width - window_size.width) / 2,
        (monitor_size.height - window_size.height) / 2,
      ))
      .expect("resize");
    println!("set position");
  };

  let app = tauri::Builder::default();
  app
    .system_tray(system_tray)
    .setup(move |app| {
      let window = app.get_window("main").unwrap();
      set_pos(&window);

      Ok(())
    })
    .on_window_event(move |e| match e.event() {
      WindowEvent::ScaleFactorChanged { .. } => set_pos(&e.window()),
      _ => (),
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
