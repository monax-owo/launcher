<script lang="ts">
  import { Template } from "$lib/imports";
  import { page } from "$app/stores";
  const routes = {
    "/reqwest": "Reqwest",
    "/suggest": "Suggest",
  };
</script>

<Template>
  <ul>
    {#each Object.entries(routes) as [href, v]}
      <li><a href={$page.url.pathname + href}>{v}</a></li>
    {/each}
  </ul>
</Template>

<style lang="scss">
</style>
