import {Component} from 'react'

import {Link} from 'react-router-dom'

import Pagination from '../Pagination'

import searchContext from '../context/searchContext'

import './index.css'

class SearchedMovie extends Component {
  state = {
    listOfAllPopularMovies: [],
    duplicateMoviesList: [],
    pageNumber: 1,
    inputStore: '',
  }

  componentDidMount() {
    this.fetchApi()
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

  fetchApi = async () => {
    const API_KEY = '1654b633a11a9de25ce1365e7f8f57ae'
    const {match} = this.props
    console.log(match)
    const {params} = match
    const {search} = params
    console.log(`searched Movie Data: ${search}`)

    const {inputStore, pageNumber} = this.state

    console.log(`inputStore: ${inputStore}`)

    const MOVIE_NAME = inputStore.length === 0 ? search : inputStore
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${MOVIE_NAME}&page=${pageNumber}`,
    )

    const responseToJson = await response.json()
    console.log('BelowResponseSearchedData')
    console.log(responseToJson)

    if (response.ok === true) {
      const listOfPopularMovies = responseToJson.results.map(each => ({
        name: each.title,
        imageUrl: `https://image.tmdb.org/t/p/w500${each.poster_path}`,
        vote: each.vote_average,
        backDropPath: each.backdrop_path,
        id: each.id,
      }))

      this.setState({
        listOfAllPopularMovies: listOfPopularMovies,
        duplicateMoviesList: listOfPopularMovies.slice(0, 20),
      })
    }
  }

  changeValue = event => {
    this.setState({inputStore: event.target.value})
  }

  gotoSearched = () => {
    this.fetchApi()
  }

  render() {
    const {
      listOfAllPopularMovies,
      pageNumber,
      duplicateMoviesList,
      inputStore,
    } = this.state
    console.log(duplicateMoviesList)

    return (
      <searchContext.Consumer>
        {value => {
          const {search} = value

          console.log(search)
          return (
            <div>
              {/* TODO: HoldNavBar */}

              <div className="navBarBg">
                <div className="Links">
                  <h1 className="movie-DB">movieDB</h1>
                  <div>
                    <a className="links" href="/">
                      <h1 className="PopularHeading">Popular</h1>
                    </a>
                  </div>
                  <div>
                    <a className="links" href="/top-rated">
                      <h1 className="TopRatedHeading">Top Rated</h1>
                    </a>
                  </div>
                  <div>
                    <a className="links" href="/upcoming">
                      <h1 className="UpcomingHeading">Upcoming</h1>
                    </a>
                  </div>
                </div>

                <div className="inputDiv">
                  <input
                    value={inputStore}
                    type="text"
                    onChange={this.changeValue}
                    placeholder="Search"
                    className="Input"
                  />

                  <button
                    onClick={this.gotoSearched}
                    className="search"
                    type="button"
                  >
                    Search
                  </button>
                </div>
              </div>

              <div>
                <div className="Pagination">
                  <Pagination
                    data={listOfAllPopularMovies}
                    changePages={this.changePages}
                    pageStyling={pageNumber}
                    changePageStyling={this.pageNumberChange}
                  />
                </div>

                {duplicateMoviesList.length === 0 ? (
                  'You can search Something!'
                ) : (
                  <div className="popular">
                    {duplicateMoviesList.map(each => (
                      <div key={each.id} className="EachImage">
                        <img
                          className="SearchedMovie"
                          src={each.imageUrl}
                          alt={each.name}
                        />

                        <h1 className="title">{each.name}</h1>

                        <p>Rating: {each.vote}</p>

                        <Link to={`/movie/${each.id}`} key={each.id}>
                          <button type="button" onClick={this.changeId}>
                            View Details
                          </button>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        }}
      </searchContext.Consumer>
    )
  }
}

export default SearchedMovie
