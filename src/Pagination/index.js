import './index.css'

const Pagination = props => {
  const {data, changePages, pageStyling, changePageStyling} = props

  const pages = []

  for (let i = 1; Math.ceil(data.length / 10) + 1 > i; i += 1) {
    pages.push(i)
  }

  const changePageBasedOnClicking = event => {
    changePages(event.target.value)
    changePageStyling(event.target.value)
  }

  const changeNext = () => {
    if (pages.length > pageStyling) {
      changePages(pageStyling + 1)
      changePageStyling(pageStyling + 1)
    }
  }
  const changePrevious = () => {
    if (pageStyling > 1) {
      changePages(pageStyling - 1)
      changePageStyling(pageStyling - 1)
    }
  }

  return (
    <div className="pages-style">
      <button
        className="Previous-button"
        onClick={changePrevious}
        type="button"
      >
        Prev
      </button>
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
      <button className="Next-button" onClick={changeNext} type="button">
        Next
      </button>
    </div>
  )
}

export default Pagination
