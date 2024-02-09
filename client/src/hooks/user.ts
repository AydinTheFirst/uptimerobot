import { Routes, http } from "@/http";
import { useEffect, useState } from "react";

export const useUser = () => {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await http.get(Routes.Auth.Me, {});
        localStorage.setItem("user", JSON.stringify(res));
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    };
    if (localStorage.getItem("token")) fetch();
  }, []);

  return [user, setUser];
};
