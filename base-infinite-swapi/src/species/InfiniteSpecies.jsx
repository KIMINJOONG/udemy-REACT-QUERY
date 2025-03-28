import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import { Species } from "./Species";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const {
    isLoading,
    isError,
    error,
    isFetching,
    data,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    "sw-species",
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    }
  );

  if (isLoading) return <div className="loading">Loading...</div>;
  if (isError) return <div>Error! {error.toString()}</div>;

  // TODO: get data for InfiniteScroll via React Query
  return (
    <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
      {isFetching && <div className="loading">Loading...</div>}
      {data.pages.map((pageData) =>
        pageData.results.map((species) => {
          return (
            <Species
              key={species.name}
              name={species.name}
              language={species.language}
              averageLifespan={species.averageLifespan}
            />
          );
        })
      )}
    </InfiniteScroll>
  );
}
