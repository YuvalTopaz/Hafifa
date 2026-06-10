import { login } from "../api";

export const useLogin = () => {
  const loginUser = async (
    email: string,
    password: string
  ) => {
    return await login(email, password);
  };

  return { loginUser };
};