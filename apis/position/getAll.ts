import { baseUrl } from "@/lib/utils";
import axios from "axios";

export const getAllPositions = async (token: string) => {
  let config = {
    method: "GET",
    url: `${baseUrl}/position`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.request(config);
};
