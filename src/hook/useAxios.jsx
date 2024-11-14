import axios from "axios";
import { HTTP } from "./useEnv";

export const useAxios = () => axios.create({baseURL:HTTP})