import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

export const api = axios.create({
  baseURL: ""
});

export function useClerkToken() {
  const { getToken } = useAuth();
  return async () => await getToken({ template: "default" });
}
