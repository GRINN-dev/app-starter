import { NextPage } from "next";
import { useRouter } from "next/router";
import { LoginForm, LoginFormData } from "@grinn/components";
import {
  useAuthenticateMutation,
  useGetCurrentUserLazyQuery,
  useGetCurrentUserQuery,
  useGenerateAuthTokenMutation,
} from "@grinn/graphql-generated";
import { getAccessToken, setAccessToken } from "../lib/accessToken";

const AuthPage: NextPage = () => {
  const router = useRouter();
  const [getAuthToken] = useGenerateAuthTokenMutation();
  const [authenticate] = useAuthenticateMutation();
  const [loadCurrentUser] = useGetCurrentUserLazyQuery({});

  return (
    <div className="flex justify-center">
      <LoginForm
        onSubmit={async (data: LoginFormData) => {
          const { data: res } = await getAuthToken({
            variables: { input: data },
          });
          const { access_token } = res.generateAuthToken;
          console.log(
            "🚀 ~ file: auth.tsx ~ line 23 ~ onSubmit={ ~ jwt",
            access_token
          );
          console.log("auth");
          setAccessToken(access_token);
          console.log("auth get tok : ", getAccessToken());
          //localStorage.setItem("token", access_token);

          loadCurrentUser({
            /*
            context: {
              Headers: { Authorization: "Bearer " + jwt },
            },
            */
            fetchPolicy: "network-only",
          }).then(data => {
            console.log("user", data);
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
