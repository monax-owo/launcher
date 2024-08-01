<script lang="ts">
  import { Template } from "$lib/autoimport";
  // import { fetch } from "@tauri-apps/api/http";
  import { Suggest } from "$lib/suggest/suggest";
  let location = "jp";
  const url = (text: string): string =>
    `https://www.google.com/complete/search?hl=${location}&q=${encodeURIComponent(text)}&output=toolbar` +
    "&" +
    obj2search({ client: "chrome" });
  const obj2search = (obj: { [x: string]: any }) =>
    Object.keys(obj)
      .map((key) => `${key}=${obj[key]}`)
      .join("&");
  class Google {
    public static getSuggest(text: string) {
      return (async () =>
        await fetch(url(text), { mode: "no-cors" })
          .then(async (res) => {
            console.log(await res.text());
            const cs = res.headers.get("content-type");
            const decoder = new TextDecoder("utf-8");
            const buffer = await res.arrayBuffer();
            const text = decoder.decode(buffer);
            return text;
          })
          .then((text) => text)
          .then((v) => v))();
    }
  }
</script>

<Template>
  <div>
    {(async () => await Google.getSuggest("sample"))()}
  </div>
  <a href={url("aaaaa")} target="_blank" rel="noopener noreferrer">test</a>
</Template>

<style lang="scss">
</style>
