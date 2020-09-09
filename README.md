# Family Promise of Spoke Data Sharing API

## Project Overview

## Tech Stack

## HTTP Response Codes
Each response will be returned with one of the following HTTP status codes:

* `200` `OK` The request was successful
* `400` `Bad Request` There was a problem with the request (missing authorization header)
* `404` `Not found` An attempt was made to access a resource that does not exist in the API
* `405` `Method not allowed` The resource being accessed doesn't support the method specified (GET, POST, etc.).
* `500` `Server Error` An error on the server occurred (bad credentials, ie. access token)

## Development
* `git clone`
* `cd api`
* `pipenv shell`
* `pipenv install`
* `python app.py`

## Resources

### Endpoint 1


#### Request

    GET 

#### Response
```json

```