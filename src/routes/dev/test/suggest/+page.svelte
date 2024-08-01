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
        await fetch(url(text), { method: "get", mode: "no-cors" })
          .then(async (res) => {
            const ct = res.headers.get("content-type");
            const {
              parameters: { charset },
            } = parse(ct || "text/plain");
            await res.text().then((v) => console.log(v));
            const decoder = new TextDecoder("utf-8");
            const buf = await res.arrayBuffer();
            const text = decoder.decode(buf);
            return text;
          })
          .then((text) => JSON.parse(text)))();
      return res;
    }
  }
  let result: any = "def";
  onMount(() => {
    (async () =>
      Google.getSuggest("sample").then(
        (v) => {
          result = v[1];
          console.log(v);
        },
        (v) => {
          console.error("error", v);
        }
      ))();
  });
</script>

<Template>
  <div>
    {result}
  </div>
  <a href={url("aaaaa")} target="_blank" rel="noopener noreferrer">test</a>
</Template>

<style lang="scss">
</style>
