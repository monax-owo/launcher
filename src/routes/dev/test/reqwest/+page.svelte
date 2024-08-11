<script lang="ts">
  import { Template } from "$lib/imports";
  import { req } from "$lib/suggest/suggest";
  // throw new Error("boom");
  let res: string[];
  let q = "test";
  const handle = async () => {
    res = await req("google", q);
  };
</script>

<Template>
  <button type="button" on:click={handle}>click</button>
  <div>{JSON.stringify(res)}</div>
</Template>

<style lang="scss">
</style>
