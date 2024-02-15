import { useInfiniteQuery } from '@tanstack/react-query'
import InfiniteScroll from 'react-infinite-scroller'




const InfinitePokemon = () => {

	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetching,
		isLoading,
		isError,
		error, 
	} = useInfiniteQuery({
		queryKey: ['pokemon'],
		queryFn: ({pageParam = initialUrl}) => fetchUrl(pageParam),
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
		loadMore={fetchNextPage}
		hasMore={hasNextPage}
	>
	<p>Hello Pokemon</p>
	</InfiniteScroll>
	</>
	)

}

export default InfinitePokemon
