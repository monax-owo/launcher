<script lang="ts">
  import { draggable } from "$lib/util/drag/drag";

  export let borderSize: number = 1;
  export let handleSize: number = 12;
  export let initPos: [number, number] = [12, 12];
  export let padding: number = 0;
  export let resizeble: boolean = true;
  export let size: [number, number] = [400, 280];
  export let title: string = "no title";

  let [left, top] = initPos;
  // let [width, height] = size;
  let target: HTMLElement;
  let handles: HTMLElement[] = Array(8).fill(null);

  onMount(() => {
    target.style.left = left + "px";
    target.style.top = top + "px";
  });
</script>

<!-- TODO: dragのカーソルをどっちにするか決める -->
<!-- TODO: サイズ変更等 -->
<div class="root">
  <div class="home">
    <div
      class="widget"
      role="button"
      tabindex="0"
      bind:this={target}
      style:--b={borderSize + "px"}
      style:--h-size={handleSize + "px"}>
      <div class="header" use:draggable={{ handles, padding, size, target }}>
        <div class="header-title">{title}</div>
        <button type="button">X</button>
      </div>
      <div class="border" />
      <div class="content">
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
    display: flex;
    position: absolute;
    flex-flow: column nowrap;
    box-sizing: content-box;
    border: var(--b) solid var(--b-bg);
    border-radius: var(--b-radius);
    background-color: var(--bg);
    overflow: hidden;
    color: var(--text);

    --b: 0;
    --h-size: 0;
    --hs: calc(var(--h-size) + var(--b));
    --nhs: calc(calc(-1 * var(--hs)) + 4px);
    --pd: calc(var(--hs) + var(--nhs));

    & .header {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      cursor: grab;
      padding: 0 0.4rem;
      height: 1.4rem;
    }

    & .border {
      background-color: var(--b-bg);
      height: var(--b);
    }

    & .content {
      flex: 1;
      background-color: #fff !important;
      padding: 0 var(--pd) var(--pd);
      height: auto;
    }

    & > :is(.t, .r, .b, .l) {
      position: absolute;
    }

    // & > :is(.t, .b):is(.r, .l) {
    //
    // }

    & .y {
      left: 0;
      cursor: ns-resize;
      width: 100%;
    }

    & .x {
      top: 0;
      cursor: ew-resize;
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
