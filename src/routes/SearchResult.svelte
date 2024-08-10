<script lang="ts">
  import Result from "./Result.svelte";

  export let results: string[];
</script>

<!-- if svelte5 then move to snippets -->
<ul class="search-results">
  {#each results as result, index}
    <Result index={++index}>{result}</Result>
  {/each}
</ul>

<style lang="scss">
  .search-results {
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
</style>
