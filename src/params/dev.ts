import type { ParamMatcher } from "@sveltejs/kit";
import { dev } from "$app/environment";

export const match: ParamMatcher = (param) => {
  return dev;
};
