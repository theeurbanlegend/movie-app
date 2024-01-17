import React, { useEffect, useState } from 'react'
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";

const App = () => {
  const [movies,setMovies]=useState(null)  
  const [movieName,setMovieName]=useState('nora')
  const [error,setError]=useState(null)
  const [searching,setSearching]=useState(false)
  const apiKey='8a427f92'
  useEffect(()=>{
    const fetchMovies=async()=>{
      await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${movieName}`,{
        method:'GET'
      })
      .then(async(res)=>{
        if(!res.ok){
          throw new Error('Response is not OK!')
        }else{
          const data=await res.json()
          console.log(data)
          if(data.Response==='True'){
          setMovies(data.Search)
          setSearching(false)
          }
          if(data.Error){
            setError(data.Error)
            setSearching(false)
          }
        }
      })
    }

    fetchMovies()
  },[searching])
  const handleSearch=()=>{
    if(movieName){
    setSearching(true)
    setError(null)
    setMovies(null)
    }
  }
  const handleKeypress=(e)=>{
    if(e.key==='Enter'){
      handleSearch()
    }
  }
  return (
    <div className="app">
      <h1>The Movie Archive</h1>

      <div className="search">
        <input
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
          onKeyUp={handleKeypress}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => handleSearch()}
          
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  )
}

export default App

