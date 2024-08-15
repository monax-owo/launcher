import type { Action } from "svelte/action";

// interface E extends HTMLElement {}
type E = HTMLElement;

interface DraggableParam {
  grabbingCursor?: string;
  handles?: HandleElements;
  padding?: number;
  resizeble?: boolean;
  size?: [number, number];
  target?: HTMLElement;
  zindex?: number;
}

interface HandleElementsReq {
  top: E;
  top_right: E;
  right: E;
  right_bottom: E;
  bottom: E;
  bottom_left: E;
  left: E;
  left_top?: E;
}

export type HandleElements = Partial<HandleElementsReq>;

// TODO: 呼び出し元に操作用の関数を渡す(返す)？
// TODO: 初期状態を最小化にする
// TODO: ハンドルを掴んだときのヘルパー関数を作る
const draggable: Action<HTMLElement, DraggableParam> = (node, param) => {
  let target = param.target ?? node;
  let handles = param.handles;

  const GRABBINGCURSOR = param.grabbingCursor ?? "grabbing";
  const PADDING = param.padding ?? 0;
  const ZINDEX = String(param.zindex ?? 9999);

  let aheadCursor: string;
  let aheadZindex: string;

  // window
  let windowWidth: number;
  let windowHeight: number;
  const handleWindowResize = () => {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
  };
  handleWindowResize();
  window.addEventListener("resize", handleWindowResize);
  // window

  // pointerdown
  const down = (e: PointerEvent) => {
    const parent = target.parentElement;
    if (parent === null) throw new Error("");

    aheadCursor = node.style.cursor;
    aheadZindex = node.style.zIndex;

    const parentRect = parent.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    const diffX = parentRect.left + e.clientX - targetRect.left;
    const diffY = parentRect.top + e.clientY - targetRect.top;

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

    const move = (x: number, y: number) => {
      let moveLeft = x - diffX;
      let moveTop = y - diffY;

      // 別の関数に切り離す？
      // up
      if (moveTop < PADDING) moveTop = PADDING;
      // down
      if (moveTop + targetHeight + PADDING > windowHeight)
        moveTop = windowHeight - targetHeight - PADDING;
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
  // pointerdown

  // handle
  // dragListenとヘルパーだけでいい？
  const helperX = (e: PointerEvent): [number, number, number] => {
    const base = getClientPosX(e);
    const width = parseInt(getComputedStyle(target).width);
    const left = parseInt(getComputedStyle(target).left);
    return [base, width, left];
  };

  const helperY = (e: PointerEvent): [number, number, number] => {
    const base = getClientPosY(e);
    const height = parseInt(getComputedStyle(target).height);
    const top = parseInt(getComputedStyle(target).top);
    return [base, height, top];
  };

  type HandleHandleBar = (e: PointerEvent) => void;
  const handle: Record<string, HandleHandleBar> = {
    top: (e) => console.log(e),
    top_right: () => {},
    right: (e) => {
      helperX(e);
    },
    right_bottom: () => {},
    bottom: (e) => {
      helperY(e);
    },
    bottom_left: () => {},
    left: () => {},
    left_top: () => {},
  } as const;

  const resizeListen = () => {
    if (handles) {
      handles.top?.addEventListener("pointerdown", handle.top);
      handles.top_right?.addEventListener("pointerdown", handle.top_right);
      handles.right?.addEventListener("pointerdown", handle.right);
      handles.right_bottom?.addEventListener("pointerdown", handle.right_bottom);
      handles.bottom?.addEventListener("pointerdown", handle.bottom);
      handles.bottom_left?.addEventListener("pointerdown", handle.bottom_left);
      handles.left?.addEventListener("pointerdown", handle.left);
      handles.left_top?.addEventListener("pointerdown", handle.left_top);
    }
  };

  const resizeUnListen = () => {
    if (handles) {
      handles.top?.removeEventListener("pointerdown", handle.top);
      handles.top_right?.removeEventListener("pointerdown", handle.top_right);
      handles.right?.removeEventListener("pointerdown", handle.right);
      handles.right_bottom?.removeEventListener("pointerdown", handle.right_bottom);
      handles.bottom?.removeEventListener("pointerdown", handle.bottom);
      handles.bottom_left?.removeEventListener("pointerdown", handle.bottom_left);
      handles.left?.removeEventListener("pointerdown", handle.left);
      handles.left_top?.removeEventListener("pointerdown", handle.left_top);
    }
  };
  // handle

  // util
  const getClientPosX = (event: PointerEvent) => {
    return "clientX" in event ? event.clientX : 0;
  };

  const getClientPosY = (event: PointerEvent) => {
    return "clientY" in event ? event.clientY : 0;
  };

  const applyWidth = (value: number): void => {
    if (value > windowWidth) value = windowWidth;
    target.style.width = value + "px";
  };

  const applyHeight = (value: number): void => {
    if (value > windowHeight) value = windowHeight;
    target.style.height = value + "px";
  };

  const resize = (width: number, height: number): void => {
    applyWidth(width);
    applyHeight(height);
  };
  // util

  node.addEventListener("pointerdown", down);
  node.addEventListener("dragstart", (e) => e.preventDefault());

  return {
    update(param) {
      if (param.target && param.target !== target) target = param.target;
      if (param.size) resize(param.size[0], param.size[1]);
      if (param.handles) {
        resizeUnListen();
        handles = param.handles;
        resizeListen();
      }
    },
    destroy() {
      node.removeEventListener("pointerdown", down);
      node.removeEventListener("dragstart", (e) => e.preventDefault());
      window.removeEventListener("resize", handleWindowResize);
      resizeUnListen();
    },
  };
};

export { draggable };
