import Image from 'next/image';
import { useEffect, useState } from 'react'
import Navbar from '../../components/navbar';
import styles from '../../styles/countries.module.scss'
import sunset from '../../asset/sunset2.jpg'
import testImg from "../../asset/test.jpg"
import testImg2 from "../../asset/test2.jpg"
import testImg3 from "../../asset/test3.jpg"
import axios from 'axios';
/* @ts-ignore */
import Fade from 'react-reveal/Fade';
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import Link from 'next/link';
import headerGeneration from '../../utils/headerGeneration';
import { route } from 'next/dist/server/router';
import { useRouter } from 'next/router';

interface Country{
  name: string
  picture: Pictures
}
interface Pictures{
  landscape: [Pic]
}
interface Pic{
  link:string
  blur:string
}


export default function countries({countryData}:{countryData:[Country]}) {
  const [showImg,setShowImg] = useState(false);
  const [quote,setQuote] = useState('');
  const [author,setAuthor] = useState('');
  const router = useRouter()
  const quotesKeywords = ['freedom','life','inspiration']
  function onOffImg(){
    setShowImg(!showImg);
  }
  async function getQuote() {
    const { data } = await axios.get('https://quotable.io/random?tags=inspirational|life|freedom')
    setAuthor(data.author);
    setQuote(data.content);
    console.log(data)
  }
  useEffect(()=>{
    getQuote();
    setTimeout(()=> {
      onOffImg()
    },3500)
  },[])
  return (
  <>
    {headerGeneration(router)}
    <main className={styles.main}>
      <figure className={styles.bgImg}/>
      <Navbar/>
      <section className={styles.quote}>
        { (author && quote) &&
          <Fade when={showImg}>
            <p>
              {`${quote}  — ${author}`}
            </p>
          </Fade>
        }
      </section>
      <Fade bottom cascade when={showImg}>
        <section className={styles.countryCards}>
          {countryData.map((country) => {
            return (
                <div className={styles.card}>
                  <Link href={`/countries/${country.name}`}>
                    <figure className={styles.countryPic}>
                      <Image src={country.picture.landscape[0].link} layout='fill' objectFit='cover'
                        placeholder='blur' blurDataURL={country.picture.landscape[0].blur}/>
                      <figcaption>{country.name}</figcaption>
                    </figure>
                  </Link>
                </div>
            )
          })}
        </section>
      </Fade>
    </main>
  </>
  
  );
}

export async function getServerSideProps(){
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
      query Countries{
        countries(quantity: 6) {
          name
          picture {
            landscape(quantity: 1) {
              link
              blur
            }
          }
        }
      }
    `
  })
  return{
    props: {
      countryData:data.countries,
    }
  }
}