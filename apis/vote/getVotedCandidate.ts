import { baseUrl } from "@/lib/utils";
import axios from "axios";

export const getVotedCandidate = async (token: string, positionId: number) => {
  let config = {
    method: "GET",
    url: `${baseUrl}/get-voted-candidate/${positionId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.request(config);
};
