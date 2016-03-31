## Voting App freeCodeCamp's challenge

 Build a Voting application (freeCodeCamp's Challenge)

[Home of the project](https://votingapp-freecodecamp.herokuapp.com/app)

# Table of Contents
  * [API](#api)
  * [Generics](#generics)
  * [Creating polls](#poll-create)
  * [Updating polls](#poll-update)
  * [Polls (get list of polls)](#polls)
  * [Poll (get single poll)](#poll)
  * [Vote api](#vote)
  * [Authorization](#authorization)


# API <a name="api"></a>

### Generics <a name="generics"></a>

Meta contains user session information

Response codes are 500 internal err,  403 forbidden, 200 ok.


### Creating polls <a name="poll-create"></a>

```
Request:
POST /api/poll
@data { title : title , variants : [{ title : title, voted : 0}]}

Response:
200 Ok
{}
```

### Poll update <a name="poll-update"></a>

```
Request:
POST /api/poll/:id
@data { title : title , variants : [{ title : title, voted : 0}]}

Response:
200 Ok
{}
```


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

### Vote <a name="vote"></a>

Vote for a poll variant

```
Request:

POST /api/vote
@param id        (id of the poll)
@param variant   (variant title)

Reponse:
200 OK
{}
```

### Authorization <a name="authorization"></a>

GitHub user authorization.

```
GET (redirect) /api/auth/login
```
