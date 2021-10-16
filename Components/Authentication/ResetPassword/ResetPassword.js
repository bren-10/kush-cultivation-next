import { useRef } from 'react'
// import AuthContext from '../../Storage/auth-context'
// import { useAlert } from 'react-alert'
import { useHistory } from 'react-router-dom'

function ResetPassword() {
  const history = useHistory()
  // const alert = useAlert()
  // const authCtx = useContext(AuthContext)
  const newPasswordInputRef = useRef()
  const emailInputRef = useRef()
  const url ='https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDplQtuTWefOL2tXcMDmMNYtYlDnUPgldU'
  
  function submitReset() {
    const newPassword = newPasswordInputRef.current.value

    fetch(url, {
       method: 'POST',
       body: JSON.stringify({
         idToken: authCtx.token,
         password: newPassword,
         returnSecureToken: false
       }),
       headers: {'Content-Type': 'application/json'}
    })
    .then(res => {
      if (res.ok) {
        alert.success('Password reset successfully.')
      } else {
        res.json().then(data => {
          console.log(data)
          let errorMsg = 'Reset failed, please try again.'
          if (data.error && data.error.message) {
            // errorMsg = data.error.message.split(' : ');
            // errorMsg = errorMsg[1]
            errorMsg = data.error.message
          }
          alert.error(errorMsg)
        })
      }
    })
    .then((data) => {
      console.log(data)
      history.replace('/')
    })
    .catch(err => {
      alert.error(err.message)
    })
  }

  function submitResetRequest() {
    history.replace('/')
  }
  
  return (
    <div className='reset-password'>
      <h1>Reset Password</h1>
      {/* {!authCtx.isLoggedIn && */}
        <div>
          <h3>Type in your email</h3>
          <input ref={emailInputRef} type='email'></input>
        </div>
      {/* } */}
      {/* {authCtx.isLoggedIn &&  */}
        <div>
          <h3>Type in your new password</h3>
          <input ref={newPasswordInputRef} type='text'></input>
        </div>
      {/* } */}
      {/* <button onClick={authCtx.isLoggedIn ? submitReset : submitResetRequest}>Submit</button> */}
    </div>
  )
}

export default ResetPassword
