import { useRef, useState, useEffect } from "react";
import Link from 'next/link'
import { toast } from "react-toastify";
import { useRouter } from "next/dist/client/router";

function LoginRegister(props) {
  const router = useRouter()
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

  async function handleSubmit(e){
    e.preventDefault()
    if (!(emailInput.current.value && passwordInput.current.value)){
      toast.warn("Not all required fields have been provided.")
      return
    }

    if (!emailInput.current.value.match(validEmail)){
      toast.warn("Not a valid email address.")
      return
    }
    // Client is registering. Validate email, match passwords and add to DB
    setIsLoading(true)
    if (!isLogin){
      if (passwordInput.current.value === passwordInput2.current.value){

        const registrationInfo = {
          "firstName": firstNameInput.current.value || '',
          "lastName": lastNameInput.current.value || '',
          "email": emailInput.current.value,
          "password": passwordInput.current.value
        }

        // options.method = "GET"
        options.body = JSON.stringify(registrationInfo)

        const res = await fetch('/api/register', options)
        if (res.status === 200) {
          router.replace('/auth/login')
          setIsLogin(true)
          emailInput.current.value = ''
          passwordInput.current.value = ''
          toast.success("Successfully Registered! Please log in.")
        } else {
          const errMsg = res.body.data
          toast.error(errMsg)
        }
      } else {
        toast.warn("Passwords do not match!")
      }
      setIsLoading(false)
    } else {
      const loginInfo = {
        "email": emailInput.current.value,
        "password": passwordInput.current.value
      }

      options.body = JSON.stringify(loginInfo)

      const res = await fetch('/api/login', options)
      
      if (res.status === 200){
        router.replace('/')
        toast.success("Logged in successfully!")
        localStorage.setItem('kush_cultivation__thereIsUser', 'true')
      } else {
        const data = await res.json()
        const errMsg = data.data
        toast.error(errMsg)
      }
      setIsLoading(false)
    }
    
  }

  function handleEnterPressed(e){ // TODO doesn't work.
    if (e.key === "Enter") {
      // handleSubmit()
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
      <form>
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
        <button className="btn btn-light m-3" onClick={handleSubmit} onKeyPress={handleEnterPressed}>
          {isLoading ? 'Please wait': 'Submit'}
        </button>
      </form>
      <div>
        or{" "}
        <span onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Register" : "Login"}
        </span>
      </div>
      {isLogin && <Link href="/contact"><a>Forgot Password?</a></Link>}
    </div>
  );
}

export default LoginRegister;
