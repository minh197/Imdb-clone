import React, { useEffect, useState } from 'react';
import "./App.css";
import myMovie from "./components/Movie"
import Movie from "./components/Movie";
import ReactModal from 'react-modal';
import keyword from "./components/Movie";
import YouTube from '@u-wave/react-youtube';

import Pagination from "react-js-pagination";





const videos = [
  { id: 'ZuuVjuLNvFY', name: 'JUNNY - kontra (Feat. Lil Gimch, Keeflow)' },

];




let apiKey = process.env.REACT_APP_APIKEY

function App() {
  let [movieList, setMovieList] = useState(null)
  let [topratedList, setTopRatedList] = useState(null)
  let [originalList, setOriginalList] = useState(null)
  let [modalOpen, setModalOpen] = useState(false)
  let [videoOpen, setVideoOpen] = useState(false)
  let [trailer, setTrailer] = useState('');
  let [page, setPage] = useState(1)
  let [totalResult, setTotalResult] = useState(0)

  const getTopRatedMovie = async () => {
    let url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${page}`
    let data = await fetch(url)
    let result = await data.json()
    setMovieList(result.results)
  }


  const rattingFilm = () => {

    let filmRattingList = [];

    let filmRatting = movieList.sort((a, b) => {
      if (a.vote_average > b.vote_average) return 1
      if (a.vote_average < b.vote_average) return -1
      if (a.vote_average = b.vote_average) return 0
    })
    // filmRattingList.push(filmRatting);
    console.log("Ratting film here", filmRatting);

    setMovieList([...filmRatting]);
  }

  let handlePageChange = async pageNumber => {
    console.log(`active page is ${pageNumber}`);
   setPage(pageNumber)
   let url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${pageNumber}`
    let data = await fetch(url)
    let result = await data.json()
    setOriginalList(result.results)
    setMovieList(result.results)
    //newRelease(result.results)
   
   
  }


  const closeModal = () => {
    setModalOpen(false)
  }



  const openModal = async (movieId) => {
    let url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`
    let data = await fetch(url);
    let resultData = await data.json();
    setTrailer(resultData.results[0].key)
    setModalOpen(true)
  }


  const rattingToHigh = () => {

    let filmRattingList = [];

    let filmRatting = movieList.sort((a, b) => {
      if (a.vote_average > b.vote_average) return -1
      if (a.vote_average < b.vote_average) return 1
      if (a.vote_average = b.vote_average) return 0
    })
    // filmRattingList.push(filmRatting);


    setMovieList([...filmRatting]);
  }

  //popularity

  const popularityFilm = () => {

    let lowPopularityList = [];

    let filmRatting = movieList.sort((a, b) => {
      if (a.popularity > b.popularity) return 1
      if (a.popularity < b.popularity) return -1
      if (a.popularity = b.popularity) return 0
    })
    // filmRattingList.push(filmRatting);


    setMovieList([...filmRatting]);
  }

  const highFilm = () => {

    let highPopularityList = [];

    let filmRatting = movieList.sort((a, b) => {
      if (a.popularity > b.popularity) return -1
      if (a.popularity < b.popularity) return 1
      if (a.popularity = b.popularity) return 0
    })
    // filmRattingList.push(filmRatting);


    setMovieList([...filmRatting]);
  }




  const getNowPlayMovie = async () => {

    let url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
    let data = await fetch(url)
    let result = await data.json()
    setOriginalList(result.results)
    setMovieList(result.results)
    //newRelease(result.results)
    console.log("movie", result)
    setTotalResult(result.total_results);

  }
  const backHome = () => {
    setMovieList(originalList)

  }

  const searchFilm = (keyword) => {
    let movieSearching = [];
    if (keyword === '') {
      setMovieList(originalList)
      return;
    }
    for (let i = 0; i < movieList.length; i++) {
      let filmSearching = movieList[i]
      if (movieList[i].title.toLowerCase().includes(keyword.toLowerCase())) {
        movieSearching.push(filmSearching);
        console.log("what is film searching", movieSearching)


      }
    }
    setMovieList(movieSearching)
  }
  const newRelease = () => {
    console.log("I am here")

    let nowplayingFilm = [];
    //get the whole move list 
    // from taht get each item 
    // from each item, we get the release_Date 
    // from that release date, we split by -
    // we grab the first index balue which is year info
    // we comopare that ear value is  >=2020
    // if thats true, we push into nowplayingFilm array
    // set that now plaing Film array into state so user can see 

    for (let i = 0; i < movieList.length; i++) {
      let newRelease = movieList[i];

      let newRealeseDate = newRelease.release_date;

      let myfilmList = newRealeseDate.split("-")
      let year = myfilmList[0]
      let month = myfilmList[1]

      if (year >= 2020 && month >= 2) {

        nowplayingFilm.push(newRelease)

      }

    }




    setMovieList(nowplayingFilm);




  }

  useEffect(() => {
    getNowPlayMovie();
  }, [])




  if (movieList === null) {
    return (<div>Loading</div>)
  }
  return (
    <div className="App">
      <Movie myMovieList={movieList} onNewRelease={newRelease} topList={getTopRatedMovie} topSearch={searchFilm} comeBack={backHome} lowToHigh={rattingFilm} highToLow={rattingToHigh} lowPop={popularityFilm} highPop={highFilm} modalIsOpen={openModal} modalIsClosing={closeModal} />
      <ReactModal shouldCloseOnOverlayClick={true}
        onRequestClose={
          () => closeModal()}
        onClick={() => closeModal()} isOpen={
          modalOpen}
        style={{ overlay: {}, contents: { width: "70%", height: "70%" } }}

      >

        <YouTube className="youtube"
          video={trailer}
          autoplay="true"
        />


      </ReactModal>


      <Pagination
        activePage={page}
        itemsCountPerPage={20}
        totalItemsCount={totalResult}
        pageRangeDisplayed={5}
        onChange={handlePageChange.bind(this)}
        itemClass="page-item"
        linkClass="page-link"
      />

    </div>
  );

}
export default App;
//create new array for film that releases on 2020



//create a 2020film function



//link that function with currently playing film