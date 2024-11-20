import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "5080bsxk",
  dataset: "production",
  apiVersion: "2023-11-17",
  useCdn: false, // Avoid CDN for authenticated requests
  token: process.env.SANITY_API_TOKEN, // Use environment variable for the token
});
