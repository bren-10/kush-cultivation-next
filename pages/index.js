import Head from "next/head";
import MainLayout from "../Components/MainLayout/MainLayout";
import SplashPage from "../Components/SplashPage/SplashPage";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/Index.module.css";
import KushNavbar from "../Components/Navigation/Navbar/KushNavbar";
// import { AuthContextProvider } from "../Components/Storage/auth-context";

export default function Home(props) {

  return (
    // <AuthContextProvider>
    <div className={styles.index}>
      {props.hasVisited ? <MainLayout /> : <SplashPage letsGo={props.setVisited}/>}
    </div>
    // </AuthContextProvider>
  );
}

export async function getServerSideProps(context) {
  let data = "This is a secret";
  return {
    props: {
      data,
    },
  };
}
