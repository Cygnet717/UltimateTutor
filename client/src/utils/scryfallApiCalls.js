export const scryfallSearch = async(searchParams) => {
  const result = await fetch(`https://api.scryfall.com/cards/search?q=${searchParams}`)

  return result;
}