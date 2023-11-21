import { LoginFormValues } from "@/app/auth/login/components/login-form";
import { baseUrl } from "@/lib/utils";
import axios from "axios";

export const login = async (data: LoginFormValues) => {
  let config = {
    method: "POST",
    url: `${baseUrl}/login`,
    data: data,
  };
  return await axios.request(config);
};
