import { useRouter } from "next/dist/client/router";
import LoginRegister from "../../Components/Authentication/LoginRegister/LoginRegister";

export default function loginOrRegister() {
  const router = useRouter()
  const query = router.query.loginOrRegister

  return <div><LoginRegister action={query}/></div>;
}
