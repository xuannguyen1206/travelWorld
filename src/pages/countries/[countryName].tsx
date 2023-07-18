import { useEffect, useRef, useState } from 'react'
import Navbar from '../../components/navbar';
import styles from '../../styles/[countries].module.scss'
import testImg from "../../asset/test.jpg"
import testImg2 from "../../asset/test2.jpg"
import testImg3 from "../../asset/test3.jpg"
import portraitImg from "../../asset/portraitTest.jpeg"
import { useRouter } from 'next/router';
import Image from 'next/image';
import ImageSlider from '../../components/imageSlider';
import { url } from 'inspector';
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import React from 'react';
/* @ts-ignore */
import Rotate from 'react-reveal/Rotate';
/* @ts-ignore */
import Fade from 'react-reveal/Fade';
import Link from 'next/link';
import headerGeneration from '../../utils/headerGeneration';
import 'dotenv/config';

interface Country{
  name: string
  flag: string
  capital: City
  region: string
  area: Number
  population: Number
  picture: Pictures
  borders: [Country]
  currencies: Currencies
}
interface City{
  name: string
  picture: Pictures
}
interface Pictures{
  portrait: [Pic]
  landscape: [Pic]
}
interface Pic{
  id:string
  link:string
  des: string
  blur:string
  location:string 
}
interface Currencies{
  name: string
  symbol: string
}

export default function specificCuontry({countryData}: {countryData : Country})  {
  const [landscapes,setLandscapes] = useState<[Pic]>(countryData.picture.landscape)
  const [portraits,setPortraits] = useState<[Pic]>(countryData.picture.portrait)
  const [mainPortrait,setMainPortrait] = useState(0);
  const [mainLandscape,setMainLandscape] = useState(0); // current set of landscape
  const [leftsideLandscape,setLeftsideLandscape] = useState(1);
  const [rightsideLandscape,setRightsideLandscape] = useState(2);
  const [showImg,setShowImg] = useState(true)
  const landscapePics = useRef<any>([]);
  const router = useRouter();

  function landscapeSwap(sideLandscape:any){
    const tempMainLandscape = sideLandscape
    const tempSideLandscape = mainLandscape
    landscapePics.current.map((pic:any) => {
      pic.style.filter = "brightness(0)"
      pic.style.userSelect = 'none';
    }) // fade start
    if(sideLandscape === leftsideLandscape){
      setTimeout(()=>{
        setMainLandscape(tempMainLandscape)
        setLeftsideLandscape(tempSideLandscape) //w8 for fade turn dark  swap left side landscape
      },1200)
    }
    else{
      setTimeout(()=>{
        setMainLandscape(tempMainLandscape)
        setRightsideLandscape(tempSideLandscape); // swap right side landscape
      },1200)
    }
    setTimeout(()=>{
      landscapePics.current.map((pic:any) => {
        pic.style.filter = "brightness(1)"
        pic.style.userSelect = 'unset';
      }) // fade end
    },1200)
    // use active pseudo class to add animation
  }
  function resetImages() {
    // to regain the blur of images if there is a client navigation
    setShowImg(!showImg);
    const timer = setTimeout(()=>{
      setShowImg((showImg) => !showImg)
    },500);
  }

  useEffect(()=>{
    setLandscapes(countryData.picture.landscape);
    setPortraits(countryData.picture.portrait);
    resetImages();
    headerGeneration(router,'ss')
  },[countryData])
  
  return (
    <>
      {headerGeneration(router,countryData.flag)}
      <main className={styles.main}>
        <Navbar/>
        <section className={styles.section} id={styles.home}> 
          <div className={styles.description}>
            <header id={styles.intro}>
              <span>DISCOVER</span>
              <h1>{countryData.name.toUpperCase()}</h1>
              <h2>{countryData.region}</h2>
            </header>
            <figcaption id={styles.imgLocation}>{landscapes[mainLandscape].location}</figcaption>
          </div>
          <div className={styles.mainImg}>
            { showImg &&
              <figure ref={(element) => landscapePics.current[0] =(element)} className={styles.imgContainer}>
                <Image placeholder='blur' blurDataURL={landscapes[mainLandscape].blur} 
                src={landscapes[mainLandscape].link} layout='fill' objectFit='cover' objectPosition='center' unoptimized/>
              </figure>
            }
          </div>
          <div className={styles.sideImg}>
            <figure ref={(element) => landscapePics.current[1] =(element)} className={styles.imgContainer} onClick={()=>landscapeSwap(leftsideLandscape)}>
            { showImg &&
              <Image placeholder='blur' blurDataURL={landscapes[leftsideLandscape].blur}
              src={landscapes[leftsideLandscape].link} layout='fill' objectFit='cover' unoptimized/>
            }
            </figure>
            <figure ref={(element) => landscapePics.current[2] =(element)} className={styles.imgContainer} onClick={()=>landscapeSwap(rightsideLandscape)}>
            { showImg &&
              <Image placeholder='blur' blurDataURL={landscapes[rightsideLandscape].blur}
              src={landscapes[rightsideLandscape].link} layout='fill' objectFit='cover' unoptimized/>
            }
            </figure>
          </div>    
        </section>
        <section className={styles.section} id={styles.capital}>
            <div className={styles.description}>  
              <h1>
                <h1 className={styles.name}>{`${countryData.capital.name},`}</h1> the capital of <h1 className={styles.name}>{countryData.name}</h1>
              </h1> 
              <p>
              The word "capital" originates from the Latin capitalis, meaning "of the head". The central of power and a place of decision-making processes that may affect lives and proserity of a whole nation. Usually belies in itself is the cultural representation and unity of the people of the nation
              </p>
            </div>
            <div className={styles.pics}>
              <figure className={styles.imgContainer} id={styles.small}>
                { showImg &&
                  <Image src={countryData.capital.picture.portrait[0].link} 
                  placeholder='blur' blurDataURL={countryData.capital.picture.portrait[0].blur}
                  width = {250} height ={328} layout='responsive'/>
                }
                </figure>
              <figure className={styles.imgContainer} id={styles.big}>
                { showImg &&
                  /* @ts-ignore */
                  <Image src={countryData.capital.picture.portrait[1].link} placeholder='blur' blurDataURL={countryData.capital.picture.portrait[1].blur}
                  width = {355} height = {470} layout='responsive'/>
                }
              </figure>
            </div>
        </section>
        <section className={styles.section} id={styles.briefLook}>
            <div className={styles.description}>  
              <h1>
                <h1>A brief look into </h1><h1 className={styles.name}>{countryData.name}</h1>
              </h1> 
              <div className={styles.statistics}>
                <div className={styles.container}>
                  <h2 className={styles.info}>{`${countryData.area} km2`}</h2>
                  <h4 className={styles.catergory}>Area</h4>
                </div>
                <div className={styles.container}>
                  <h2 className={styles.info}>{countryData.population}</h2>
                  <h4 className={styles.catergory}>Population</h4>
                </div>
                <div className={styles.container}>
                  <h2 className={styles.info}>{`${countryData.currencies.name}(${countryData.currencies.symbol})`}</h2>
                  <h4 className={styles.catergory}>Currency</h4>
                </div>
              </div>
            </div>
            <div className={styles.pics}>
              <figure className={styles.sliderContainer}>
                <ImageSlider slides={portraits.map((portrait)=> portrait.link)} changeSlide = {setMainPortrait}/>
                <figcaption>{portraits[mainPortrait].des}</figcaption>
              </figure>
            </div>
        </section> 
        <section className={styles.section} id={styles.border}>
            <div className={styles.description}>
              <h1>  
                <h1 className={styles.name}>{`${countryData.name}'s`}</h1><h1> neighbors</h1> 
              </h1>
              <p>{`Countries that share the same border with ${countryData.name}`}</p>
            </div>
            <div className={styles.pics}>
              <div className={styles.cardContainer}>
                {countryData.borders?.map((country) => {
                  if(country === null) return;
                  return (
                    <Link href={`/countries/${country.name}`}>
                      <figure  className={`${styles.countryCard} ${styles.polaroid}`}>
                        <div className={styles.imgContainer}>
                        { showImg &&
                          <Image src={country.picture.portrait[0].link} placeholder='blur'
                          blurDataURL={country.picture.portrait[0].blur} layout='fill'/>
                        }
                        </div>
                        <figcaption>{country.name}</figcaption>
                      </figure>
                    </Link>

                  )
                })}
              </div>
            </div>
        </section>
      </main>
    </>
   
  )
}

export async function getServerSideProps(context:any){
  const client = new ApolloClient({
    uri: process.env.SERVER_URL,
    // uri: "http://localhost:4000/",
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
      query Country($name:String!){
        country(countryName: $name ) {
          name
          flag
          capital {
            name
            picture {
              portrait(quantity: 3) {
                link
                blur
              }
            }
          }
          region
          area
          population
          currencies {
            name
            symbol
          }
          picture {
            landscape(quantity: 3) {
              link
              blur
              location
            }
            portrait(quantity: 3) {
              link
              des
              blur
            }
          }
          borders {
            name
          picture {
            portrait(quantity: 1) {
              link
              blur
            }
          }
          }
        }
      }
    `,
    variables:{
      name: context.query.countryName
    }
  })
  return {
    props: {
      countryData: data.country,
    }
  }
}


