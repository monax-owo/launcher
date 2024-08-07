<script lang="ts">
  import { Template } from "$lib/autoimport";
  import { page } from "$app/stores";
  import { base } from "$app/paths";
  const routes = {
    "/reqwest": "Reqwest",
    "/suggest": "Suggest",
  };
</script>

<Template>
  <ul>
    {#each Object.entries(routes) as [href, v]}
      <li><a href={base + $page.route.id + href}>{v}</a></li>
    {/each}
  </ul>
</Template>

<style lang="scss">
</style>
