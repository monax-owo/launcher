<script lang="ts">
  // import type { PageData } from './$types';
  // export let data: PageData;
  import { Template } from "$lib/autoimport";
  import { enhance } from "$app/forms";
  import IconSearch from "@tabler/icons-svelte/IconSearch.svelte";
  import { open } from "@tauri-apps/api/shell";
  import type { SubmitFunction } from "@sveltejs/kit";
  import Result from "./Result.svelte";
  import { base } from "$app/paths";

  let stroke: number = 2;

  let searhText: string = "";

  let results = ["aaa", "aaaaannn", "uuuu"];

  const opener: SubmitFunction = ({ cancel }) => {
    let param = encodeURIComponent(searhText.trim());
    if (param === "") {
      cancel();
      return;
    }
    let url = `https://www.google.com/search?q=${param}`;
    open(url);
    cancel();
  };
</script>

<!--  -->
<Template>
  <div class="search">
    <form class="search-input" method="post" use:enhance={opener}>
      <input
        autocomplete="off"
        bind:value={searhText}
        class="search-box"
        type="text"
        name="param" />
      <div class="icon">
        <button type="submit"><IconSearch {stroke} /></button>
      </div>
    </form>
    <div>
      <ul class="search-results">
        <li>
          <a href="{base}/dev">dev</a>
        </li>
        <li>
          <a href="{base}/dev/test">test</a>
        </li>
        {#each results as result, index}
          <li><Result {index}>{result}</Result></li>
        {/each}
      </ul>
    </div>
  </div>
</Template>

<style lang="scss">
  :global(:root) {
    --search-height: 2rem;
    --search-radius: calc(var(--search-height) / 4);
  }
  .search {
    box-sizing: content-box;
    border: solid var(--b-bg) 1px;
    border-radius: var(--search-radius);
    background-color: var(--bg);
    padding: 0 0;
    width: 14rem;
    color: var(--text);
    &-input {
      display: flex;
      justify-content: space-between;
      align-self: center;
      padding-left: 0.6rem;
      height: var(--search-height);
    }
    &-box {
      display: inline-block;
      outline: none;
      border: none;
      background-color: inherit;
      padding: 0;
      width: 100%;
      color: inherit;
      font-size: 1rem;
    }
    &-results {
      display: block;
      margin: 0;
      background: inherit;
      padding: 0 0.6rem;
      list-style: none;
      & :first-child {
        display: block;
        border-top: 1px solid;
        // border-style: solid;
        border-color: var(--b-bg);
      }
    }
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
