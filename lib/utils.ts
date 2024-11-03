import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fix_latex(input: string) {
  input = input.replace(/&/g, "\\&");
  input = input.replace(/\$/g, "\\$");

  return input;
}
