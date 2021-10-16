// import React, { createContext, useEffect, useState, useCallback } from 'react';

// let logoutTimer;

// const AuthContext = createContext({
//   token: '',
//   isLoggedIn: false,
//   login: () => {},
//   logout: () => {}
// })

// function calculateRemainingTime(expirationTime){
//   const currentTime = new Date().getTime();
//   const adjExpirationTime = new Date(expirationTime).getTime();

//   const remainingDuration = adjExpirationTime - currentTime

//   return remainingDuration
// }

// function retrieveStoredToken(){
//   const storedToken = 'asdf'
//   const storedExpiryDuration = '123'
//   // const storedToken = localStorage.getItem('userToken')
//   // const storedExpiryDuration = localStorage.getItem('expiryTime')
//   const remainingTime = calculateRemainingTime(storedExpiryDuration)

//   if (remainingTime <= 60000){
//     // localStorage.removeItem('userToken')
//     // localStorage.removeItem('expiryTime')
//     return null
//   }

//   return {
//     token: storedToken,
//     duration: remainingTime
//   }
// }

// export function AuthContextProvider(props){
//   const tokenData = retrieveStoredToken()
//   let initialToken;
//   if (tokenData){
//     initialToken = tokenData.token
//   }
//   const [token, setToken] = useState(initialToken)

//   const userIsLoggedIn = !!token;

//   function loginHandler (token, expirationTime) {
//     setToken(token)
//     localStorage.setItem('userToken', token)
//     localStorage.setItem('expiryTime', expirationTime)

//     const remainingTime = calculateRemainingTime(expirationTime);
    
//     logoutTimer = setTimeout(logoutHandler, remainingTime)
//   }

//   const logoutHandler = useCallback(() => {
//     // localStorage.removeItem('userToken')
//     // localStorage.removeItem('expiryTime')
//     setToken(null)

//     if (logoutTimer){
//       clearTimeout(logoutTimer)
//     }
//   }, []);

//   useEffect(() => {
//     if (tokenData){
//       logoutTimer = setTimeout(logoutHandler, tokenData.duration)
//     }
//   }, [tokenData, logoutHandler])

//   const contextValue = {
//     token: token,
//     isLoggedIn: userIsLoggedIn,
//     login: loginHandler,
//     logout: logoutHandler
//   }
//   return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
// }

// export default AuthContext