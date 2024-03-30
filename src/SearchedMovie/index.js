import {Component} from 'react'

import {Link} from 'react-router-dom'

import NavBar from '../NavBar'

import './index.css'

class SearchedMovie extends Component {
  state = {listOfAllPopularMovies: []}

  componentDidMount() {
    this.fetchApi()
  }

  fetchApi = async () => {
    const API_KEY = '1654b633a11a9de25ce1365e7f8f57ae'
    console.log(this.props)
    const {match} = this.props
    const {params} = match
    const {text} = params

    console.log('belowTextThere')

    const MOVIE_NAME = text
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${MOVIE_NAME}&page=1`,
    )

    const responseToJson = await response.json()

    if (response.ok === true) {
      const listOfPopularMovies = responseToJson.results.map(each => ({
        name: each.title,
        imageUrl: `https://image.tmdb.org/t/p/w500/${each.poster_path}`,
        vote: each.vote_average,
        backDropPath: each.backdrop_path,
        id: each.id,
      }))

      this.setState({listOfAllPopularMovies: listOfPopularMovies})
    }
  }

  render() {
    const {listOfAllPopularMovies} = this.state
    return (
      <div>
        <NavBar />
        <div className="popular">
          {listOfAllPopularMovies.map(each => (
            <div key={each.id} className="EachImage">
              <img
                className="SearchedMovie"
                src={each.imageUrl}
                alt={each.name}
              />

              <h1 className="title">Title: {each.name}</h1>

              <p>Rating: {each.vote}</p>

              <Link to={`/movie/${each.id}`} key={each.id}>
                <button type="button" onClick={this.changeId}>
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

export default SearchedMovie
