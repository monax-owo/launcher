<script lang="ts">
  import { draggable } from "$lib/util/drag/drag";

  export let unit: string = "px";
  export let initPos: [number, number] = [12, 12];
  export let size: [number, number] = [240, 120];
  export let padding: number = 0;

  let [left, top] = initPos;
  let [width, height] = size;

  onMount(() => {
    target.style.left = left + unit;
    target.style.top = top + unit;
  });

  // TODO:width height
  $: () => {};

  let target: HTMLElement;
</script>

<!-- TODO:サイズ変更等 -->
<div class="root">
  <div class="home">
    <div class="widget" role="button" tabindex="0" bind:this={target}>
      <div class="header" use:draggable={{ target, padding }}></div>
      <div class="body">
        <slot></slot>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .root {
    position: fixed;
    top: 0;
    left: 0;
  }

  .home {
    position: relative;
    width: 0;
    height: 0;
  }

  .widget {
    position: absolute;
    top: 0;
    left: 0;
    background-color: var(--bg);
    color: var(--text);
    & .header {
      cursor: grab;
      height: 1rem;
    }
  }
</style>
