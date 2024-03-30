import {useState} from 'react'

import {Link} from 'react-router-dom'

import './index.css'

const NavBar = () => {
  const [text, changeText] = useState('')

  const changeValue = event => changeText(event.target.value)

  console.log(text)

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
          value={text}
          type="text"
          onChange={changeValue}
          placeholder="Search"
          className="Input"
        />
        <Link to={`SearchedMovie/${text}`} data={text}>
          <button className="search" type="button">
            Search
          </button>
        </Link>
      </div>
    </div>
  )
}

export default NavBar
