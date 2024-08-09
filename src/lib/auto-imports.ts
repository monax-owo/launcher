import { browser, dev } from "$app/environment";

const $ = browser ? document.querySelector.bind(document) : null;
const $$ = browser ? document.querySelectorAll.bind(document) : null;

const todo = () => {
  throw new Error("--------TODO--------");
};

const ifDev = <T = void>(fn: () => T): T => {
  return ifThen(dev, fn);
};

const ifThen = <T = void>(condition: boolean, fn: () => T): T => {
  if (condition) {
    return fn();
  } else {
    return undefined as T;
  }
};

export { $, $$, todo, ifDev, ifThen };
