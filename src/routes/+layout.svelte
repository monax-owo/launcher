<script lang="ts">
  // scss
  import "$lib/global.scss";
  import "$lib/util.scss";
  //
  // rest css
  import "sanitize.css/assets.css";
  import "sanitize.css/sanitize.css";
  // fonts
  // Montserrat
  // Supports weights 100-900
  import "@fontsource-variable/montserrat";
  // Noto Sans JP
  // Supports weights 100-900
  import "@fontsource-variable/noto-sans-jp";
  // Fira Code
  // Supports weights 300-700
  import "@fontsource-variable/fira-code";
  //
  import { app, invoke, window } from "@tauri-apps/api";
  import { appWindow } from "@tauri-apps/api/window";
</script>

<svelte:window on:contextmenu|preventDefault={() => console.log("contextmenu")} />
<svelte:body
  on:click={async () => {
    console.log("hide");
    await appWindow.hide();
  }} />

<div id="app">
  <slot></slot>
</div>

<style lang="scss">
  @use "$lib/global.scss" as *;
  :root {
    font-size: 20px;
  }
  :global(body) {
    background: #{Alpha(var(--bg), var(--bg-alpha))};
    overflow: hidden;
    scroll-behavior: smooth;
    scrollbar-gutter: auto;
    scrollbar-width: thin;
    user-select: none;
  }
  *::-webkit-scrollbar-track {
    border-radius: 1px;
    background-color: #e4e4e4;
  }
  #app {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    // pointer-events: none;
  }
</style>
