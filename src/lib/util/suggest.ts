import { invoke } from "@tauri-apps/api/tauri";

const req = async (service: string, text: string): Promise<string[]> => {
  const query = text.trim();
  if (query == "") throw new Error("text is empty");
  return await invoke<string[]>("suggest", { service, query });
};

export { req };
