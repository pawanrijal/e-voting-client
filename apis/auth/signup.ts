import { SignupFormValues } from "@/app/auth/signup/components/user-auth-form";
import { baseUrl } from "@/lib/utils";
import axios from "axios";

export const signup = async (data: SignupFormValues) => {
  let config = {
    method: "POST",
    url: `${baseUrl}/signup`,
    data: data,
  };
  return await axios.request(config);
};
