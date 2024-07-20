// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{CustomMenuItem, SystemTray, SystemTrayMenu};

fn main() {
  let system_tray = SystemTray::new()
    .with_menu(SystemTrayMenu::new().add_item(CustomMenuItem::new("test", "title")));

  tauri::Builder::default()
    .system_tray(system_tray)
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
