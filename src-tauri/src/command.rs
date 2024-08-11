use reqwest::Client;
use tauri::{AppHandle, Manager, Runtime, Window};

pub fn exit_0<R: Runtime>(handle: &AppHandle<R>) -> anyhow::Result<()> {
  handle.tray_handle().destroy()?;
  handle.exit(0);
  Ok(())
}

#[tauri::command]
pub fn exit<R: Runtime>(app: AppHandle<R>, _window: Window<R>) -> Result<(), String> {
  exit_0(&app).map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn suggest<R: Runtime>(
  app: AppHandle<R>,
  _window: Window<R>,
  service: &str,
  query: &str,
) -> Result<Vec<String>, String> {
  let client = app.state::<Client>().inner();
  crate::get_suggest(service, query, client)
    .await
    .map_err(|e| e.to_string())
}

pub fn window_focus<R: Runtime>(window: &Window<R>) -> anyhow::Result<()> {
  window.show()?;
  window.set_focus()?;
  Ok(())
}

#[tauri::command]
pub async fn main_window_focus<R: Runtime>(
  _app: AppHandle<R>,
  window: Window<R>,
) -> Result<(), String> {
  window_focus(&window).map_err(|e| e.to_string())?;
  Ok(())
}
