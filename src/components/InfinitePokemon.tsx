import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "@tanstack/react-query";
// import { Pokemon } from "./Pokemon"
import { Person } from "./Person"
import { fetchUrl } from "../scripts/fetchUrl";

const initialUrl = "https://swapi.dev/api/people/";

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
    queryFn: ({pageParam = initialUrl} ) => fetchUrl(pageParam), 
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
      {data?.pages.map((group: { results: typeof Person[] }, i) => (
        <div key={i}>
          {group?.results.map((person: typeof Person) => (
            <div key={person.name}>{person.name}</div>
          ))}
        </div>
      ))}
    </InfiniteScroll>
  </>
  );
}
