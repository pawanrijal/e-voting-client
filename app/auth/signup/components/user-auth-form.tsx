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
import { signup } from "@/apis/auth/signup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const passwordSchema = z.string().min(8);

const formSchema = z.object({
  fullName: z.string().min(4),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: passwordSchema,
  confirmPassword: passwordSchema.refine(
    (data: any) => data.confirmPassword === data.password,
    {
      message: "Passwords don't match",
    }
  ),
});

export type SignupFormValues = z.infer<typeof formSchema>;

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();

  async function onSubmit(data: SignupFormValues) {
    setIsLoading(true);
    console.log("submitted data", data);
    try {
      const response = await signup(data);
      console.log("signup response", response);
      if (response.data.status === 200) {
        toast.success("Signup Successfully");
        router.push("/auth/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (err: any) {
      console.log("signup error", err);
      toast.error(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(formSchema),
  });

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="" htmlFor="fullName">
              Enter Full Name
            </Label>
            <Input
              {...register("fullName", { required: true })}
              id="fullName"
              placeholder="John Doe"
              type="fullName"
              autoCapitalize="none"
              autoComplete="fullName"
              autoCorrect="off"
              disabled={isLoading}
            />
            {errors?.fullName && (
              <p className="text-red-600 text-sm">
                {errors?.fullName?.message}
              </p>
            )}
          </div>
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
          <div className="grid gap-1 my-2">
            <Label className="" htmlFor="email">
              Confirm Password
            </Label>
            <Input
              {...register("confirmPassword", { required: true })}
              id="confirmPassword"
              placeholder=".........."
              type="password"
              autoCapitalize="none"
              autoComplete="confirmPassword"
              autoCorrect="off"
              disabled={isLoading}
            />
            {errors?.confirmPassword && (
              <p className="text-red-600 text-sm">
                {errors?.confirmPassword?.message}
              </p>
            )}
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign Up
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
