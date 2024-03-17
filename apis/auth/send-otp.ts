
import { baseUrl } from "@/lib/utils";
import axios from "axios";

export const verifyOtp = async (data: { pin: string }) => {
    let config = {
        method: "POST",
        url: `${baseUrl}/verify-otp`,
        data: { otp: data.pin },
    };
    return await axios.request(config);
};
