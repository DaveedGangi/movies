import {Component} from 'react'

import {Link} from 'react-router-dom'

import Pagination from '../Pagination'

import './index.css'

class SearchedMovie extends Component {
  state = {listOfAllPopularMovies: [], duplicateMoviesList: [], pageNumber: 1}

  componentDidMount() {
    this.fetchApi()
  }

  fetchApi = async () => {
    const API_KEY = '1654b633a11a9de25ce1365e7f8f57ae'
    console.log('SearchBelow')
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

      this.setState({
        listOfAllPopularMovies: listOfPopularMovies,
        duplicateMoviesList: listOfPopularMovies.slice(0, 10),
      })
    }
  }

  changePages = number => {
    console.log(number)
    const {listOfAllPopularMovies} = this.state
    this.setState({
      duplicateMoviesList: listOfAllPopularMovies.slice(
        number * 10 - 10,
        number * 10,
      ),
    })
  }

  pageNumberChange = numberData => {
    console.log(numberData)
    this.setState({pageNumber: numberData})
  }

  render() {
    const {listOfAllPopularMovies, pageNumber, duplicateMoviesList} = this.state
    return (
      <div>
        <div className="Pagination">
          <Pagination
            data={listOfAllPopularMovies}
            changePages={this.changePages}
            pageStyling={pageNumber}
            changePageStyling={this.pageNumberChange}
          />
        </div>

        <div className="popular">
          {duplicateMoviesList.map(each => (
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
