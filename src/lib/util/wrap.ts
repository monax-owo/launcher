// TauriのAPI(Rust/TS)のラッパー関数をまとめるファイル
import { open as openWithTauri } from "@tauri-apps/api/shell";
import { invoke } from "@tauri-apps/api/tauri";

const open = async (path: string): Promise<void> => {
  // config ファイルから設定を読む or ユーザーが指定したサービスを使う
  await openWithTauri(path);
};

const mainWindowFocus = async () => {
  await invoke<void>("main_window_focus");
};

export { open, mainWindowFocus };
