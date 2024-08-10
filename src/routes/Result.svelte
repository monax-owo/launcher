<script lang="ts">
  export let index: number;
  let shortcut = (): boolean => index >= 0;
</script>

<!-- TODO:クリックできるようにする -->
<li class="Result">
  <button type="button" class="reset-button" on:click>
    <slot></slot>
  </button>
  <div class="code">
    {#if shortcut()}
      <kbd>{index}</kbd>
    {/if}
  </div>
</li>

<style lang="scss">
  @use "$lib/style/global.scss" as *;
  .Result {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 1.6rem;
    & button {
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
