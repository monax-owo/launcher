<script lang="ts">
  import { Template } from "$lib/autoimport";
  import { invoke } from "@tauri-apps/api/tauri";
  let result: string;
  const req = (query: string) => {
    invoke("suggest", { service: "google", query: query }).then((v) => {
      result = v as string;
    });
  };
</script>

<Template>
  <button type="button" on:click={() => req("abc")}>click</button>
  <pre>{JSON.stringify(result)}</pre>
</Template>

<style lang="scss">
</style>
