<script lang="ts">
  export let index: number;
  let shortcut = (): boolean => index >= 0;
</script>

<!-- TODO:クリックできるようにする -->
<div class="Result">
  <span on:click>
    <slot></slot>
  </span>
  <div class="code">
    {#if shortcut()}
      <kbd>{index}</kbd>
    {/if}
  </div>
</div>

<style lang="scss">
  .Result {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 1.6rem;
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
