import Head from "next/head";
import MainLayout from "../Components/MainLayout/MainLayout";
import SplashPage from "../Components/SplashPage/SplashPage";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/Index.module.css";
// import { AuthContextProvider } from "../Components/Storage/auth-context";

export default function Home(props) {
  const [faviconScheme, setFaviconScheme] = useState("/k-light.png");
  const [hasVisitedState, setHasVisitedState] = useState(false);

  // Change favicon colour based on browser/OS theme.
  useEffect(() => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)");
    if (isDark.matches) {
      setFaviconScheme("/k.png");
    }
  }, []);

  // Check if user has visited the site before and set visit status accordingly.
  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited") ? true : false;
    if (hasVisited) {
      setHasVisitedState(true);
    } else {
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  return (
    // <AuthContextProvider>
    <div className={styles.index}>
      <Head>
        <meta charset="utf-8" />
        <link rel="icon" href={faviconScheme} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="stylesheet" href="./index.html" />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossorigin="anonymous"
        />
        <title>Kush Cultivation</title>
      </Head>
      <body>
        <script
          src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
          integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
          integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
          integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
          crossorigin="anonymous"
        ></script>
      </body>
      {hasVisitedState ? <MainLayout /> : <SplashPage />}
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
