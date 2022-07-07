import { NextPage } from "next";
import { useRouter } from "next/router";
import { LoginForm, LoginFormData } from "@grinn/components";
import {
  GetCurrentUserQuery,
  useAuthenticateMutation,
  useGetAllUsersQuery,
  useGetCurrentUserLazyQuery,
  useGetCurrentUserQuery,
} from "@grinn/graphql-generated";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
} from "react";
import { TokenContext } from "@grinn/lib";

export const UserContext = createContext<{
  user: GetCurrentUserQuery;
  setUser: Dispatch<SetStateAction<any>>;
}>({ user: null, setUser: () => {} });

const AuthPage: NextPage = () => {
  const router = useRouter();
  const [authenticate] = useAuthenticateMutation();
  const [loadCurrentUser, { data: dataUser }] = useGetCurrentUserLazyQuery({});
  const { accessToken, setAccessToken } = useContext(TokenContext);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (dataUser?.currentUser) {
      setUser(dataUser);
      !dataUser?.currentUser?.isAdmin
        ? router.replace("/dashboard")
        : router.replace("/dashboard-admin");
    }
  }, [dataUser]);
  useEffect(() => {
    loadCurrentUser({ fetchPolicy: "network-only" });
  }, [accessToken]);
  return (
    <div className="flex justify-center">
      <LoginForm
        onSubmit={async (data: LoginFormData) => {
          const { data: res } = await authenticate({
            variables: { input: data },
          });
          const { access_token } = res.authenticate;
          setAccessToken(access_token);
          /*
          const test = await loadCurrentUser({
            fetchPolicy: "network-only",
          })
            .then(userData => {
              console.log("eibifr ");
              !userData?.data?.currentUser?.isAdmin
                ? router.replace("/dashboard")
                : router.replace("/dashboard-admin");
            })
            .catch(err => {
              console.log(err);
            })
            .finally(() => {
              console.log("finally");
            });
          console.log("test : ", test);
          */
        }}
      />
    </div>
  );
};

export default AuthPage;
