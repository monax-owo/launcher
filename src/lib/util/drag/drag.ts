import type { Action } from "svelte/action";
const draggable: Action<HTMLElement, HTMLElement | undefined> = (node, target) => {
  let tar = target === undefined ? node : target;
  const down = (e: PointerEvent) => {
    const parent = tar.parentElement;
    if (parent === null) throw new Error("");
    const shiftX =
      parent.getBoundingClientRect().left + e.clientX - tar.getBoundingClientRect().left;
    const shiftY = parent.getBoundingClientRect().top + e.clientY - tar.getBoundingClientRect().top;
    const setPos = (x: number, y: number) => {
      tar.style.left = x - shiftX + "px";
      tar.style.top = y - shiftY + "px";
    };
    const move = (e: MouseEvent) => {
      setPos(e.pageX, e.pageY);
    };
    const clear = () => {
      tar.style.cursor = "move";
      document.removeEventListener("pointermove", move);
      tar.removeEventListener("pointerup", clear);
    };
    document.addEventListener("pointermove", move);
    node.addEventListener("pointerup", clear);
  };
  node.addEventListener("pointerdown", down);
  node.addEventListener("dragstart", (e) => e.preventDefault());
  return {
    update(param) {
      if (param) tar = param;
    },
  };
};

export { draggable };
