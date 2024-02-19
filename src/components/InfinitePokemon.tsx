import InfiniteScroll from "react-infinite-scroller"
import { useInfiniteQuery } from "@tanstack/react-query"
import { Pokemon } from './Pokemon'
import { fetchUrl } from '../scripts/fetchUrl'
import prettyName from '../scripts/prettyName'
import styled from 'styled-components'

const pokeUrl:string = "https://pokeapi.co/api/v2/pokemon"

export function InfinitePokemon() {
  const { 
    data, 
    fetchNextPage,
    isFetching,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ['pokemon'],
    queryFn: ({pageParam = pokeUrl} ) => fetchUrl(pageParam), 
    getNextPageParam: (lastPage) => {
      return lastPage.next || undefined
    },
    initialPageParam: pokeUrl,
  })

  if (isLoading) {
    return <div className="loading">Loading...</div>
  }

  if (isError) {
    return <div>Error! {error.toString()}</div>
  }

  return(
    <>
    { isFetching && <div className="loading">Loading...</div>}
	<InfiniteScroll
      pageStart={0}
      loadMore={()=>{fetchNextPage}}
      hasMore={true || false}
      loader={<div className="loader" key={0}>Loading ...</div>}
    >
      {data?.pages.map((group: { results: typeof Pokemon[] }, i) => (
          <PokemonWrapper key={i}>
            {group?.results.map((pokemon: typeof Pokemon) => (
              <SinglePokemon key={pokemon.name}>
                {prettyName(pokemon.name)}
              </SinglePokemon>
            ))}
          </PokemonWrapper>
      ))}
    </InfiniteScroll>
  </>
  );



}

export const SinglePokemon = styled.div`
padding: 2rem;
`;

export const PokemonWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;
