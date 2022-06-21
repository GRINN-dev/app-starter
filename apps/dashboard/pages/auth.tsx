import { NextPage } from "next";
import { useRouter } from "next/router";
import { LoginForm, LoginFormData } from "@grinn/components";
import {
  useAuthenticateMutation,
  useGetCurrentUserLazyQuery,
  useGetCurrentUserQuery,
} from "@grinn/graphql-generated";

const AuthPage: NextPage = () => {
  const router = useRouter();
  const [authenticate] = useAuthenticateMutation();
  const [loadCurrentUser] = useGetCurrentUserLazyQuery({});

  return (
    <div className="flex justify-center">
      <LoginForm
        onSubmit={async (data: LoginFormData) => {
          const { data: res } = await authenticate({
            variables: { input: data },
          });
          const { jwt } = res.authenticate;
          console.log("🚀 ~ file: auth.tsx ~ line 23 ~ onSubmit={ ~ jwt", jwt);
          localStorage.setItem("token", jwt);

          loadCurrentUser({
            context: { Headers: { Authorization: "Bearer " + jwt } },
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
