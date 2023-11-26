import { baseUrl } from "@/lib/utils";
import axios from "axios";

export const findCandidateById = async (token: string, id: number) => {
  let config = {
    method: "GET",
    url: `${baseUrl}/candidate/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.request(config);
};
