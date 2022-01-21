export const scryfallSearch = async(searchParams) => {
  const result = await fetch(`https://api.scryfall.com/cards/search?q=${searchParams}`)

  return result;
}

export const scryfallNamedSearch = async(searchName) => {
  console.log(`https://api.scryfall.com/cards/named?fuzzy=${searchName}`)
  const result = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${searchName}`)

  return result;
}