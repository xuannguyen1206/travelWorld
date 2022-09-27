import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import Navbar from '../components/navbar';
import styles from '../styles/404.module.scss'
import headerGeneration from '../utils/headerGeneration';

export default function Custom404() {
  const [dot,setDot] = useState<any>('.');
  const router = useRouter();
  function addDot(){
    setDot((dot: string)=> {
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
    <>
      {headerGeneration(router)}
      <main className={styles.main}>
        <div className={styles.nav}>
          <Navbar/>
        </div>
        <h1>COMING SOON {dot}</h1>
      </main>
    </>
    );
}