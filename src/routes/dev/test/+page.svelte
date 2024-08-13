<script lang="ts">
  import { Template } from "$lib/imports";
  import { page } from "$app/stores";
  const routes = {
    "/drag": "Drag",
    "/suggest": "Suggest",
  };
</script>

<Template>
  <h1>テストページ</h1>
  <div>機能の実装が終わったら消す</div>
  <ul>
    {#each Object.entries(routes) as [href, v]}
      <li><a href={$page.url.pathname + href}>{v}</a></li>
    {/each}
  </ul>
</Template>

<style lang="scss">
</style>
