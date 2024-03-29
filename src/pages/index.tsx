import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import ImageSlider from '../components/imageSlider';
import styles from '../styles/Home.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import headerGeneration from '../utils/headerGeneration';
import 'dotenv/config';

interface homeProps {
  countryData: [countryData] 
}
interface countryData { 
  name: string
  picture: HomePicture 
}

interface HomePicture{
  portrait: [Picture]
  landscape: [Picture]
}
interface Picture {
  link: string
}

const Home: NextPage<homeProps> = ({ countryData }) => { 
  const [currentSlide,setCurrentSlide] = useState<number>(0);
  const [currentCountry,setCurrentCountry] = useState<string>(countryData[0].name); /* set Name for the country */
  const slides: Array<string> = [];
  const router = useRouter();
  countryData.map((country) => slides.push(country.picture.portrait[0].link));
  function changeCountryInfo(){
    setCurrentCountry(countryData[currentSlide].name);
  }
  useEffect(()=>{
    console.log(countryData);
    changeCountryInfo();
    console.log(router)
  },[countryData,currentSlide]);
  useEffect(()=> {
  },[])
  return (
    <> 
      {headerGeneration(router)}
      <main className={styles.main}>
        {countryData.map((country,index)=>{
          return <img style={{opacity:`${currentSlide === index ? 1 : 0}`}} className={`${styles.backgroundImage} ${styles.one}`} src={country.picture.landscape[0].link}/>
        })}
        { /* background image for main */}
        <Navbar/>
        <div className={styles.banter}>
          <h2>ENJOY THE</h2>
          <h1>WORLD</h1>
          <button>EXPLORE NOW &#8594;</button>
        </div>
        <div className={styles.country}>
          <Link href={`/countries/${currentCountry}`}>
            <h2>{currentCountry}</h2>
          </Link>
          <ImageSlider slides = { slides } changeSlide = {setCurrentSlide}/>
        </div>
      </main>
    </>
  )
}



export async function getServerSideProps(){
  const client = new ApolloClient({
    uri: process.env.SERVER_URL,
    ssrMode: true,
    defaultOptions:{
      query:{
        fetchPolicy: 'no-cache',
        errorPolicy: 'all'
      }
    },
    cache: new InMemoryCache()
  });
  const { data } = await client.query({
    query: gql`
      query Homepage{
        countries(quantity:3 ) {
          name
          picture {
            portrait(quantity:1 ) {
              link
            }
            landscape(quantity:1 ) {
              link
            }
          }
        }
      }
    `
  })
  return {
    props: {
      countryData:data.countries,
    },
  }
}
export default Home
