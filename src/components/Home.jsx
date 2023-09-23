import { useState, useEffect } from 'react'
import Loading from './Loading'
import MovieComponent from './MovieComponent'
import axios from 'axios';
const Home = () => {
  const [card, setCard] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true)

  const FetchData = async () => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=9&_page=${page}`);
    const data = await res.data;
    // console.log(data);
    setCard((prev) => [...prev, ...data]);
    setLoading(false);
  };

  useEffect(() => {
    FetchData();
  }, [page])


  const handleInfiniteScroll = async () => {
    try {
      // means we've touched the arrow
      if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
        setLoading(true)
        setPage((prev) => prev + 1)
      }
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, [])



  return (
    <>
      <MovieComponent movieInfo={card} />
      {loading && <Loading />}
    </>
  )
}

export default Home

/*
window.innerHeight returns the inner height of the window (the height of the browser window's viewport), in pixels.


document.documentElement.scrollTop returns the number of pixels that the document has been scrolled vertically.


document.documentElement.scrollHeight returns the height of the entire document, in pixels
*/