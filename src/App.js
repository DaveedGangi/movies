import {Route, Switch} from 'react-router-dom'

import {Component} from 'react'

import Popular from './Popular'

import TopRated from './TopRated'

import UpComing from './UpComing'

import SingleVideo from './SingleVideo'

import SearchedMovie from './SearchedMovie'

import searchContext from './context/searchContext'

import './App.css'

// write your code here

class App extends Component {
  state = {search: ''}

  changingText = text => {
    this.setState({search: text})
  }

  changeTextValue2 = () => {
    this.setState({search: ''})
  }

  render() {
    const {search} = this.state
    console.log(search)
    return (
      <searchContext.Provider
        value={{
          search,
          changeTextValue: this.changingText,
          changeTextValue2: this.changeTextValue2,
        }}
      >
        <div>
          <Switch>
            <Route exact path="/" component={Popular} />
            <Route exact path="/top-rated" component={TopRated} />
            <Route exact path="/upcoming" component={UpComing} />
            <Route exact path="/movie/:id" component={SingleVideo} />
            <Route
              exact
              path="/SearchedMovie/:search"
              component={SearchedMovie}
            />
          </Switch>
        </div>
      </searchContext.Provider>
    )
  }
}

export default App
