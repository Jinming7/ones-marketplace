import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT ?? 4000),
  elasticsearchNode: process.env.ELASTICSEARCH_NODE ?? "http://localhost:9200",
  elasticsearchAppIndex: process.env.ELASTICSEARCH_APP_INDEX ?? "apps"
};
