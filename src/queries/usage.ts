import { useQuery } from "@tanstack/react-query";
import { api } from "../utils/api";

interface UsageResult {
  channel_id: string;
  message_count: string;
  summary_count: string;
}

export const useUsage = () => {
  return useQuery(["usage"], async () => {
    return api.url("/.netlify/functions/get-usage").get().json<UsageResult[]>();
  });
};
