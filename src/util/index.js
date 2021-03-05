function generateSnippetPageSlug({ fileAbsolutePath }) {
  let slug = fileAbsolutePath.split('/src/pages')[1]
  slug = slug.split('.')
  slug.pop()
  return slug.join('.')
}

const adjustMonth = month => month - 1

module.exports = {
  adjustMonth,
  generateSnippetPageSlug,
}
