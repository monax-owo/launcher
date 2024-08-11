<script lang="ts">
  const down = (e: PointerEvent & { currentTarget: EventTarget & HTMLDivElement }) => {
    let target = e.currentTarget as HTMLElement;
    let parent = target.parentElement;
    if (parent === null) throw new Error("");
    const shiftX =
      parent.getBoundingClientRect().left + e.clientX - target.getBoundingClientRect().left;
    const shiftY =
      parent.getBoundingClientRect().top + e.clientY - target.getBoundingClientRect().top;
    const setPos = (x: number, y: number) => {
      target.style.left = x - shiftX + "px";
      target.style.top = y - shiftY + "px";
    };
    const move = (e: MouseEvent) => {
      setPos(e.pageX, e.pageY);
    };
    const clear = () => {
      target.style.cursor = "move";
      document.removeEventListener("pointermove", move);
      target.removeEventListener("pointerup", clear);
    };
    document.addEventListener("pointermove", move);
    target.addEventListener("pointerup", clear);
  };
</script>

<div class="Draggable">
  <div
    class="drag"
    role="button"
    tabindex="0"
    on:pointerdown={down}
    on:dragstart={(e) => e.preventDefault()}>
    <slot></slot>
  </div>
</div>

<style lang="scss">
  .Draggable {
    position: relative;
    width: 0;
    height: 0;
  }
  .drag {
    position: absolute;
    top: 0;
    left: 0;
    cursor: grab;
    background-color: var(--bg);
    padding: 1rem;
    color: var(--text);
  }
</style>
