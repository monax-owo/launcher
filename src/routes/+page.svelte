<script lang="ts">
  // import type { PageData } from './$types';
  // export let data: PageData;
  import Template from "$lib/components/Template.svelte";
  import { appWindow } from "@tauri-apps/api/window";
</script>

<Template>
  <div data-tauri-drag-region class="titlebar">
    <button
      class="titlebar-button"
      id="titlebar-minimize"
      on:click={() => appWindow.minimize()}>
      <img
        src="https://api.iconify.design/mdi:window-minimize.svg"
        alt="minimize" />
    </button>
    <button
      class="titlebar-button"
      id="titlebar-maximize"
      on:click={() => appWindow.maximize()}>
      <img
        src="https://api.iconify.design/mdi:window-maximize.svg"
        alt="maximize" />
    </button>
    <button
      class="titlebar-button"
      id="titlebar-close"
      on:click={() => appWindow.close()}>
      <img src="https://api.iconify.design/mdi:close.svg" alt="close" />
    </button>
  </div>
</Template>

<style lang="scss">
  .titlebar {
    display: flex;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    justify-content: flex-end;
    background: #329ea3;
    height: 30px;
    user-select: none;
  }
  .titlebar-button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
  }
  .titlebar-button:hover {
    background: #5bbec3;
  }
</style>
