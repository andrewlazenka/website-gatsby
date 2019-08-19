function generateSnippetPageSlug({ fileAbsolutePath }) {
  let slug = fileAbsolutePath.split('/src/pages')[1]
  slug = slug.split('.')
  slug.pop()
  return slug.join('.')
}

function getMonth(month) {
  switch (month) {
    case 0:
      return 'January'
    case 1:
      return 'February'
    case 2:
      return 'March'
    case 3:
      return 'April'
    case 4:
      return 'May'
    case 5:
      return 'June'
    case 6:
      return 'July'
    case 7:
      return 'August'
    case 8:
      return 'September'
    case 9:
      return 'October'
    case 10:
      return 'November'
    case 11:
      return 'December'
    default:
      break
  }
}

function snippetDateString(snippetDate) {
  const dt = new Date(snippetDate)
  return `${getMonth(dt.getMonth())} ${dt.getDate()}, ${dt.getFullYear()}`
}

module.exports = {
  generateSnippetPageSlug,
  snippetDateString,
}
