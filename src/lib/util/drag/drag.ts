import type { Action } from "svelte/action";

type DraggableParam = {
  target?: HTMLElement;
  grabbingCursor?: string;
  padding?: number;
  zindex?: number;
};

const draggable: Action<HTMLElement, DraggableParam> = (node, param) => {
  let target = param.target === undefined ? node : param.target;
  const GRABBINGCURSOR = param.grabbingCursor ?? "grabbing";
  const PADDING = param.padding ?? 0;
  const ZINDEX = String(param.zindex ?? 9999);
  let aheadCursor: string;
  let aheadZindex: string;

  const down = (e: PointerEvent) => {
    const parent = target.parentElement;
    if (parent === null) throw new Error("");

    aheadCursor = node.style.cursor;
    aheadZindex = node.style.zIndex;

    // 上書きする？
    const parentRect = parent.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    const diffX = parentRect.left + e.clientX - targetRect.left;
    const diffY = parentRect.top + e.clientY - targetRect.top;

    const windowWidth = window.innerWidth;
    const browserHeight = window.innerHeight;

    const targetWidth = target.offsetWidth;
    const targetHeight = target.offsetHeight;

    const dragListen = (fn: (e: PointerEvent) => void) => {
      window.addEventListener("pointermove", fn);

      window.addEventListener("pointerleave", dragUnListen.bind(undefined, fn));
      window.addEventListener("pointerup", dragUnListen.bind(undefined, fn));
      window.addEventListener("pointercancel", dragUnListen.bind(undefined, fn));

      target.style.cursor = GRABBINGCURSOR;
      target.style.zIndex = ZINDEX;
    };

    const dragUnListen = (fn: (this: Window, e: PointerEvent) => void) => {
      window.removeEventListener("pointermove", fn);

      window.removeEventListener("pointerleave", dragUnListen.bind(undefined, fn));
      window.removeEventListener("pointerup", dragUnListen.bind(undefined, fn));
      window.removeEventListener("pointercancel", dragUnListen.bind(undefined, fn));

      target.style.cursor = aheadCursor;
      target.style.zIndex = aheadZindex;
    };

    const getPosX = (event: PointerEvent) => {
      return "clientX" in event ? event.clientX : 0;
    };

    const getPosY = (event: PointerEvent) => {
      return "clientY" in event ? event.clientY : 0;
    };

    const move = (x: number, y: number) => {
      let moveLeft = x - diffX;
      let moveTop = y - diffY;

      // up
      if (moveTop < PADDING) moveTop = PADDING;
      // down
      if (moveTop + targetHeight + PADDING > browserHeight)
        moveTop = browserHeight - targetHeight - PADDING;
      // left
      if (moveLeft < PADDING) moveLeft = PADDING;
      // right
      if (moveLeft + targetWidth + PADDING > windowWidth)
        moveLeft = windowWidth - targetWidth - PADDING;

      target.style.left = moveLeft + "px";
      target.style.top = moveTop + "px";
    };

    dragListen((e) => {
      const x = getPosX(e);
      const y = getPosY(e);
      move(x, y);
    });
  };

  node.addEventListener("pointerdown", down);
  node.addEventListener("dragstart", (e) => e.preventDefault());

  return {
    update(param) {
      if (param.target) target = param.target;
    },
    destroy() {
      node.removeEventListener("pointerdown", down);
      node.removeEventListener("dragstart", (e) => e.preventDefault());
    },
  };
};

export { draggable };
