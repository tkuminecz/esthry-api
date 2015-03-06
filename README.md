esthry-api
========

REST api for managing media assets and collections backed by Amazon S3.


Get Started
-------------

```
$ git clone https://github.com/tkuminecz/esthry-api.git
$ cd esthry-api/
$ npm install
$ gulp
$ npm start

```

API Documentation
-----------------------

All requests should be made with `Content-Type: application/json`.

### GET /asset

Returns an array of asset IDs.

`Response`
```
[
	'8asd8fa7dsfadsfasfa'
]
```

### GET /asset/:id

Returns the asset identified by `:id`

`Response`
```
{
  "_id": "8asd8fa7dsfadsfasfa",
  "collection_id": "test",
  "description": "the description",
  "tags": [
    "foo"
  ],
  "title": "the title",
  "date_created": 1425616635,
  "s3_url": "https://tkuminecz-images.s3.amazonaws.com/f4f3f3f2-947e-44a2-93aa-a0f7e2f3f4354",
  "type": "image/jpeg",
  "size": "105252"
}
```

### POST /asset

`Request`
```
{
  "title": "A title",
  "description": "A description",
  "tags": ["some", "tags"],
  "image_url": "http://URL/TO/IMAGE/"	
}
```

`Response`
```
{
  "_id": "8asd8fa7dsfadsfasfa",
  "collection_id": "test",
  "description": "A description",
  "tags": [
    "some", "tags"
  ],
  "title": "A title",
  "date_created": 1425616635,
  "s3_url": "https://tkuminecz-images.s3.amazonaws.com/f4f3f3f2-947e-44a2-93aa-a0f7e2f3f4354",
  "type": "image/jpeg",
  "size": "105252"
}
```

### PUT /asset/:id

Updates the asset identified by `:id`

`Request`
```
{
	"title": "A title",
	"description": "A description",
	"tags": ["some", "tags"],
	"image_url": "http://URL/TO/IMAGE/"	
}
```

`Response`
```
{
}
```

### DEL / asset/:id 

Deletes the asset identified by `:id`
