import { baseUrl } from "@/lib/utils";
import axios from "axios";

export const findElectionById = async (token: string, id: number) => {
  let config = {
    method: "GET",
    url: `${baseUrl}/election/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.request(config);
};
