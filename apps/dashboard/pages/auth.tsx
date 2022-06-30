import { NextPage } from "next";
import { useRouter } from "next/router";
import { LoginForm, LoginFormData } from "@grinn/components";
import {
  useAuthenticateMutation,
  useGetCurrentUserLazyQuery,
  useGetCurrentUserQuery,
} from "@grinn/graphql-generated";
import { useContext } from "react";
import { TokenContext } from "@grinn/lib";

const AuthPage: NextPage = () => {
  const router = useRouter();
  const [authenticate] = useAuthenticateMutation();
  const [loadCurrentUser] = useGetCurrentUserLazyQuery({});
  const { accessToken, setAccessToken } = useContext(TokenContext);
  return (
    <div className="flex justify-center">
      <LoginForm
        onSubmit={async (data: LoginFormData) => {
          const { data: res } = await authenticate({
            variables: { input: data },
          });
          const { access_token } = res.authenticate;
          console.log(
            "🚀 ~ file: auth.tsx ~ line 23 ~ onSubmit={ ~ jwt",
            access_token
          );
          setAccessToken(access_token);

          loadCurrentUser({
            fetchPolicy: "network-only",
          }).then(data => {
            !data?.data?.currentUser?.isAdmin
              ? router.replace("/dashboard")
              : router.replace("/dashboard-admin");
          });
        }}
      />
    </div>
  );
};

export default AuthPage;
