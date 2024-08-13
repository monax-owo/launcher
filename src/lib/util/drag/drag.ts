import type { Action } from "svelte/action";

// interface E extends Element {}
type E = Element;

interface DraggableParam {
  grabbingCursor?: string;
  handles?: HandleElements | Array<E>;
  padding?: number;
  resizeble?: boolean;
  size?: [number, number];
  target?: HTMLElement;
  zindex?: number;
}

interface HandleElements {
  top: E;
  top_right: E;
  right: E;
  right_bottom: E;
  bottom: E;
  bottom_left: E;
  left: E;
  left_top: E;
}

const arrayToHandleElements = (array: Array<E>): HandleElements => {
  if (array.length === 4) {
    // [top, right, bottom, left];
    return {} as HandleElements;
  } else if (array.length === 8) {
    // [top, top_right, right, right_bottom, bottom, bottom_left, left, left_top];
    return {} as HandleElements;
  }
  throw new Error("array length is wrong");
};

// TODO: 初期状態を最小化にする
// TODO: ハンドルを掴んだときのヘルパー関数を作る
const draggable: Action<HTMLElement, DraggableParam> = (node, param) => {
  let target = param.target ?? node;

  let handles: HandleElements | null;
  if (param.handles) {
    handles = Array.isArray(param.handles) ? arrayToHandleElements(param.handles) : param.handles;
  } else {
    handles = null;
  }
  // TODO
  console.log(handles);

  const GRABBINGCURSOR = param.grabbingCursor ?? "grabbing";
  const PADDING = param.padding ?? 0;
  // const SIZE = param.size ?? [240, 120];
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

    const getClientPosX = (event: PointerEvent) => {
      return "clientX" in event ? event.clientX : 0;
    };

    const getClientPosY = (event: PointerEvent) => {
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
      const x = getClientPosX(e);
      const y = getClientPosY(e);
      move(x, y);
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const applyWidth = (value: number): void => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const applyHeight = (value: number): void => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const resize = (width: number, height: number): void => {};

  node.addEventListener("pointerdown", down);
  node.addEventListener("dragstart", (e) => e.preventDefault());

  return {
    update(param) {
      if (param.target) target = param.target;
      if (param.size) resize(param.size[0], param.size[1]);
    },
    destroy() {
      node.removeEventListener("pointerdown", down);
      node.removeEventListener("dragstart", (e) => e.preventDefault());
    },
  };
};

export { draggable };
