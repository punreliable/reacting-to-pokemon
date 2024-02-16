import InfiniteScroll from "react-infinite-scroller"
import { useInfiniteQuery } from "@tanstack/react-query"
import { Pokemon } from './Pokemon'
import { Person } from './Person'
import { fetchUrl } from '../scripts/fetchUrl'
import prettyName from '../scripts/prettyName'
import styled from 'styled-components'

const initialUrl:string = "https://swapi.dev/api/people/"
const pokeUrl:string = "https://pokeapi.co/api/v2/pokemon"

export function InfinitePokemon() {
  const { 
    data, 
    fetchNextPage, 
    hasNextPage,
    isFetching,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ['results'],
    queryFn: ({pageParam = pokeUrl} ) => fetchUrl(pageParam), 
    getNextPageParam: (lastPage) => {
      return lastPage.next || undefined;
    },
  });

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (isError) {
    return <div>Error! {error.toString()}</div>;
  }

  return(
    <>
    { isFetching && <div className="loading">Loading...</div>}
	<InfiniteScroll
      dataLength={data?.pages.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
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
