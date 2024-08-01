import { fetch } from "@tauri-apps/api/http";
import { type Suggest } from "./suggest";

const url = (text: string) =>
  `https://www.google.com/complete/search?q=${text}`;

export class Google implements Suggest {
  async getSuggest(text: string): Promise<string[]> {
    let res = await fetch(url(text), {
      method: "GET",
    });
    return ["todo"];
  }
}
