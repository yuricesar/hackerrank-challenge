In this challenge, use the HTTP GET method to retrieve information from a database of Card Transactions records for users. Query https://jsonmock.hackerrank.com/api/transactions/search?userId=uid where uid is the value of user id passed to the function, to find all the records that belong to the user with id uid. The query response is paginated and can be further accessed by appending to the query string page=num where num is the page number. The query response from the API is a JSON response with the following five fields:
 
 -page: the current page 
 -per_page: he maximum number of results per page 
 -total: the total number of records in the search result 
 -total_pages: the total number of pages which must be queried to get all the results 
 -data: an array of JSON objects that contains transaction records 