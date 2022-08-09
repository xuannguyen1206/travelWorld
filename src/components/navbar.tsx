import { useRef } from 'react';
import styles from './styles/navbar.module.scss';
import searchIcon from '../asset/search.png';
import Head from 'next/head'
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function Navbar() {
  const hamburger = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLUListElement>(null);
  function hamburgerActive(){
    hamburger.current?.classList.toggle('menuActive');    
    menu.current?.classList.toggle('menuActive');
  }
  return ( 
    <nav className={styles.nav}>
      <div className={styles.left}>
        <span>Travel World</span>
      </div>
      
      <ul ref={menu} className={styles.right}>
        <li><Link href='/'>Home</Link></li>
        <li><Link href='/countries'>Countries</Link></li>
        <li><Link href='/aboutUs'>About Us</Link></li>
        <li>
          <input type="text" placeholder="Search country"/>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </li>
        
      </ul>
      <div ref={hamburger} className={styles.hamburger} onClick={hamburgerActive}>  {/* hamburger button  */}
          <div/>
          <div/>
          <div/>
        </div>
    </nav>

  
   );
}

export default Navbar;