<script lang="ts">
  import Result from "$lib/suggest/Result.svelte";
  import { openInService } from "$lib/suggest/suggest";

  export let results: string[];

  const handleOpen = async (e: MouseEvent) => {
    let el = e.currentTarget as HTMLElement;
    let data_href = el.getAttribute("data-href");
    if (data_href === null) throw new Error("data-href is null");
    openInService("google", data_href);
  };
</script>

<!-- if svelte5 then move to snippets -->
{#if results.length !== 0}
  <!-- TODO:border -->
  <div></div>
{/if}
<ul class="search-results">
  {#each results as result, index}
    <li>
      <Result
        index={++index}
        on:click={(e) => {
          handleOpen(e);
        }}
        href={result}>{result}</Result>
    </li>
  {/each}
</ul>

<style lang="scss">
  .search-results {
    display: block;
    margin: 0 0.4rem;
    background: inherit;
    list-style: none;
    // Only when a child element
    &:has(> li) {
      border-top: solid var(--b-bg) 1px;
      padding: 0.2rem 0;
    }
  }
</style>
