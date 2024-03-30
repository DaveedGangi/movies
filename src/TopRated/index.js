import {Component} from 'react'

import {Link} from 'react-router-dom'

import NavBar from '../NavBar'

import './index.css'

class TopRated extends Component {
  state = {listOfAllPopularMovies: []}

  componentDidMount() {
    this.fetchApi()
  }

  fetchApi = async () => {
    const API_KEY = '1654b633a11a9de25ce1365e7f8f57ae'
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
    )
    console.log(response)
    const responseToJson = await response.json()
    console.log(responseToJson)

    if (response.ok === true) {
      const listOfPopularMovies = responseToJson.results.map(each => ({
        name: each.title,
        imageUrl: `https://image.tmdb.org/t/p/w500/${each.poster_path}`,
        rating: each.vote_average,
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
        <h1 className="Page-head">Top Rated</h1>

        <div className="popular">
          {listOfAllPopularMovies.map(each => (
            <div key={each.id} className="EachImage">
              <img className="topRated" src={each.imageUrl} alt={each.name} />

              <h1 className="title">Title: {each.name}</h1>
              <p>Rating: {each.rating}</p>
              <Link to={`/movie/${each.id}`} key={each.id}>
                <button
                  className="button-viewDetails"
                  type="button"
                  onClick={this.changeId}
                >
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

export default TopRated
