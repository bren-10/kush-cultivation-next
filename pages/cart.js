import Cart from '../Components/Shop/Cart/Cart'
import { withIronSessionSsr } from "iron-session/next";

export default function cart(props) {
  return (
    <div>
      <Cart changeCartCount={props.changeCartCount}/>      
    </div>
  )
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    
    if (!user) {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
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