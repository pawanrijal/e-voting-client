import { baseUrl } from "@/lib/utils";
import axios from "axios";

export const getAllElections = async (token: string) => {
  let config = {
    method: "GET",
    url: `${baseUrl}/election`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.request(config);
};
