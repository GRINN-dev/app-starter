import { NextPage } from "next";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";

const Home: NextPage = () => {
  /**
   * ResponseGoogle is a function that takes a response of type GoogleLoginResponse or
   * GoogleLoginResponseOffline and returns undefined
   * @param {GoogleLoginResponse | GoogleLoginResponseOffline} response - GoogleLoginResponse |
   * GoogleLoginResponseOffline
   */
  // const responseGoogle = (
  //   response: GoogleLoginResponse | GoogleLoginResponseOffline
  // ) => {
  //   console.log("res: ", response);
  // };
  return (
    <div>
      <div
        id="g_id_onload"
        data-client_id="128517360182-uqnaqd02h6ab6f65uragsmh0j6no516q.apps.googleusercontent.com"
        data-login_uri="http://localhost:6785"
        data-auto_prompt="true"
        data-callback="handleCredentialResponse"
      ></div>
      <div
        className="g_id_signin"
        data-type="standard"
        data-size="large"
        data-theme="outline"
        data-text="sign_in_with"
        data-shape="rectangular"
        data-logo_alignment="left"
      ></div>
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
