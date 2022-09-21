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

interface Country{
  name: string
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
  // const portraits = [
  //   {
  //     "link": "https://images.unsplash.com/photo-1571146200473-28327150d304?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMTIwMTB8MHwxfHNlYXJjaHw0MDN8fFZpZXRuYW18ZW58MHwxfHx8MTY2MzQzMTI1MA&ixlib=rb-1.2.1&q=80",
  //     "des": "Drinks with Bamboo straw"
  //   },
  //   {
  //     "link": "https://images.unsplash.com/photo-1567118117415-c80572e28e9d?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMTIwMTB8MHwxfHNlYXJjaHw0MDR8fFZpZXRuYW18ZW58MHwxfHx8MTY2MzQzMTI1MA&ixlib=rb-1.2.1&q=80",
  //     "des": "the top of Sapa\n\nFollow to get more picture: instagram.com/andreeew.hn"
  //   },
  //   {
  //     "link": "https://images.unsplash.com/photo-1633515255762-e3454bd99ccb?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMTIwMTB8MHwxfHNlYXJjaHw0MDV8fFZpZXRuYW18ZW58MHwxfHx8MTY2MzQzMTI1MA&ixlib=rb-1.2.1&q=80",
  //     "des": "Da Nang after the pandemic"
  //   }
  // ];
  // const landscapes = [{
  //   "link": "https://images.unsplash.com/photo-1650864080866-984702191ec1?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMTIwMTF8MHwxfHNlYXJjaHwxMTV8fFZpZXRuYW18ZW58MHwwfHx8MTY2MzQzMDIwMA&ixlib=rb-1.2.1&q=80",
  //   "location": "Ta Van, Sa Pa, Lao Cai, Vietnam"
  // },
  // {
  //   "link": "https://images.unsplash.com/photo-1580912348148-7f8ff7ef4337?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMTIwMTF8MHwxfHNlYXJjaHwxMTZ8fFZpZXRuYW18ZW58MHwwfHx8MTY2MzQzMDIwMA&ixlib=rb-1.2.1&q=80",
  //   "location": "20 Đường 23/10, Phương Sơn, Thành phố Nha Trang, Khanh Hoa Province, Vietnam"
  // },
  // {
  //   "link": "https://images.unsplash.com/photo-1650197404160-8d08f76002c0?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMTIwMTF8MHwxfHNlYXJjaHwxMTd8fFZpZXRuYW18ZW58MHwwfHx8MTY2MzQzMDIwMA&ixlib=rb-1.2.1&q=80",
  //   "location": "Phong Phú, Cầu Kè, Trà Vinh, Vietnam"
  // }];
  const [landscapes,setLandscapes] = useState<[Pic]>(countryData.picture.landscape)
  const [portraits,setPortraits] = useState<[Pic]>(countryData.picture.portrait)
  const [mainPortrait,setMainPortrait] = useState(0);
  const [mainLandscape,setMainLandscape] = useState(0); // current set of landscape
  const [leftsideLandscape,setLeftsideLandscape] = useState(1);
  const [rightsideLandscape,setRightsideLandscape] = useState(2);
  const landscapePics = useRef<any>([]);
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

  useEffect(()=>{
  },[])
  
  return (
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
          <figure ref={(element) => landscapePics.current[0] =(element)} className={styles.imgContainer}>
            <Image placeholder='blur' blurDataURL={landscapes[mainLandscape].blur} 
            src={landscapes[mainLandscape].link} layout='fill' objectFit='cover' objectPosition='center' unoptimized/>
          </figure>
        </div>
        <div className={styles.sideImg}>
          <figure ref={(element) => landscapePics.current[1] =(element)} className={styles.imgContainer} onClick={()=>landscapeSwap(leftsideLandscape)}>
            <Image placeholder='blur' blurDataURL={landscapes[leftsideLandscape].blur}
             src={landscapes[leftsideLandscape].link} layout='fill' objectFit='cover' unoptimized/>
          </figure>
          <figure ref={(element) => landscapePics.current[2] =(element)} className={styles.imgContainer} onClick={()=>landscapeSwap(rightsideLandscape)}>
            <Image placeholder='blur' blurDataURL={landscapes[rightsideLandscape].blur}
            src={landscapes[rightsideLandscape].link} layout='fill' objectFit='cover' unoptimized/>
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
              <Image src={countryData.capital.picture.portrait[0].link} 
              placeholder='blur' blurDataURL={countryData.capital.picture.portrait[0].blur}
              width = {250} height ={328} layout='responsive'/>
            </figure>
            <figure className={styles.imgContainer} id={styles.big}>
              {/* @ts-ignore */}
              <Image src={countryData.capital.picture.portrait[1].link} placeholder='blur' blurDataURL={countryData.capital.picture.portrait[1].blur}
              width = {355} height = {470} layout='responsive'/>
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
                  <figure className={`${styles.countryCard} ${styles.polaroid}`}>
                    <div className={styles.imgContainer}>
                      <Image src={country.picture.portrait[0].link} placeholder='blur'
                      blurDataURL={country.picture.portrait[0].blur} layout='fill'/>
                    </div>
                    <figcaption>{country.name}</figcaption>
                  </figure>
                )
              })}
            </div>
          </div>
      </section>
    </main>
  )
}

export async function getServerSideProps(context:any){
  const client = new ApolloClient({
    uri: "https://travel-world-graphql.herokuapp.com/",
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
  console.log(data)
  return {
    props: {
      countryData: data.country,
    }
  }
}