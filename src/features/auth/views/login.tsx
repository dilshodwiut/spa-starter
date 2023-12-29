import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "@/contexts";
import { login } from "../api";

export default function Login(): React.ReactElement {
  const navigate = useNavigate();
  const { setIsAuth } = useAuthContext();
  const { t } = useTranslation();

  const { mutate, isLoading } = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      localStorage.setItem("refresh_token", res.refresh);
      localStorage.setItem("access_token", res.access);
      setIsAuth(true);
      navigate("/");
    },
    onError: (error: any) => {
      //  handle error
    },
  });

  return <div>login</div>;
}
