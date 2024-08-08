import { invoke } from "@tauri-apps/api/tauri";

namespace suggest {
  export const req = async (service: string, query: string): Promise<string[]> =>
    invoke<string[]>("suggest", { service, query }).then((v) => {
      console.log(v);
      return v;
    });
}
export default suggest;
