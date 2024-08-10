import shell from "@tauri-apps/api/shell";

const open = async (path: string): Promise<void> => {
  await shell.open(path, "google");
};

export { open };
