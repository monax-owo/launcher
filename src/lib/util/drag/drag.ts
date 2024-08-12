import type { Action } from "svelte/action";

type DraggableParam = {
  target?: HTMLElement;
  grabbingCursor?: string;
};

const draggable: Action<HTMLElement, DraggableParam> = (node, param) => {
  //
  let target = param.target === undefined ? node : param.target;
  const grabbingCursor = param.grabbingCursor ?? "grabbing";
  let aheadCursor: string;
  let aheadZindex: string;
  //
  const down = (e: PointerEvent) => {
    const parent = target.parentElement;

    if (parent === null) throw new Error("");

    aheadCursor = node.style.cursor;
    aheadZindex = node.style.zIndex;

    const parentRect = parent.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    const diffX = parentRect.left + e.clientX - targetRect.left;
    const diffY = parentRect.top + e.clientY - targetRect.top;

    console.log(parentRect.left, e.clientX, targetRect.left, diffX);
    console.log(parentRect.top, e.clientY, targetRect.top, diffY);

    const setPos = (x: number, y: number) => {
      if (true) target.style.left = x - diffX + "px";
      if (true) target.style.top = y - diffY + "px";
    };

    const move = (e: MouseEvent) => {
      setPos(e.pageX, e.pageY);
    };

    const reset = () => {
      node.style.cursor = aheadCursor;
      node.style.zIndex = aheadZindex;
      document.removeEventListener("pointermove", move);
      target.removeEventListener("pointerup", reset);
    };

    node.style.cursor = grabbingCursor;
    node.style.zIndex = "9999";
    document.addEventListener("pointermove", move);
    node.addEventListener("pointerup", reset);
  };

  node.addEventListener("pointerdown", down);
  node.addEventListener("dragstart", (e) => e.preventDefault());

  return {
    update(param) {
      if (param.target) target = param.target;
    },
  };
};

export { draggable };
