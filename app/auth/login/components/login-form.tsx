"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { login } from "@/apis/auth/login";

const passwordSchema = z.string().min(8);

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: passwordSchema,
});

export type LoginFormValues = z.infer<typeof formSchema>;

interface LoginProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Login({ className, ...props }: LoginProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    console.log("submitted data", data);
    try {
      const response = await login(data);
      console.log("login response", response);
      if (response.data.status === 200) {

        localStorage.setItem("auth_token", response.data.data.token);
        // router.push("/");
        if (!response.data.data.verified) {
          toast.success("Please verify your email address.");
          router.push("/auth/verify-otp");
        }
        else {
          toast.success("Login Successfully");
          router.push("/");
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (err: any) {
      console.log("login error", err);
      toast.error(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
  });

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="" htmlFor="email">
              Enter Email
            </Label>
            <Input
              {...register("email", { required: true })}
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
            {errors?.email && (
              <p className="text-red-600 text-sm">{errors?.email?.message}</p>
            )}
          </div>
          <div className="grid gap-1 my-2">
            <Label className="" htmlFor="email">
              Enter Password
            </Label>
            <Input
              {...register("password", { required: true })}
              id="password"
              placeholder=".........."
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
            />
            {errors?.password && (
              <p className="text-red-600 text-sm">
                {errors?.password?.message}
              </p>
            )}
          </div>

          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Login
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
      </div>
    </div>
  );
}
