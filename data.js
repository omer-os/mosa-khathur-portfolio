import { createClient } from "next-sanity";
import ImageUrlBuilder from "@sanity/image-url";

const config = {
  projectId: "qqiv4thh",
  dataset: "production",
  useCdn: false,
  apiVersion: "2022-12-27",
};
export const client = createClient(config);

const builder = ImageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
