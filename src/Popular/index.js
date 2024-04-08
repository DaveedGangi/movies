import {Component} from 'react'

import {Link} from 'react-router-dom'

import Pagination from '../Pagination'

import NavBar from '../NavBar'

import './index.css'

class Popular extends Component {
  state = {listOfAllPopularMovies: [], duplicateMoviesList: [], pageNumber: 1}

  componentDidMount() {
    this.fetchApi()
  }

  fetchApi = async () => {
    const API_KEY = '1654b633a11a9de25ce1365e7f8f57ae'
    const {pageNumber} = this.state
    console.log(`pageNumberUpcoming: ${pageNumber}`)
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNumber}`,
    )

    const responseToJson = await response.json()

    console.log(responseToJson)

    if (response.ok === true) {
      const listOfPopularMovies = responseToJson.results.map(each => ({
        id: each.id,
        name: each.title,
        image: `https://image.tmdb.org/t/p/w500${each.poster_path}`,
        rating: each.vote_average,
        backDropPath: each.backdrop_path,
      }))

      console.log(listOfPopularMovies)

      this.setState({
        listOfAllPopularMovies: listOfPopularMovies,
        duplicateMoviesList: listOfPopularMovies.slice(0, 20),
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

        <div className="popular">
          <div className="items">
            {duplicateMoviesList.map(each => (
              <div key={each.id} className="EachImage">
                <div>
                  <img
                    className="movieImage"
                    src={each.image}
                    alt={each.name}
                  />
                </div>

                <h1 className="Title"> {each.name}</h1>
                <p className="Rating">Rating: {each.rating}</p>

                <Link to={`/movie/${each.id}`} key={each.id}>
                  <button className="button-viewDetails" type="button">
                    View Details
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="Pagination">
          <Pagination
            data={listOfAllPopularMovies}
            changePages={this.changePages}
            pageStyling={pageNumber}
            changePageStyling={this.pageNumberChange}
          />
        </div>
      </div>
    )
  }
}

export default Popular
