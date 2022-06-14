import { useGetCurrentUserQuery } from "@grinn/graphql-generated";
import { useEffect } from "react";
import { useRouter } from "next/router";

export const useCheckAuthentication = (
  role: "admin" | "user" | "bank",
  redirectUrl?: string
) => {
  const { data, loading, refetch } = useGetCurrentUserQuery({});
  const router = useRouter();

  useEffect(() => {
    if (!data?.currentUser?.id && !loading) {
      router.replace("/auth");
    }
    if (data?.currentUser?.isAdmin === false && role === "admin") {
      router.replace(redirectUrl || "/");
    }
  }, [data?.currentUser, loading]);
};
