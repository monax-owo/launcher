import type { Procedures } from "$types/rspc/bindings";
import { createClient } from "@rspc/client";
import { TauriTransport } from "@rspc/tauri";

const client = createClient<Procedures>({
  transport: new TauriTransport(),
});

export { client };
