<script lang="ts">
  // import type { PageData } from './$types';
  // export let data: PageData;
  import { Template } from "$lib/autoimport";
  import IconSearch from "@tabler/icons-svelte/IconSearch.svelte";
  let count: number = 0;
  let stroke = 2;
</script>

<Template>
  <form class="search" use:enchance>
    <input type="text" class="search-box" autocomplete="off" />
    <div class="icon">
      <button type="button"><IconSearch {stroke} /></button>
    </div>
  </form>
</Template>

<style lang="scss">
  :global(.Template) {
    display: flex;
    align-content: center;
    justify-content: center;
  }
  .search {
    display: flex;
    justify-content: space-between;
    align-self: center;
    border: solid white 1px;
    border-radius: 2rem;
    background-color: var(--bg);
    padding: 0 0;
    padding-left: 1rem;
    width: 14rem;
    height: 2rem;
    // overflow: hidden;
    color: var(--text);
  }
  .search-box {
    display: inline-block;
    outline: none;
    border: none;
    background-color: inherit;
    padding: 0;
    width: 100%;
    color: inherit;
    font-size: 1.2rem;
  }
  .icon {
    display: inline-block;
    align-self: center;
    & button {
      appearance: none;
      border: none;
      background-color: transparent;
      padding: 0;
      width: 2rem;
      height: 2rem;
      color: inherit;
    }
  }
</style>
