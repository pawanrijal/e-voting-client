import { baseUrl } from "@/lib/utils";
import axios from "axios";

export const getAllCandidates = async (token: string) => {
  let config = {
    method: "GET",
    url: `${baseUrl}/candidate`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.request(config);
};
