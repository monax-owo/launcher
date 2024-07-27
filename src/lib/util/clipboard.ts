import type { Action } from "svelte/action";
// TODO: クリップボードAPIはtauriにもあるので必要になったらそっちにする

const copyText = (text: string): void => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      //
    })
    .catch((err) => {
      //
    });
};

const pasteText = (): void => {
  navigator.clipboard
    .readText()
    .then(() => {
      //
    })
    .catch((err) => {
      //
    });
};

const clickCopy: Action<HTMLElement, string> = (node, text) => {
  const handleCopy = () => {
    copyText(text);
    console.log(text);
  };
  node.addEventListener("click", handleCopy);
  return {
    destroy() {
      node.removeEventListener("click", handleCopy);
    },
    update(newText) {
      text = newText;
    },
  };
};

// たぶんいらない
const clickPaste: Action = (node) => {
  node.addEventListener("click", () => {
    pasteText();
  });
  return {
    destroy() {},
  };
};

export { copyText, pasteText, clickCopy, clickPaste };
