import InfiniteScroll from "react-infinite-scroll-component"
import { useInfiniteQuery } from "@tanstack/react-query"
import { Pokemon } from './Pokemon'

// const initialUrl: string = `https://pokeapi.co/api/v2/`
const initialUrl = "https://swapi.dev/api/people/";

const fetchUrl = async (url:string) => {
	const response = await fetch(url);
	return response.json();
}

export function InfinitePokemon() {

	// const {
	// 	data,
	// 	fetchNextPage,
	// 	hasNextPage,
	// 	isFetching,
	// 	isLoading,
	// 	isError,
	// 	error, 
	// } = useInfiniteQuery({
	// 	queryKey: ['sw-people'],
	// 	queryFn: ({pageParam = initialUrl}) => fetchUrl(pageParam),
	// 	getNextPageParam: (lastPage) => {
	// 		return lastPage.next || undefined
	// 	},
	// })

	// if (isLoading) {
	// 	return <div className="loading">Loading...</div>;
	// }

	// if (isError) {
	// 	return <div>Error! {error.toString()}</div>;
	// }

	return(	
		<p>hello</p>
		)
	}
	