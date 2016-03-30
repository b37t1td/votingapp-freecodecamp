## Voting App freeCodeCamp's challenge


# Table of Contents
  * [API](#API)
  * [Generics](#Generics)
  * [Polls (get list of polls)](#Polls)
  * [Poll (get single poll)](#Poll)
  * [Authorization](#Authorization)


# API

### Generics

Meta contains user session information


### Polls

List of all available Polls

```
Request:

GET /api/polls

Response:
{
  data : [ polls ]
  meta : {some-meta-info}
}

```

### Poll

Get one poll

```
Request:

GET /api/poll/:id

Response:
{
  data : {poll-data}
  meta : {some-meta-info}
}
```



### Authorization

GitHub user authorization.

```
GET (redirect) /api/auth/login
```
