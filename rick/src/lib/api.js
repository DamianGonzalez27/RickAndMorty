/**
 * Metodologia de consumo de consumo
 * 
 */
async function getAllCharacters()
{
    const response = await fetch("https://rickandmortyapi.com/api/character/")
    const parsedJson = await response.json()
    return parsedJson.results
}

async function getCharactersById(id)
{
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
    const parserJson = await response.json()
    return parserJson
}

export default{
    getAllCharacters,
    getCharactersById
}