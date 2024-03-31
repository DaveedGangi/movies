import {Component} from 'react'

import {Link} from 'react-router-dom'

import NavBar from '../NavBar'

import Pagination from '../Pagination'

import './index.css'

class Popular extends Component {
  state = {listOfAllPopularMovies: [], duplicateMoviesList: [], pageNumber: 1}

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

    console.log(listOfAllPopularMovies)
    console.log(duplicateMoviesList)
    console.log('popular')
    console.log(pageNumber)

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
