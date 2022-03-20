import { useEffect, useState } from 'react'
import Navbar from '../components/navbar';
import styles from '../styles/404.module.scss'

export default function Custom404() {
  const [dot,setDot] = useState<any>('.');

  function addDot(){
    setDot((dot)=> {
      if(dot === '...'){
        setDot('.')
      } else {
        setDot(dot+'.')
      }
    })
  }

  useEffect(()=> { 
    setInterval(addDot,2000)
  },[])
  
  return (
  <main className={styles.main}>
    <div className={styles.nav}>
      <Navbar/>
    </div>
    <h1>COMING SOON {dot}</h1>
  </main>
  );
}