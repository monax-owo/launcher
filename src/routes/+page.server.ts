// import type { PageServerLoad } from './$types';

// export const load = (async () => {
//     return {};
// }) satisfies PageServerLoad;

import type { Actions, RequestEvent } from "./$types";

export const prerender = false;

export const actions = {
  default: async (e: RequestEvent) => {
    
  },
} satisfies Actions;
