// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{CustomMenuItem, LogicalPosition, Manager, SystemTray, SystemTrayMenu, Window};

fn main() {
  let system_tray = SystemTray::new()
    .with_menu(SystemTrayMenu::new().add_item(CustomMenuItem::new("test", "title")));
  // let set_pos = | window | {}
  tauri::Builder::default()
    .system_tray(system_tray)
    .setup(|app| {
      let window = app.get_window("main").unwrap();
      let monitor = Window::current_monitor(&window).unwrap().unwrap();
      let monitor_size = &monitor.size();
      // let [width, height] = [256, 128];
      let window_size = window.outer_size().unwrap();
      let set_pos = || {
        window
          .set_position(LogicalPosition::<u32>::new(
            (monitor_size.width - window_size.width) / 2,
            (monitor_size.height - window_size.height) / 2,
          ))
          .unwrap();
      };
      set_pos();
      Ok(())
    })
    .on_window_event(|e| match e.event() {
      // WindowEvent::Resized(_) => set_pos(),
      _ => (),
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
