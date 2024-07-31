<script lang="ts">
  // import type { PageData } from './$types';
  // export let data: PageData;
  import { Template } from "$lib/autoimport";
  import { enhance } from "$app/forms";
  import IconSearch from "@tabler/icons-svelte/IconSearch.svelte";
  import { open } from "@tauri-apps/api/shell";
  import type { SubmitFunction } from "@sveltejs/kit";
  let stroke = 2;
  const opener: SubmitFunction = ({ formData, cancel }) => {
    let query = formData.get("param");
    if (query == null) {
      cancel();
      return;
    }
    let param = encodeURIComponent(query.toString().trim());
    if (param === "") {
      cancel();
      return;
    }
    let url = `https://www.google.com/search?q=${param}`;
    open(url);
    cancel();
  };
</script>

<Template>
  <form class="search" method="post" use:enhance={opener}>
    <input type="text" class="search-box" autocomplete="off" name="param" />
    <div class="icon">
      <button type="submit"><IconSearch {stroke} /></button>
    </div>
  </form>
</Template>

<style lang="scss">
  // :global(.Template) {
  // display: flex;
  // align-content: center;
  // justify-content: center;
  // }
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
    font-size: 1rem;
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
