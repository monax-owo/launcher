<script lang="ts">
  import { Template } from "$lib/autoimport";
  // import { fetch } from "@tauri-apps/api/http";
  import { Suggest } from "$lib/suggest/suggest";
  import { parse } from "fast-content-type-parse";
  let location = "jp";
  const url = (text: string): string =>
    `https://www.google.com/complete/search?gl=${location}&q=${encodeURIComponent(text)}&output=toolbar` +
    "&" +
    obj2search({ client: "chrome" });
  const obj2search = (obj: { [x: string]: any }) =>
    Object.keys(obj)
      .map((key) => `${key}=${obj[key]}`)
      .join("&");
  class Google {
    public static getSuggest(text: string): Promise<any> {
      const res = (async () =>
        await fetch(url(text), { method: "get", mode: "no-cors" }).then(
          async (res) => await res.text()
        ))();
      return res;
    }
  }
  let result: string = await Google.getSuggest("ssssssss");
</script>

<Template>
  <div>
    {result}
  </div>
  <a href={url("aaaaa")} target="_blank" rel="noopener noreferrer">test</a>
</Template>

<style lang="scss">
</style>
