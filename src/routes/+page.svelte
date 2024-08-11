<script lang="ts">
  // import type { PageData } from './$types';
  // export let data: PageData;
  import { Template } from "$lib/imports";
  import { enhance } from "$app/forms";
  import IconSearch from "@tabler/icons-svelte/IconSearch.svelte";
  import { open } from "@tauri-apps/api/shell";
  import type { SubmitFunction } from "@sveltejs/kit";
  import { req } from "$lib/suggest/suggest";
  import SearchResult from "$lib/suggest/SearchResult.svelte";
  import { listen, TauriEvent, type UnlistenFn } from "@tauri-apps/api/event";
  import { dev } from "$app/environment";
  import { base } from "$app/paths";

  let stroke: number = 2;

  // suggest
  let searchInput: HTMLInputElement;
  let searchText: string = "";
  let results: string[] = [];
  let ahead = "";

  $: (async () => {
    let trim = searchText.trim();
    if (trim !== "" && trim !== ahead)
      results = await req("google", searchText).catch(() => [
        "t",
        "e",
        "s",
        "t",
        "lune",
        "T",
        "E",
        "S",
        "T",
      ]);
    if (searchText == "") results = [];
    ahead = trim;
    // TODO: run only when tarui dev
    // ifThen(false, () => {
    //   results = ["abc", "abcマート", "ssssssssssssssss", "aweadawd"];
    // });
  })();

  let unlisten: UnlistenFn;

  (async () => {
    unlisten = await listen<string>(TauriEvent.WINDOW_FOCUS, () => {
      console.log("WINDOW_FOCUS");
      searchInput.focus();
    });
  })();

  onDestroy(() => {
    unlisten();
    console.log("destroy");
  });

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
      <SearchResult {results}></SearchResult>
    </div>
  </div>
  {#if dev}
    <div class="widget">
      <div class="one"><a href="{base}/dev/test">test</a></div>
    </div>
  {/if}
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

  .widget {
    position: absolute;
    & > div {
      position: relative;
    }
    & .one {
      left: 10px;
    }
  }
</style>
