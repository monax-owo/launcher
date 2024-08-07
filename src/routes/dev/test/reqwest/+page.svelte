<script lang="ts">
  import { Template } from "$lib/autoimport";
  import { invoke } from "@tauri-apps/api/tauri";
  let result: string[];
  const req = (service: string, query: string) => {
    let temp;
    invoke("suggest", { service, query }).then((v) => {
      // v = json
      result = JSON.parse(v as string);
      console.log(result);
    });
  };
</script>

<Template>
  <button type="button" on:click={() => req("google", "abc")}>click</button>
  <div>{JSON.stringify(result)}</div>
</Template>

<style lang="scss">
</style>
