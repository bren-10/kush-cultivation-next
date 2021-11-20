import MainLayout from "../Components/MainLayout/MainLayout";
import SplashPage from "../Components/SplashPage/SplashPage";
import styles from "../styles/Index.module.css";

export default function Home(props) {

  return (
    <div className={styles.index}>
      {props.hasVisited ? <MainLayout /> : <SplashPage letsGo={props.setVisited}/>}
    </div>
  );
}