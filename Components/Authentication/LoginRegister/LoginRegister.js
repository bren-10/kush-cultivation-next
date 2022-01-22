import { useRef, useState, useEffect } from "react";
import Link from 'next/link'
import { toast } from "react-toastify";

function LoginRegister(props) {
  const emailInput = useRef();
  const firstNameInput = useRef();
  const lastNameInput = useRef();
  const passwordInput = useRef();
  const passwordInput2 = useRef();
  var validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: ''
  }

  async function handleSubmit(){
    if (!(emailInput.current.value && passwordInput.current.value)){
      toast.warn("Not all required fields have been provided.")
      return
    }

    if (!emailInput.current.value.match(validEmail)){
      toast.warn("Not a valid email address.")
      return
    }
    // Client is registering. Validate email, match passwords and add to DB
    if (!isLogin){
      if (passwordInput.current.value === passwordInput2.current.value){

        const registrationInfo = {
          "firstName": firstNameInput.current.value || '',
          "lastName": lastNameInput.current.value || '',
          "email": emailInput.current.value,
          "password": passwordInput.current.value
        }

        options.method = "GET"
        options.body = JSON.stringify(registrationInfo)

        const res = await fetch('/api/register', options)
        if (res.ok) {
          // TODO get data from response and log user in, or just redirect to login
          toast.success("Successfully Registered!")
        } else {
          // TODO proper error handling with codes in /register
          toast.error("Something went wrong.")
        }
      } else {
        toast.warn("Passwords do not match!")
      }
    } else {
      const loginInfo = {
        "email": emailInput.current.value,
        "password": passwordInput.current.value
      }

      options.body = JSON.stringify(loginInfo)

      const res = await fetch('/api/login', options)
      
      if (res.ok){
        toast.success("Logged in successfully!")
      } else {
        toast.error("Something went wrong.")
        // TODO proper error handling with codes in /login
      }
    }
    
  }



  useEffect(() => {
    if (props.action) {
      if (props.action === 'register') {
        setIsLogin(false)
      }
    }
  }, [props.action])

  return (
    <div className="login-register">
      <h1>{isLogin ? "Login" : "Register"}</h1>
      {!isLogin && (
        <div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="First Name"
              ref={firstNameInput}
            ></input>
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="Last Name"
              ref={lastNameInput}
            ></input>
          </div>
        </div>
      )}
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
            ref={passwordInput2}
          ></input>
        </div>
      )}
      <button className="btn btn-light m-3" onClick={handleSubmit}>
        {isLoading ? <img className='loadingator' src='/assets/loading.gif'></img> : 'Submit'}
      </button>
      <div>
        or{" "}
        <span onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Register" : "Login"}
        </span>
      </div>
      {isLogin && <Link href="/reset-password"><a>Forgot Password?</a></Link>}
    </div>
  );
}

export default LoginRegister;
