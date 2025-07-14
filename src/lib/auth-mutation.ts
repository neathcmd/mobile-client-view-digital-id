import { useMutation } from "@tanstack/react-query";
import { AuthRegisterForm } from "@/types/auth-type";
import { AuthregisterUser } from "@/lib/api/auth-api";

export const useRegisterMutation = () =>
  useMutation({
    mutationFn: (data: AuthRegisterForm) => AuthregisterUser(data),
  });
