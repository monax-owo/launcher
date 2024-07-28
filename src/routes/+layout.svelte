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
  import { invoke, window } from "@tauri-apps/api";
  import { hide } from "@tauri-apps/api/app";
</script>

<svelte:window on:contextmenu|preventDefault />
<svelte:body
  on:click={async () => {
    await hide();
  }} />
<div id="app">
  <slot></slot>
</div>

<style lang="scss">
  :root {
    font-size: 20px;
  }
  :global(body) {
    background: color-mix(in srgb, var(--bg) var(--bg-alpha), transparent);
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
    width: 100vw;
    height: 100vh;
  }
</style>
