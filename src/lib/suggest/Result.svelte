<script lang="ts">
  export let index: number;
  export let href: string;
  let shortcut = (): boolean => index >= 0;
</script>

<!-- TODO:クリックできるようにする -->
<button type="button" class="Result reset-button" on:click data-href={href}>
  <span>
    <slot></slot>
  </span>
  <div class="code">
    {#if shortcut()}
      <kbd>{index}</kbd>
    {/if}
  </div>
</button>

<style lang="scss">
  @use "$lib/style/global.scss" as *;
  .Result {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 1.6rem;
    &:hover {
      background-color: #{Lightest(var(--bg), 80%)};
    }
    & span {
      margin: 0 0.4rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    & .code {
      display: flex;
      justify-content: center;
      width: 1.6rem;
    }
  }
</style>
