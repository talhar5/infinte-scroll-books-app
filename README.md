# Infinite Scroll Page
This page fetches books from openlibrary and displays their titles.

In the searh box, when book name is typed, it sends request to fetch data. Upon typing another letter, it cancels the previous request and sends the new request with the new query. 

Program shows first 100 results and if you scroll down to the last result, and there are more results available, then it will fetch next 100 results and concatinate at the end of the previous results.
In this way it makes a infinity scroll page for query which has large number of results.