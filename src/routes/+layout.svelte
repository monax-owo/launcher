<script lang="ts">
  import { invoke } from "@tauri-apps/api";
  // import type { LayoutData } from "./$types";
  // export let data: LayoutData;
  import { appWindow } from "@tauri-apps/api/window";

  // false = max
  // true = unmax
  let isFull: boolean = true;

  const handleMaxim = async (event: MouseEvent) => {
    isFull = await appWindow.isVisible();
    if (await appWindow.isVisible()) {
      appWindow.show();
    } else {
      appWindow.hide();
    }
  };
  const handleExit = async () => {
    await invoke("exit");
  };
</script>

<div id="app">
  <div data-tauri-drag-region class="titlebar">
    <button
      class="titlebar-button"
      id="titlebar-minimize"
      on:click={() => appWindow.hide()}>
      <img
        src="https://api.iconify.design/mdi:window-minimize.svg"
        alt="minimize" />
    </button>
    <button
      class="titlebar-button"
      id="titlebar-maximize"
      on:click={handleMaxim}>
      {#if isFull}
        <img
          src="https://api.iconify.design/mdi:window-maximize.svg"
          alt="maximize" />
      {:else}
        <img src="" alt="unmaximize" />
      {/if}
    </button>
    <button class="titlebar-button" id="titlebar-close" on:click={handleExit}>
      <img src="https://api.iconify.design/mdi:close.svg" alt="close" />
    </button>
  </div>
  <slot></slot>
</div>

<style lang="scss">
  .titlebar {
    display: flex;
    // position: fixed;
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
