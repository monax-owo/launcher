<script lang="ts">
  import { draggable, type HandleElements } from "$lib/util/drag/drag";
  import IconMinus from "@tabler/icons-svelte/IconMinus.svelte";
  // import IconMaximize from "@tabler/icons-svelte/IconMaximize.svelte";
  import IconRectangle from "@tabler/icons-svelte/IconRectangle.svelte";
  import IconX from "@tabler/icons-svelte/IconX.svelte";

  export let borderSize: number = 1;
  export let handleSize: number = 12;
  export let initPos: [number, number] = [12, 12];
  export let padding: number = 0;
  export let resizeble: boolean = true;
  export let size: [number, number] = [400, 280];
  export let title: string = "no title";

  const stroke = 2;

  let [left, top] = initPos;
  // let [width, height] = size;
  let target: HTMLElement;
  const handles: HandleElements = {};

  onMount(() => {
    target.style.left = left + "px";
    target.style.top = top + "px";
  });
</script>

<!-- TODO: dragのカーソルをどっちにするか決める -->
<!-- TODO: サイズ変更等 -->
<div class="root">
  <div
    class="widget"
    role="button"
    tabindex="0"
    bind:this={target}
    style:--b={borderSize + "px"}
    style:--h-size={handleSize + "px"}>
    <div class="body">
      <div class="header" use:draggable={{ handles, padding, size, target }}>
        <div class="header-title">{title}</div>
        <div class="container" on:pointerdown|stopPropagation={() => {}}>
          <button type="button"><IconMinus {stroke} /></button>
          <!-- <button type="button"><IconMaximize {stroke} /></button> -->
          <button type="button"><IconRectangle {stroke} /></button>
          <button type="button"><IconX {stroke} /></button>
        </div>
      </div>
      <div class="border" />
      <div class="content">
        <slot></slot>
      </div>
    </div>
    {#if resizeble}
      <div class="y t" bind:this={handles.top} />
      <div class="x r" bind:this={handles.right} />
      <div class="y b" bind:this={handles.bottom} />
      <div class="x l" bind:this={handles.left} />

      <div class="t r nesw" bind:this={handles.top_right} />
      <div class="r b nwse" bind:this={handles.right_bottom} />
      <div class="b l nesw" bind:this={handles.bottom_left} />
      <div class="l t nwse" bind:this={handles.left_top} />
    {/if}
  </div>
</div>

<style lang="scss">
  @use "$lib/style/global.scss" as *;
  .root {
    position: fixed;
    top: 0;
    left: 0;
  }

  .widget {
    position: relative;
    box-sizing: content-box;
    --b: 0;
    --h-size: 0;
    --hs: calc(var(--h-size) + var(--b));
    --nhs: calc(calc(-1 * var(--hs)) + 4px);
    --pd: calc(var(--hs) + var(--nhs));

    & .body {
      display: flex;
      position: absolute;
      flex-flow: column nowrap;
      box-sizing: content-box;
      border: var(--b) solid var(--b-bg);
      border-radius: var(--b-radius);
      background-color: var(--bg);
      width: 100%;
      height: 100%;
      overflow: clip;
      color: var(--text);
      & .header {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        cursor: grab;
        padding: 0.2rem 0.4rem;
        & .container {
          display: flex;
          flex-flow: row nowrap;
          justify-content: center;
          gap: 0.4rem;
          & button {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
          }
        }
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
