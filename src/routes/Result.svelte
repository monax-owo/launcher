<script lang="ts">
  export let index: number;
  let shortcut = (): boolean => index >= 0;
</script>

<div class="Result">
  <span>
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
    & span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
</style>
