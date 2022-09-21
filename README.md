# WHAT HAVE DONE SO FAR
## Server
- Hosted at https://travel-world-graphql.herokuapp.com/
- A wrapper graphql server using restcountries.com and unsplash.com as datasource
## Client
- Query data (countries' names and images) from server before loading the page's JS by using Next getServerSideProps(). 
- Use SwiperJS to initialize slider
- Home: display 3 random countries
- countries/[countryName]: a dynamic page display the countryName's picture and information