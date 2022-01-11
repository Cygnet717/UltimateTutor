export const scryfallSearch = async(searchParams) => {
  const result = await fetch(`https://api.scryfall.com/cards/search?q=${searchParams}`)

  return result;
}

export const scryfallNamedSearch = async(searchName) => {
  const resutl = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${searchName}`)
}