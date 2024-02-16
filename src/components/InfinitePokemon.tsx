import { useState } from 'react'
import InfiniteScroll from "react-infinite-scroller"
import { useInfiniteQuery } from "@tanstack/react-query"
// import { Pokemon } from "./Pokemon"
import { Person } from "./Person"

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async ( url:string ) => {
  const response = await fetch(url)
  return response.json()
}

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
    queryKey: ['sw-people'],
    queryFn: ( {pageParam = initialUrl} ) => fetchUrl( pageParam ), 
    getNextPageParam: ( lastPage ) => {
      return lastPage.next || undefined
    },
  })

  // const [people, setPeople] = useState<Person[]>([])

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (isError) {
    return <div>Error! {error.toString()}</div>;
  }

  return(
    <>
    <p>Hello World!</p>
    { isFetching && <div className="loading">Loading...</div> }
    <InfiniteScroll 
      dataLength={data.pages.length} // This is important field to render the next data
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
    {
    /* 
      {data.pages.map((group, i) => (
        // Using 'name' as key isn't recommended if names can be non-unique
        <div key={i}>
          {group.results.map((person) => (
            <div key={person.name}>{person.name}</div>
          ))}
        </div>
      ))}
      */
    }
    </InfiniteScroll> 
  </>
  );
}
