import axios from "axios";

export const useAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_INVOICE_API_URL,
});
