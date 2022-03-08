import { useRef } from 'react';
import styles from './styles/navbar.module.scss';
import searchIcon from '../asset/search.png';
import Head from 'next/head'
import Image from 'next/image';

function Navbar() {
  const hamburger = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLUListElement>(null);
  function hamburgerActive(){
    hamburger.current?.classList.toggle('menuActive');    
    menu.current?.classList.toggle('menuActive');
  }
  return ( 
    <>
      <Head>
       <link href="/all.css" rel="stylesheet"></link> 
      </Head>
      <nav className={styles.nav}>
        <div className={styles.left}>
          <span>Travel World</span>
        </div>
        
        <ul ref={menu} className={styles.right}>
          <li>Home</li>
          <li>Countries</li>
          <li>About Us</li>
          <li>
            <input type="text" placeholder="Search country"/>
            <Image src={searchIcon} width={30} height={30}/>
          </li>
          
        </ul>
        <div ref={hamburger} className={styles.hamburger} onClick={hamburgerActive}>  {/* hamburger button  */}
            <div/>
            <div/>
            <div/>
          </div>
      </nav>
    </>
   
   );
}

export default Navbar;