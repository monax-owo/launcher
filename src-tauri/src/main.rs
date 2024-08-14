// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use reqwest::Client;
// use serde::{Deserialize, Serialize};
use std::os::raw::c_void;
use tauri::{
  CustomMenuItem, Manager, PhysicalPosition, PhysicalSize, SystemTray, SystemTrayEvent,
  SystemTrayMenu, Window, WindowEvent,
};

mod command;
mod suggest;

use command::*;
use suggest::*;

#[cfg(target_os = "windows")]
use windows::Win32::{
  Foundation::{BOOL, HWND},
  Graphics::Dwm::{DwmSetWindowAttribute, DWMWA_TRANSITIONS_FORCEDISABLED},
};

#[tokio::main]
async fn main() {
  #[cfg(debug_assertions)]
  tauri_specta::ts::export(
    specta::collect_types![
      // functions to export
    ],
    "../src/@types/generated/specta/bindings.d.ts",
  )
  .expect("failed to generate types");

  let builder = tauri::Builder::default();
  let client = Client::new();

  builder
    .setup(move |app| {
      let handle = app.handle();
      let main_window = app.get_window("main").expect("Failed to get main window");

      set_pos(&main_window);

      #[cfg(debug_assertions)]
      {
        main_window.open_devtools();
        println!("is dev");
        // main_window.set_ignore_cursor_events(true).unwrap();
        // ts側でbodyにカーソルが乗っているときだけtrueにする？
      }

      if cfg!(target_os = "windows") {
        if let Ok(hwnd) = main_window.hwnd() {
          unsafe {
            let _ = DwmSetWindowAttribute::<HWND>(
              std::mem::transmute(hwnd),
              DWMWA_TRANSITIONS_FORCEDISABLED,
              &mut BOOL::from(true) as *mut _ as *mut c_void,
              std::mem::size_of::<BOOL>() as u32,
            );
          }
        }
      }

      let tray_menu = SystemTrayMenu::new()
        .add_item(CustomMenuItem::new("show", "Show window"))
        .add_item(CustomMenuItem::new("quit", "Quit"));

      let _tray_handle = SystemTray::new()
        .with_menu(tray_menu)
        .on_event(move |e| match &e {
          SystemTrayEvent::LeftClick { .. } => {
            window_focus(&main_window).expect("failed to focusing main window")
          }
          SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
            "show" => window_focus(&main_window).expect("failed to focusing main window"),
            "quit" => exit_0(&handle).expect("Failed to remove tasktray icon"),
            &_ => (),
          },
          _ => (),
        })
        .build(app)?;
      Ok(())
    })
    .on_window_event(move |e| match e.event() {
      WindowEvent::Resized(_) => set_pos(e.window()),
      WindowEvent::Destroyed => println!("destroy!"),
      WindowEvent::Focused(focus) => {
        if *focus {
          println!("show");
        } else {
          e.window().hide().unwrap();
          println!("hide");
        }
      }
      _ => (),
    })
    .manage(client)
    .invoke_handler(tauri::generate_handler![exit, suggest, main_window_focus])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

fn set_pos(window: &Window) {
  const OFFSET: u32 = 1;
  let monitor = window.current_monitor().unwrap().unwrap();
  let monitor_size = monitor.size();
  let size = [
    monitor_size.width - (OFFSET * 2),
    monitor_size.height - (OFFSET * 2),
  ];
  let size = PhysicalSize::new(size[0], size[1]);
  let pos = PhysicalPosition::new(OFFSET, OFFSET);
  println!("{:?}", &size);
  println!("{:?}", &pos);
  window.set_size(size).expect("Failed to set size");
  window.set_position(pos).expect("Failed to set position");
  // 0,0だとYoutubeが止まる。原因不明。ウィンドウがかぶさると動画が再生されないようになっている？
  // |->1pxだけ隙間を開けた

  println!("set position");
}
