import { open as openWithTauri } from "@tauri-apps/api/shell";

const open = async (path: string): Promise<void> => {
  // config ファイルから設定を読む or ユーザーが指定したサービスを使う
  await openWithTauri(path, "google");
};

export { open };
