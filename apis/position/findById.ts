import { baseUrl } from "@/lib/utils";
import axios from "axios";

export const findPositionById = async (token: string, id: number) => {
  let config = {
    method: "GET",
    url: `${baseUrl}/position/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.request(config);
};
