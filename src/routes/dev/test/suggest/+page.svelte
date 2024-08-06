<script lang="ts" async>
  import { Template } from "$lib/autoimport";
  import { Suggest } from "$lib/suggest/suggest";
  import { parse } from "fast-content-type-parse";

  {
    // # できません
    // # バックエンドでやります
    // let location = "jp";
    // const url = (text: string) =>
    //   `https://suggestqueries.google.com/complete/search?output=toolbar&client=chrome&hl=${location}&q=${encodeURIComponent(text)}`;
    // const init: RequestInit = {
    //   mode: "cors",
    //   headers: {
    //     referer: "https://m.youtube.com/?app=m&persist_app=1",
    //     credentials: "omit",
    //   },
    // };
    // class Google {
    //   public static async getSuggest(text: string) {
    //     const res = await fetch(url(text), init).then(async (res) => {
    //       // const ct = res.headers.get("content-type");
    //       // const {
    //       //   parameters: { charset },
    //       // } = parse(ct || "text/plain");
    //       // const dec = new TextDecoder(charset);
    //       // const buf = await res.arrayBuffer();
    //       // const text = dec.decode(buf);
    //       // return text;
    //       // return JSON.parse(`{${await res}}`);
    //       return res;
    //     });
    //     return res;
    //   }
    // }
    // (async () => {
    //   Google.getSuggest("a").then((v) => {
    //     console.log(v);
    //   });
    //   await fetch(
    //     "https://suggestqueries.google.com/complete/search?output=toolbar&client=gws-wiz-serp&hl=jp&q=a",
    //     { mode: "no-cors" }
    //   ).then(async (v) => {
    //     console.log(v);
    //   });
    // })();
  }
</script>

<Template>
  <div>
    <!-- {result} -->
  </div>
  <a href={url("aaaaa")} target="_blank" rel="noopener noreferrer">test</a>
</Template>

<style lang="scss">
</style>
