import { useCallback, useRef, useState } from "react";
import useGetBook from "./useGetBook";

function App() {
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)

  const { books, isLoading, hasMore, hasError } = useGetBook(query, pageNumber);

  function handleSearch(e) {
    setQuery(e.target.value);
    setPageNumber(1)
  }
  const observer = useRef();
  const lastBookElementRef = useCallback(node => {
    if (isLoading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prev => prev + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [isLoading, hasMore]);

  return (
    <>
      <div className="sticky">
        <label htmlFor="bookName">Enter Book Name: </label>
        <input id="bookName" value={query} onChange={handleSearch} type="text" placeholder="search books" />
      </div>
      {books.map((item, index) => {
        if (books.length === index + 1) {
          return <div ref={lastBookElementRef} key={item}>{item}</div>
        } else {
          return <div key={item}>{item}</div>
        }
      })}
      {isLoading && <div className="loader"></div>}
      {hasError && <div>Error has occured.</div>}
    </>
  );
}

export default App;
