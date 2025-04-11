import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "sjvie6s3", // Replace with your actual project ID
  dataset: "production", // Replace with your dataset name
  useCdn: true, // Set to false if you want fresh data on every request
  apiVersion: "2023-01-01", // Use the latest API version
});

export default client;
