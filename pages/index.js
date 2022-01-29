import MainLayout from "../Components/MainLayout/MainLayout";
import SplashPage from "../Components/SplashPage/SplashPage";
import styles from "../styles/Index.module.css";
import { withIronSessionSsr } from "iron-session/next";

export default function Home(props) {

  return (
    <div className={styles.index}>
      {props.hasVisited ? <MainLayout /> : <SplashPage letsGo={props.setVisited}/>}
    </div>
  );
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

    if (!user) {
      return {
        props:{},
      };
    }

    return {
      props: {
        user: user,
      },
    };
  },
  {
    cookieName: "kush_cookie",
    password: process.env.COOKIE_PW,
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: !process.env.NEXT_PUBLIC_IN_PRODUCTION,
    },
  },
);