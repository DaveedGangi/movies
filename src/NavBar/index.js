import {withRouter, Link} from 'react-router-dom'

import searchContext from '../context/searchContext'

import './index.css'

const NavBar = () => (
  <searchContext.Consumer>
    {value => {
      const {search, changeTextValue} = value

      const changeValue = event => {
        changeTextValue(event.target.value)
      }

      const goToSearched = () => {
        console.log('You just clicked a search Button')
        changeTextValue('')
      }

      return (
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
              value={search}
              type="text"
              onChange={changeValue}
              placeholder="Search"
              className="Input"
            />

            <Link to={`SearchedMovie/${search}`}>
              <button onClick={goToSearched} className="search" type="button">
                Search
              </button>
            </Link>
          </div>
        </div>
      )
    }}
  </searchContext.Consumer>
)

export default withRouter(NavBar)
