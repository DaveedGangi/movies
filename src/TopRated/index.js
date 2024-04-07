import {Component} from 'react'

import {Link} from 'react-router-dom'

import NavBar from '../NavBar'

import Pagination from '../Pagination'

import './index.css'

class TopRated extends Component {
  state = {listOfAllPopularMovies: [], duplicateMoviesList: [], pageNumber: 1}

  componentDidMount() {
    this.fetchApi()
  }

  fetchApi = async () => {
    const API_KEY = '1654b633a11a9de25ce1365e7f8f57ae'
    const {pageNumber} = this.state
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${pageNumber}`,
    )
    console.log(response)
    const responseToJson = await response.json()
    console.log(responseToJson)

    if (response.ok === true) {
      const listOfPopularMovies = responseToJson.results.map(each => ({
        name: each.title,
        imageUrl: `https://image.tmdb.org/t/p/w500${each.poster_path}`,
        rating: each.vote_average,
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
    this.setState({pageNumber: numberData}, this.fetchApiAgain)
  }

  fetchApiAgain = () => {
    this.fetchApi()
  }

  render() {
    const {listOfAllPopularMovies, pageNumber, duplicateMoviesList} = this.state

    return (
      <div>
        <NavBar />
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
              <img className="topRated" src={each.imageUrl} alt={each.name} />

              <h1 className="title"> {each.name}</h1>
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
