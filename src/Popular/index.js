import {Component} from 'react'

import {Link} from 'react-router-dom'

import NavBar from '../NavBar'

import './index.css'

class Popular extends Component {
  state = {listOfAllPopularMovies: [], movieId: 0}

  componentDidMount() {
    this.fetchApi()
  }

  fetchApi = async () => {
    const API_KEY = '1654b633a11a9de25ce1365e7f8f57ae'
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
    )
    console.log(response)
    const responseToJson = await response.json()
    console.log(responseToJson)

    if (response.ok === true) {
      const listOfPopularMovies = responseToJson.results.map(each => ({
        id: each.id,
        name: each.title,
        image: `https://image.tmdb.org/t/p/w500/${each.poster_path}`,
        rating: each.vote_average,
        backDropPath: each.backdrop_path,
      }))

      this.setState({listOfAllPopularMovies: listOfPopularMovies})
    }
  }

  changeId = event => {
    this.setState({movieId: event.target.id})
  }

  render() {
    const {listOfAllPopularMovies, movieId} = this.state
    console.log(movieId)
    return (
      <div>
        <NavBar />

        <h1 className="Page-head">Popular</h1>

        <div className="popular">
          {listOfAllPopularMovies.map(each => (
            <div key={each.id} className="EachImage">
              <img className="movieImage" src={each.image} alt={each.name} />

              <h1 className="Title">Title: {each.name}</h1>
              <p>Rating: {each.rating}</p>

              <Link to={`/movie/${each.id}`} key={each.id}>
                <button className="button-viewDetails" type="button">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default Popular
