import { useRef } from 'react';
import styles from './styles/navbar.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import countriesCode from '../asset/countriesCode.json'

function Navbar() {
  const router = useRouter()
  const hamburger = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLUListElement>(null);
  const inputValue = useRef<any>();

  function hamburgerActive(){
    hamburger.current?.classList.toggle('menuActive');    
    menu.current?.classList.toggle('menuActive');
  }
  function checkAndNaviagate(e:MouseEvent){
    console.log(inputValue.current.value)
    const result = lookUpCountry(inputValue.current.value)
    if(result){
      router.push(`/countries/${result}`)
    }

  }
  function lookUpCountry(input: any){
    input = input.split(" ");
    input = input.map((word:string) => {
      word = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(); 
      // capitalize each word in country name
      return word
    })
    const result = Object.values(countriesCode).find(country=> country.includes(input))
    // look up country
    if(result){
      return result
    }
    else return null
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
        <li >
          <input ref={inputValue} type="text" placeholder="Search country"/>
          <FontAwesomeIcon icon={faMagnifyingGlass} onClick={(e) => checkAndNaviagate(e as any)} />
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