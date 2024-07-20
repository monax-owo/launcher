// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{
  CustomMenuItem, LogicalPosition, LogicalSize, Manager, SystemTray, SystemTrayMenu, Window,
};

fn main() {
  let system_tray = SystemTray::new()
    .with_menu(SystemTrayMenu::new().add_item(CustomMenuItem::new("test", "title")));

  tauri::Builder::default()
    .system_tray(system_tray)
    .setup(|app| {
      const WIDTH: u32 = 256;
      const HEIGHT: u32 = 128;
      let window = app.get_window("main").unwrap();
      let monitor = Window::current_monitor(&window).unwrap().unwrap();
      let monitor_size = &monitor.size();
      window.set_size(LogicalSize::new(WIDTH, HEIGHT)).unwrap();
      window
        .set_position(LogicalPosition::<u32>::new(
          (monitor_size.width - WIDTH) / 2,
          (monitor_size.height - HEIGHT) / 2,
        ))
        .unwrap();
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
