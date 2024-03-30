import React from 'react'

const searchContext = React.createContext({
  search: '',
  changeSearchValue: () => {},
})

export default searchContext
