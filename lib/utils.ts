import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const baseUrl = "http://localhost:3000/api";

export const getElectionStatus = (status: number) => {
  return status === 1 ? "Active" : "InActive";
};

export const getCandidateStatus = (status: number) => {
  switch (status) {
    case -1:
      return "Rejected";
    case 0:
      return "Pending";
    case 1:
      return "Accepted";
  }
};

export const getInitials = (name: string): string => {
  const words: string[] = name.split(/\s+/);
  let initials: string = "";
  for (const word of words) {
    initials += word.charAt(0).toUpperCase();
  }

  return initials;
};
