import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const baseUrl = "http://localhost:3000/api";

export const getElectionStatus = (status: number) => {
  return status === 1 ? "Active" : "InActive";
};
