import {Component} from 'react'

import Pagination from '../Pagination'

import './index.css'

class SingleVideo extends Component {
  state = {
    movieDetails: [],
    cast: [],
    duplicateMoviesList: [],
    pageNumber: 1,
  }

  componentDidMount() {
    this.fetchSingleApi()
    this.fetchCast()
  }

  fetchSingleApi = async () => {
    const API_KEY = '1654b633a11a9de25ce1365e7f8f57ae'

    console.log(this.props)

    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)

    // const MOVIE_ID = 0

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`,
    )

    console.log(`Response : ${response.ok}`)
    const responseToJson = await response.json()
    console.log(responseToJson)

    if (response.ok === true) {
      const movieDetail = {
        name: responseToJson.title,
        imageUrl: `https://image.tmdb.org/t/p/w500${responseToJson.backdrop_path}`,
        rating: responseToJson.vote_average,
        duration: responseToJson.runtime,
        genres: responseToJson.genres.map(each => ({
          genreName: each.name,
          id: each.id,
        })),

        poster: `https://image.tmdb.org/t/p/w500${responseToJson.poster_path}`,
        releaseDate: responseToJson.release_date,
        overView: responseToJson.overview,
        id: responseToJson.id,
      }

      console.log(movieDetail)
      this.setState({movieDetails: movieDetail})
    }
  }

  fetchCast = async () => {
    const API_KEY = '1654b633a11a9de25ce1365e7f8f57ae'

    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`,
    )

    console.log(`ResponseCast : ${response.ok}`)

    const reponsedToJson = await response.json()

    console.log(reponsedToJson)

    if (response.ok === true) {
      const castAdding = reponsedToJson.cast.map(each => ({
        id: each.credit_id,
        profilePath: `https://image.tmdb.org/t/p/w500${each.profile_path}`,
        originalName: each.original_name,
        name: each.name,
        charactorName: each.character,
      }))

      const crewAdding = reponsedToJson.crew.map(each => ({
        id: each.credit_id,
        profilePath: `https://image.tmdb.org/t/p/w500${each.profile_path}`,
        originalName: each.original_name,
        name: each.name,
        charactorName: each.character,
      }))

      const details = [...castAdding, ...crewAdding]
      console.log(details)
      this.setState({
        cast: details,
        duplicateMoviesList: details.slice(0, 10),
      })
    }
  }

  changePages = number => {
    console.log(number)
    const {cast} = this.state
    this.setState({
      duplicateMoviesList: cast.slice(number * 10 - 10, number * 10),
    })
  }

  pageNumberChange = numberData => {
    console.log(numberData)
    this.setState({pageNumber: numberData})
  }

  render() {
    const {movieDetails, cast, pageNumber, duplicateMoviesList} = this.state
    console.log(movieDetails.genres)

    return (
      <div>
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
        </div>
        <div>
          <div className="flexing-movie-image-and-details">
            <div>
              <img
                className="moviePoster"
                src={movieDetails.poster}
                alt={movieDetails.name}
              />
            </div>
            <div>
              <h1 className="movie-name">Movie Name: {movieDetails.name}</h1>
              <p className="rating">Rating: {movieDetails.rating}</p>

              <p className="duration">Duration: {movieDetails.duration}</p>

              <p className="releaseDate">
                Release Date: {movieDetails.releaseDate}
              </p>

              <p className="movie-overview">
                Movie Overview: {movieDetails.overView}
              </p>
            </div>
          </div>
        </div>

        <div className="Pagination">
          <Pagination
            data={cast}
            changePages={this.changePages}
            pageStyling={pageNumber}
            changePageStyling={this.pageNumberChange}
          />
        </div>

        <div>
          <h1 className="casting">Casting Members</h1>
          <div className="castFlexing">
            {duplicateMoviesList.map(each => (
              <div className="eachCastMember" key={each.id}>
                <img
                  className="castingTeam"
                  src={each.profilePath}
                  alt={each.originalName}
                />
                <p className="original-name">{each.originalName}</p>
                <p className="charactor-name">{each.charactorName}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default SingleVideo
