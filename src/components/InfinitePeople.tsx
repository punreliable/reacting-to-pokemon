import InfiniteScroll from "react-infinite-scroller"
import { useInfiniteQuery } from "@tanstack/react-query"
import { Person } from "./Person"
import { Key } from "react";

const initialUrl:string = "https://swapi.dev/api/people/"
const fetchUrl = async (url:string) => {
	const response = await fetch(url);
	return response.json();
};

export default function InfinitePeople() {

	const { 
		data, 
		fetchNextPage, 
		hasNextPage,
		isFetching,
		isLoading,
		isError,
		error,
	} = useInfiniteQuery(
	{
		queryKey: ['sw-people'],
		queryFn: ({pageParam = initialUrl} ) => fetchUrl(pageParam), 
		//getNextPageParam: (lastPage) => {
		//	return lastPage.next || undefined;
		//},
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
     loadMore={ () => {
      if(!isFetching) {
        fetchNextPage();
      } 
      }}
     hasMore={hasNextPage}
    >
		{data?.pages.map((pageData:unknown) => {
			return pageData?.results.map((person: { name: Key | null | undefined; }) => {
				return (
					<Person
						key={person.name}
						name={person.name}
					/>
				);
			});
		})}
    </InfiniteScroll>
  </>
  );
}
