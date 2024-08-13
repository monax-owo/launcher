<script lang="ts">
  import { draggable } from "$lib/util/drag/drag";

  export let unit: string = "px";
  export let initPos: [number, number] = [12, 12];
  export let size: [number, number] = [240, 120];
  export let padding: number = 0;
  export let resizeble: boolean = true;

  let [left, top] = initPos;
  // let [width, height] = size;
  let target: HTMLElement;
  let handles: HTMLElement[];

  onMount(() => {
    target.style.left = left + unit;
    target.style.top = top + unit;
  });

  // TODO:width height
  // $: if (resizeble) resize(width, height);
</script>

<!-- TODO:サイズ変更等 -->
<div class="root">
  <div class="home">
    <div class="widget" role="button" tabindex="0" bind:this={target}>
      <div class="header" use:draggable={{ target, padding, size }}></div>
      <div class="body">
        <slot></slot>
      </div>
      {#if resizeble}
        <div class="y t" bind:this={handles[0]} />
        <div class="x r" bind:this={handles[2]} />
        <div class="y b" bind:this={handles[4]} />
        <div class="x l" bind:this={handles[6]} />

        <div class="t r nesw" bind:this={handles[1]} />
        <div class="r b nwse" bind:this={handles[3]} />
        <div class="b l nesw" bind:this={handles[5]} />
        <div class="l t nwse" bind:this={handles[7]} />
      {/if}
    </div>
  </div>
</div>

<style lang="scss">
  @use "$lib/style/global.scss" as *;
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
    // top: 0;
    // left: 0;
    background-color: var(--bg);
    color: var(--text);
    // }

    // .widget {
    // position: absolute;
    // top: 0;
    // left: 0;
    // width: 100%;
    // height: 100%;
    // pointer-events: none;
    // var(--hs);
    // var(--nhs);
    --hs: 12px;
    --nhs: calc(-1 * var(--hs) / 2);
    & .header {
      cursor: grab;
      height: 1rem;
    }

    & > :not(.header, .body) {
      position: absolute;
      opacity: 0.5;
      background-color: #fff;
    }

    & > :is(.t, .b):is(.r, .l) {
      background-color: red;
    }

    & .y {
      left: 0;
      width: 100%;
      // height: var(--hs);
    }

    & .x {
      top: 0;
      // width: var(--hs);
      height: 100%;
    }

    & .t {
      top: var(--nhs);
      height: var(--hs);
    }

    & .r {
      right: var(--nhs);
      width: var(--hs);
    }

    & .b {
      bottom: var(--nhs);
      height: var(--hs);
    }

    & .l {
      left: var(--nhs);
      width: var(--hs);
    }

    & .nesw {
      cursor: nesw-resize;
    }

    & .nwse {
      cursor: nwse-resize;
    }
  }
</style>
