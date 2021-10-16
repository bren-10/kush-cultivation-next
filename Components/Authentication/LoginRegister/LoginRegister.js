import { useRef, useState, useEffect } from "react";
// import { useAlert } from "react-alert";
import { Link, useHistory } from "react-router-dom";
// import AuthContext from "../../Storage/auth-context";
import firebase from "firebase/app"
import 'firebase/auth'

function LoginRegister() {
  const history = useHistory();
  // const alert = useAlert();
  const emailInput = useRef();
  const passwordInput = useRef();

  // const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const firebaseConfig = {
    apiKey: "AIzaSyDplQtuTWefOL2tXcMDmMNYtYlDnUPgldU",
    authDomain: "kush-cultivation-auth.firebaseapp.com",
    projectId: "kush-cultivation-auth",
    storageBucket: "kush-cultivation-auth.appspot.com",
    messagingSenderId: "607076133623",
    appId: "1:607076133623:web:e0be04990f2ea1ad7a81f2"
  };
  if (!firebase.apps.length) {
      const app = firebase.initializeApp(firebaseConfig)
  } else {
      firebase.app(); // if already initialized, use that one
  }
  

  function submitAuthDetails(e) {
    e.preventDefault()
    setIsLoading(true)
    const email = emailInput.current.value;
    const password = passwordInput.current.value;

    // let url;
    if (isLogin) {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        setIsLoading(false)
        if (user) {
          user.getIdToken().then(function(token) {
              let idToken = token
              const expiryPeriod = new Date(
                new Date().getTime() + 3600 * 1000
              );
              alert.success("Logged in successfully.");
              authCtx.login(idToken, expiryPeriod);
          });
        }
        history.replace("/");
      })
      .catch((error) => {
        setIsLoading(false)
        var errorCode = error.code;
        let errorMsg = "Authentication failed, please try again.";
        if (error && error.message) {
          // errorMsg = data.error.message.split(' : ');
          // errorMsg = errorMsg[1]
          errorMsg = error.message.replace('_', ' ');
        }
        alert.error(errorMsg);
      });

    } else {

      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        let actionCodeSettings = {
          url: 'http://localhost:3000/user-authentication',
          handleCodeInApp: true
        }
        firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
          .then(() => {
            // Signed up
            const user = userCredential.user
            setIsLoading(false)
            if (user) {
              user.getIdToken().then(function(token) {
                  let idToken = token
                  let hourFromNow = new Date().setSeconds(3550)
                  let expiresIn = new Date(hourFromNow)
                  const expiryPeriod = new Date(
                    new Date().getTime() + expiresIn * 1000
                  );
                  alert.success("Registered successfully. Please keep an eye on your mailbox for the verification link.");
                  authCtx.login(idToken, expiryPeriod);
              });
            }
          })
          .catch((error) => {
            setIsLoading(false)
            var errorCode = error.code;
            let errorMsg = "Authentication failed, please try again.";
            if (error && error.message) {
              // errorMsg = data.error.message.split(' : ');
              // errorMsg = errorMsg[1]
              errorMsg = error.message.replace('_', ' ');
            }
            alert.error(errorMsg);
          });
      })
      .catch(error => {
        console.log(error)
      })
        
    }

    // fetch(url, {
    //   method: "POST",
    //   body: JSON.stringify({
    //     email: email,
    //     password: password,
    //     returnSecureToken: true,
    //   }),
    //   headers: { "Content-Type": "application/json" },
    // })
    //   .then((res) => {
    //     setIsLoading(false)
    //     if (res.ok) {
    //       alert.success(`${isLogin ? "Logged in" : "Registered"} successfully`);
    //       return res.json().then(data => {
    //         const expiryPeriod = new Date(
    //           new Date().getTime() + +data.expiresIn * 1000
    //         );
    //         authCtx.login(data.idToken, expiryPeriod);
    //         history.replace("/");
    //       })
          
    //     } else {
    //       return res.json().then(data => {
    //         let errorMsg = "Authentication failed, please try again.";
    //         if (data.error && data.error.message) {
    //           // errorMsg = data.error.message.split(' : ');
    //           // errorMsg = errorMsg[1]
    //           errorMsg = data.error.message.replace('_', ' ');
    //         }
    //         alert.error(errorMsg);
    //         throw new Error(errorMsg)
    //       })
    //     }
    //   })
    //   .catch((err) => {
    //     alert.error(err.message);
    //   });

  }

  return (
    <div className="login-register">
      <h1>{isLogin ? "Login" : "Register"}</h1>
      <form>
        <div className="form-group">
          <input
            className="form-control"
            type="email"
            placeholder="Email"
            ref={emailInput}
          ></input>
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="password"
            placeholder="Password"
            ref={passwordInput}
          ></input>
        </div>
        {!isLogin && (
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              placeholder="Confirm Password"
            ></input>
          </div>
        )}
        <button className="btn btn-light m-3" onClick={submitAuthDetails}>
          {isLoading ? <img className='loadingator' src='/assets/loading.gif'></img> : 'Submit'}
        </button>
      </form>
      <div>
        or{" "}
        <span onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Register" : "Login"}
        </span>
      </div>
      {isLogin && <Link to="/reset-password">Forgot Password?</Link>}
    </div>
  );
}

export default LoginRegister;
