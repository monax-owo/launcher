use reqwest::Client;
use tauri::{Manager, Runtime};

fn exit_0<R: Runtime>(app: tauri::AppHandle<R>, _window: tauri::Window<R>) {
  app
    .tray_handle()
    .destroy()
    .expect("Failed to remove tasktray icon");
  app.exit(0);
}

#[tauri::command]
pub fn exit<R: Runtime>(app: tauri::AppHandle<R>, window: tauri::Window<R>) {
  exit_0(app, window)
}

#[tauri::command]
pub async fn suggest<R: Runtime>(
  app: tauri::AppHandle<R>,
  _window: tauri::Window<R>,
  service: &str,
  query: &str,
) -> Result<Vec<String>, ()> {
  let client = app.state::<Client>().inner();
  Ok(crate::get_suggest(service, query, client).await.unwrap())
}
