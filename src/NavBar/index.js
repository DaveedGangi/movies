import {withRouter} from 'react-router-dom'

import searchContext from '../context/searchContext'

import './index.css'

const NavBar = props => (
  <searchContext.Consumer>
    {value => {
      const {search, changeTextValue} = value

      const changeValue = event => {
        changeTextValue(event.target.value)
      }

      console.log('inNavBarSearched')
      console.log(search)

      const goToSearched = () => {
        const {history} = props
        console.log('HEllo Jesus')

        history.push('SearchedMovie')
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

            <button onClick={goToSearched} className="search" type="button">
              Search
            </button>
          </div>
        </div>
      )
    }}
  </searchContext.Consumer>
)

export default withRouter(NavBar)
