import { open } from "$lib/util/wrap";
import { invoke } from "@tauri-apps/api/tauri";

// TODO:rspc
type Service = string;

const req = async (service: Service, text: string): Promise<string[]> => {
  const query = text.trim();
  if (query == "") throw new Error("text is empty");
  return invoke<string[]>("suggest", { service, query });
};

const linkMap = new Map(
  Object.entries({
    google: "https://google.com/search?q=",
  })
);

const getLink = (service: Service): string => {
  for (const [k, v] of linkMap) {
    if (k === service) {
      return v;
    }
  }
  throw new Error("service is wrong");
};

const openInService = (service: Service, query: string) => {
  open(getLink(service) + encodeURIComponent(query));
};

export { req, getLink, openInService };
