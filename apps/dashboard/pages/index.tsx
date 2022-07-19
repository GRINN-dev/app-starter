import { NextPage } from "next";
import { useEffect } from "react";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
interface User {
  id: string;
  name: string;
}

export interface Window {
  user?: User;
}

const Home: NextPage = () => {
  /**
   * ResponseGoogle is a function that takes a response of type GoogleLoginResponse or
   * GoogleLoginResponseOffline and returns undefined
   * @param {GoogleLoginResponse | GoogleLoginResponseOffline} response - GoogleLoginResponse |
   * GoogleLoginResponseOffline
   */

  function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    fetch("http://localhost:8000/verify-gsign?token=" + response.credential, {
      method: "POST",
    })
      .then(async res => {
        const { access_token } = await res.json();
        console.log("Request complete! response:", access_token);
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    window.onload = function () {
      google.accounts.id.initialize({
        client_id:
          "128517360182-uqnaqd02h6ab6f65uragsmh0j6no516q.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });
      google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" } // customization attributes
      );
      google.accounts.id.prompt(); // also display the One Tap dialog
    };
  }, []);

  return (
    <div>
      <div id="buttonDiv"></div>
    </div>
  );
};

export default Home;
