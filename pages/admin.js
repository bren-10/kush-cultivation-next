import { withIronSessionSsr } from "iron-session/next";
import Admin from "../Components/Admin/Admin";

export default function admin(props) {
  return (
    <div>
      <Admin/>
    </div>
  )
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

    if (user && user.isAdmin){
      return {
        props: {}
      }
    }

    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props:{},
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