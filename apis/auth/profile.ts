import { baseUrl } from "@/lib/utils";
import axios from "axios";

export const getProfile = async (token: string) => {
  let config = {
    method: "GET",
    url: `${baseUrl}/user`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.request(config);
};
