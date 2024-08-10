import { browser, dev } from "$app/environment";

const $ = browser ? document.querySelector.bind(document) : null;
const $$ = browser ? document.querySelectorAll.bind(document) : null;

const todo = () => {
  throw new Error("--------TODO--------");
};

const ifThen = <T = void>(condition: boolean, successFn: () => T, failureFn?: () => T): T => {
  if (condition) {
    return successFn();
  } else {
    return failureFn === undefined ? (undefined as T) : failureFn();
  }
};

const ifDev = <T = void>(fn: () => T): T => {
  return ifThen<T>(dev, fn);
};

export { $, $$, todo, ifThen, ifDev };
