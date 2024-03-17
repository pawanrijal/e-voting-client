import { Metadata } from "next";
import "@/app/globals.css";
import { InputOTPForm } from "./components/otp-form";


export const metadata: Metadata = {
    title: "Otp Verififcation",
    description: "OTP Verification form.",
};

export default function AuthenticationPage() {
    return (
        <div className="flex justify-center mt-20">
            <InputOTPForm />
        </div>
    );
}
