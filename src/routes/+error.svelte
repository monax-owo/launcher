<script lang="ts">
  import { Template } from "$lib/imports";
  import { page } from "$app/stores";
</script>

<Template>
  <h1>{$page.status}: {$page.error?.message}</h1>
</Template>

<style lang="scss">
</style>
