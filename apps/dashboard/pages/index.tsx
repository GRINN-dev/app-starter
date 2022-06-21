import { NextPage } from "next";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";

const Home: NextPage = () => {
  const responseGoogle = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    console.log("res: ", response);
  };
  return (
    <div>
      <div className="g-signin2" data-onsuccess="responseGoogle"></div>
      {/* <GoogleLogin
        clientId="128517360182-uqnaqd02h6ab6f65uragsmh0j6no516q.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
        redirectUri="http://localhost:3000/auth"
      /> */}
    </div>
  );
};

export default Home;
