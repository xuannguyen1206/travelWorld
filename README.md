# WHAT HAVE DONE SO FAR
## Server
- Hosted at https://travel-world-graphql.herokuapp.com/
- A wrapper graphql server using restcountries.com and unsplash.com as datasource
## Client
- Query data (countries' names and images) from server before loading the page's JS by using Next getServerSideProps(). 
- Use SwiperJS to initialize slider
- Home: display 3 random countries with its portrait image
- Countries: display 6 random countries with its landscape image with a random quote
- Countries/[country_name]: a dynamic page display a specific country's picture and information.
## API used
- Countries' info: [restcountries.com](https://restcountries.com/)
- Images: [unsplash.com](https://unsplash.com)
- Quotes: [quotable.io](https://github.com/lukePeavey/quotable)
