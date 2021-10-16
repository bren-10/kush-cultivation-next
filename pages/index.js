import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home(props) {
  return (
    <div className={styles.container}>
      <h1>Hello</h1>
      <p>Here is the info: {props.data}</p>
    </div>
  )
}

export async function getServerSideProps(context){
  let data = 'This is a secret'
  return {
    props: {
      data
    }
  }
}