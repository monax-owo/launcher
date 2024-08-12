<script lang="ts">
  import { draggable } from "$lib/util/drag/drag";
  let tar: HTMLElement;
</script>

<!-- TODO:サイズ変更等 -->
<div class="area">
  <div class="widget" role="button" tabindex="0" bind:this={tar}>
    <div class="drag" use:draggable={tar}></div>
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
    cursor: grab;
    background-color: var(--bg);
    padding: 1rem;
    color: var(--text);
    & .drag {
      height: 1rem;
    }
  }
</style>
