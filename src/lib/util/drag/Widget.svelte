<script lang="ts">
  import { draggable } from "$lib/util/drag/drag";
  let target: HTMLElement;
  export let initPos: [number, number];
  let posX: number = initPos[0] ?? 12;
  let posY: number = initPos[1] ?? 12;
</script>

<!-- TODO:サイズ変更等 -->
<div class="area">
  <div
    class="widget"
    role="button"
    tabindex="0"
    bind:this={target}
    style:--pos-x={posX}
    style:--pos-y={posY}>
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
