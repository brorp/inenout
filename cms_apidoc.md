# INENOUT CMS
Peduli Lindungi is an application to manage your .... This app has : 
### RESTful endpoint for :

### auth
1. `POST /cms/login`


### banners
1. `GET /cms/banners`
2. `POST /cms/banners`
3. `GET /cms/banners/:id`
4. `POST /cms/banners/:id`
5. `PATCH /cms/banners/status/:id`


### featured articles
1. `GET /cms/featured-articles/homepage`
2. `GET /cms/featured-articles/categories`
3. `POST /cms/featured-articles`
4. `GET /cms/featured-articles/:id`
5. `POST /cms/featured-articles/:id`
6. `PATCH /cms/featured-articles/status/:id`


### ads
1. `GET /cms/ads`
2. `POST /cms/ads`
3. `GET /cms/ads/:id`
4. `POST /cms/ads/:id`
5. `PATCH /cms/ads/status/:id`

### articles
1. `GET /cms/articles`
2. `POST /cms/articles`
3. `GET /cms/articles/:id` // detail by article id
4. `POST /cms/articles/:id`
4. `GET /cms/articles/:userId` // detail by user
5. `PATCH /cms/articles/status/:id` 

### users
1. `GET /cms/users`
2. `GET /cms/users/:id`
3. `PATCH /cms/users/status/:id`

### admins
1. `GET /cms/admins`
2. `POST /cms/admins`
3. `PATCH /cms/admins/status/:id`

### comments
1. `GET /cms/comments`
2. `GET /cms/comments/:articleId`
3. `GET /cms/comments/:userId`
4. `PATCH /cms/comments/status/:id`

### categories
1. `GET /cms/categories`
2. `GET /cms/categories`
3. `POST /cms/categories/:id`
4. `POST /cms/categories/:id`
5. `POST /cms/subcategories/:categoryId`
6. `PATCH /cms/categories/status/:id`

### inbox
1. `GET /cms/incoming-articles`
2. `GET /cms/incoming-articles/:id`
3. `PATCH /cms/incoming-articles/status/:id`
4. `GET /cms/subscribed-users`

### JSON formatted response

&nbsp;

### POST /login
> Login admin

**Request Headers**

```json
{
    "access_token": "String"
}
    
```

**Request Params**
```
not needed
```
**Request Body**

```json
{
  "email": "String", //required 
  "password": "String", //required
}
```

**Response (201 - Created)**
```json
{
  "access_token": "String"
}
```

**Response (400 - Bad Request)**
```json
{
  "message": "Email atau kata sandi salah"
}
```

&nbsp;


### GET 
> All CMS tables with queries and filter
### /banners
### /featured-articles
### /ads
### /articles
### /users
### /admins
### /comments
### /categories
### /subscribed-users
## /incoming-articles


**Request Headers**
```json
{
  "access_token": "String"
}
```
**Request Params**
```json
"/banners" 
"/featured-articles/homepage" 
"/featured-articles/categories" 
"/ads" 
"/categories"
"/subscribed-users"
{
  "page": "integer (default: 1)",
  "size": "string (default: 5)",
  "search": "string"
}

"/articles"
"/users"
"/admins"
"/comments"
"/incoming-articles"
{
  "page": "integer (default: 1)",
  "size": "string (default: 5)",
  "search": "string",
  "filter": "string", // queries: Active, Inactive
}

```

**Request Body**
```
not needed
```

**Response (200 - OK)**
```json
"/banners"
{
    "totalItems": "Integer",
    "response": [
        {
            "id": "Integer",
            "title": "String",
            "imgBanner": "String",
            "articleId": "Integer",
            "status": "String",
            "createdAt": "String",
            "updatedAt": "String"
        },
    ],
    "totalPages": "Integer",
    "currentPage": "Integer"
}

"featured-articles/homepage"
"featured-articles/categories"
{
    "totalItems": "Integer",
    "response": [
        {
            "id": "Integer",
            "title": "String",
            "caption": "String",
            "articleId": "Integer",
            "img": "String",
            "isHomepage": "Boolean",
            "status": "String",
            "createdAt": "String",
            "updatedAt": "String"
        }
    ],
    "totalPages": "Integer",
    "currentPage": "Integer"
}

"/ads"
{
    "totalItems": "Integer",
    "response": [
        {
            "id": "Integer",
            "title": "String",
            "url": "String",
            "imgAds": "String",
            "status": "String",
            "createdAt": "String",
            "updatedAt": "String"
        },
    ],
    "totalPages": "Integer",
    "currentPage": "Integer"
}

"/articles"
{
    "totalItems": "Integer",
    "response": [
        {
            "id": "Integer",
            "title": "String",
            "tag": "Integer",
            "content": "String",
            "imgThumbnail": "String",
            "img": "String",
            "status": "String",
            "publishedAt": "String",
            "userId": "Integer",
            "createdAt": "String",
            "updatedAt": "String",
            "User": {
                "fullName": "String",
                "email": "String"
            }
        },
    ],
    "totalPages": "Integer",
    "currentPage": "Integer"
}

"/users"
{
    "totalItems": "Integer",
    "response": [
        {
          "id": "Integer",
          "email": "String",
          "phoneNumber": "String",
          "fullName": "String",
          "profilePic": "String",
          "status": "String",
          "verifiedAt": "String",
          "createdAt": "String",
          "updatedAt": "String"
        },
    ],
    "totalPages": "Integer",
    "currentPage": "Integer"
}

"/admins"
{
    "totalItems": "Integer",
    "response": [
        {
          "id": "Integer",
          "email": "String",
          "fullName": "String",
          "role": "String",
          "status": "String",
          "createdAt": "String",
          "updatedAt": "String"
        },
    ],
    "totalPages": "Integer",
    "currentPage": "Integer"
}

"/comments"
{
    "totalItems": "Integer",
    "response": [
        {
            "id": "Integer",
            "commentText": "String",
            "userId": "Integer",
            "articleId": "Integer",
            "status": "String",
            "createdAt": "String",
            "updatedAt": "String"
        },
    ],
    "totalPages": "Integer",
    "currentPage": "Integer"
}

"/categories"
{
    "totalItems": "Integer",
    "response": [
        {
            "id": "Integer",
            "name": "String",
            "status": "String",
            "createdAt": "String",
            "updatedAt": "String"
        },  
    ],
    "totalPages": "Integer",
    "currentPage": "Integer"
}

"/incoming-articles"
{
    "totalItems": "Integer",
    "response": [
        {
            "id": "Integer",
            "title": "String",
            "attachment": "String",
            "img": "Array of String",
            "createdAt": "String",
            "updatedAt": "String"
        },  
    ],
    "totalPages": "Integer",
    "currentPage": "Integer"
}

"/subscribed-user"
{
    "totalItems": "Integer",
    "response": [
        {
            "id": "Integer",
            "email": "String",
            "createdAt": "String",
            "updatedAt": "String"
        },  
    ],
    "totalPages": "Integer",
    "currentPage": "Integer"
}

```

&nbsp;

### POST (CREATE AND EDIT)
**Request Headers**
```json
{
  "access_token": "String"
}
```
**Request Params**
```json

```

**Request Body**
```json
"POST /cms/banners" 
"POST /cms/banners/:id"
{
    "title": "String",
    "imgBanner": "File"
}

"POST /cms/featured-articles"
"POST /cms/featured-articles/:id"
{
    "title": "String",
    "caption": "String",
    "img": "File",
}

"POST /cms/ads"
"POST /cms/ads/:id"
{
    "title": "String",
    "url": "String",
    "imgAds": "File",
}

"POST /cms/articles"
{
    "email": "String",
    "fullName": "String",
    "title": "String",
    "content": "Text",
    "tag": "Integer", // (input nya fetch dari categories)
    "imgThumbnail": "File",
    "img": "File",
    // request body nya json
    "sectionTitle": "String",
    "sectionText": "String",
    "sectionImg": "File",
}

"POST /cms/admins"
{
    "email": "String",
    "fullName": "String",
    "password": "String",
    "password2": "String", // password confirmation
}

"POST /cms/categories"
"POST /cms/categories/:id"
"POST /cms/subcategories"
"POST /cms/subcategories/:id"
{
    "name": "String",
    // request params for subcategories: categoryId
}
```

### PATCH (CHANGE STATUS)
### /banners/status/:id
### /featured-articles/status/:id
### /ads/status/:id
### /article/status/:id
### /users/status/:id
### /admins/status/:id

### /comments/status/:id

### /categories/status/:id
### /incoming-articles/status/:id


**Request Headers**
```json
{
  "access_token": "String"
}
```

**Request Params**
```json
{
    "status": "String", // Active, Inactive
    "id": "Integer"
}

// Khusus yang di incoming article /incoming-articles/status/:id
{
    "status": "String", // Accepted, One Review, Rejected
    "id": "Integer"
}
```

## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```