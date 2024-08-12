<script lang="ts">
  import { draggable } from "$lib/util/drag/drag";
  export let unit: string = "px";
  export let initPos: [number, number] = [12, 12];
  let posX: number = initPos[0];
  let posY: number = initPos[1];
  let target: HTMLElement;
</script>

<!-- TODO:サイズ変更等 -->
<div class="area">
  <div
    class="widget"
    role="button"
    tabindex="0"
    bind:this={target}
    style:--pos-x={posX + unit}
    style:--pos-y={posY + unit}>
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
