const Pagination = props => {
  const {data, changePages} = props
  const pages = []

  for (let i = 1; Math.ceil(data.length / 10) + 1 > i; i += 1) {
    pages.push(i)
  }

  return (
    <div>
      {pages.map(each => (
        <button type="button" key={each}>
          {each}
        </button>
      ))}
    </div>
  )
}

export default Pagination
