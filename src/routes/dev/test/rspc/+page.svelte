<script lang="ts">
  import { Template } from "$lib/imports";
  import { client } from "$lib/util/rspc/rspc";

  let test: string;
  (async () => {
    test = await client.query(["greet", "test name"]);
  })();
</script>

<Template><span>{test}</span></Template>

<style lang="scss">
</style>
