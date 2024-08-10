<script lang="ts">
  // import type { PageData } from './$types';
  // export let data: PageData;
  import { Template } from "$lib/imports";
  import { enhance } from "$app/forms";
  import IconSearch from "@tabler/icons-svelte/IconSearch.svelte";
  import { open } from "@tauri-apps/api/shell";
  import type { SubmitFunction } from "@sveltejs/kit";
  import Result from "./Result.svelte";
  import suggest from "$lib/suggest";
  import { ifThen } from "$lib/auto-imports";

  let stroke: number = 2;

  // suggest
  let showResults = true;
  let searchInput: HTMLInputElement;
  let searchText: string = "";
  let results: string[] = [];
  let ahead = "";

  $: (async () => {
    let trim = searchText.trim();
    if (trim !== "" && trim !== ahead) results = await suggest.req("google", searchText);
    if (searchText == "") results = [];
    ahead = trim;
    ifThen(true, () => {
      results = ["aaaaaaaaaaaaa", "afefsfsfsf", "ssssssssssssssss", "aweadawd"];
    });
  })();

  const opener: SubmitFunction = ({ cancel }) => {
    let param = encodeURIComponent(searchText.trim());
    if (param === "") {
      cancel();
      return;
    }
    let url = `https://www.google.com/search?q=${param}`;
    open(url);
    cancel();
  };
  // suggest
</script>

<!--  -->
<Template>
  <div class="search">
    <form class="search-input" method="post" use:enhance={opener}>
      <input
        autocomplete="off"
        bind:this={searchInput}
        bind:value={searchText}
        class="search-box"
        type="text"
        name="param" />
      <div class="icon">
        <button type="submit"><IconSearch {stroke} /></button>
      </div>
    </form>
    <div>
      {#if showResults}
        <ul class="search-results">
          {#each results as result, index}
            <Result index={++index}>{result}</Result>
          {/each}
        </ul>
      {/if}
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
      margin: 0 0.4rem;
      background: inherit;
      list-style: none;
      // Only when a child element
      &:global(:has(> li)) {
        border-top: solid var(--b-bg) 1px;
        padding: 0.2rem 0;
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
