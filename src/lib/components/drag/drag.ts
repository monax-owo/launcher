import type { Action } from "svelte/action";

const draggable: Action<HTMLElement> = (node) => {
  const down = (e: PointerEvent) => {
    const target = e.currentTarget as HTMLElement;
    const parent = target.parentElement;
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

  node.addEventListener("pointerdown", down);
  node.addEventListener("dragstart", (e) => e.preventDefault());
};

export { draggable };
