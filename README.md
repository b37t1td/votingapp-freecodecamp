## Voting App freeCodeCamp's challenge

 Build a Voting application (freeCodeCamp's Challenge)


# Table of Contents
  * [API](#api)
  * [Generics](#generics)
  * [Polls (get list of polls)](#polls)
  * [Poll (get single poll)](#poll)
  * [Authorization](#authorization)


# API <a name="api"></a>

### Generics <a name="generics"></a>

Meta contains user session information


### Polls <a name="polls"></a>

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

### Poll <a name="poll"></a>

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



### Authorization <a name="authorization"></a>

GitHub user authorization.

```
GET (redirect) /api/auth/login
```
