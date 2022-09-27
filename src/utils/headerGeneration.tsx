import Head from "next/head";
import { NextRouter, Router } from "next/router";

function headerGeneration(router: NextRouter,flag?:string){
  if(!flag){
    return (
      <Head>
        <meta name="description" content="travel around the world" />
        <title>{Object.keys(router.query).length === 0 ? 'TravelWOrld' : router.query}</title>
        <link href='./earth.png' rel='icon'/>
      </Head>
    )
  } 
  else {
    return(
      <Head>
        <meta name="description" content="travel around the world" />
        <title>{`travelWOrld | ${router.query.countryName}`} </title>
        <link href={flag} rel='icon'/>
      </Head>
    )
  }
}

export default headerGeneration;