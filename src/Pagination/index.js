import './index.css'

const Pagination = props => {
  const {data, changePages, pageStyling, changePageStyling} = props
  console.log(props)
  const pages = []

  for (let i = 1; Math.ceil(data.length / 10) + 1 > i; i += 1) {
    pages.push(i)
  }

  const changePageBasedOnClicking = event => {
    console.log('Hello')
    console.log(event.target.value)
    changePages(event.target.value)
    changePageStyling(event.target.value)
  }
  console.log('belowPageStyling')
  console.log(pageStyling)
  console.log(typeof pageStyling)

  return (
    <div className="pages-style">
      {pages.map(each => (
        <button
          value={each}
          onClick={changePageBasedOnClicking}
          type="button"
          key={each}
          className={+pageStyling === each ? 'Button-style' : 'No-button-style'}
        >
          {each}
        </button>
      ))}
    </div>
  )
}

export default Pagination
