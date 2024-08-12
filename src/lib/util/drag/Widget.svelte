<script lang="ts">
  import { draggable } from "$lib/util/drag/drag";
  let target: HTMLElement;
  let posXpx: number = 12;
  let posYpx: number = 12;
</script>

<!-- TODO:サイズ変更等 -->
<div class="area">
  <div class="widget" role="button" tabindex="0" bind:this={target}>
    <div class="grab" use:draggable={{ target }}></div>
    <slot></slot>
  </div>
</div>

<style lang="scss">
  .area {
    position: relative;
    width: 0;
    height: 0;
  }
  .widget {
    position: absolute;
    top: 0;
    left: 0;
    background-color: var(--bg);
    padding: 1rem;
    color: var(--text);
    & .grab {
      cursor: grab;
      height: 1rem;
    }
  }
</style>
