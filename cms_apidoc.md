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
1. `GET /cms/featured-articles`
2. `POST /cms/featured-articles`
3. `GET /cms/featured-articles/:id`
4. `POST /cms/featured-articles/:id`
5. `PATCH /cms/featured-articles/status/:id`
6. `PATCH /cms/featured-articles/homepage`


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
```
not needed
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


### GET /banners
> Tabel banner

**Request Headers**
```json
{
  "access_token": "String"
}
```
**Request Params**
```json
{
  "page": "integer (default: 1)",
  "size": "string (default: 5)",
  "search": "string"
} 
```

**Request Body**
```json
{    
  "otp": "String"
}
```

**Response (200 - OK)**
```json
{
  "response": ""
}
```

**Response (400 - Bad Request)**
```json
{
  "message": "Kode OTP salah"
}
OR
{
  "message": "Tidak dapat mengakses"
}

```

&nbsp;

### POST /resend-otp/:id
> Resend OTP

**Request Headers**
```
not needed
```
**Request Params**
```json
{
  "id": "integer"
}
```

**Request Body**
```
not needed
```

**Response (200 - OK)**
```json
{
  "message": "OTP was sent to <user.email>.",
  "id": "integer",
  "token": "string",
}
```

**Response (400 - Bad Request)**
```json
{
  "message": "Terjadi kesalahan, mohon coba beberapa saat lagi"
}
```

**Response (404 - Not Found)**
```json
{
  "message": "Tidak dapat mengakses"
}
```

&nbsp;

### POST /forgot-password/:id/:token
> Forgot Password


**Request Headers**
```
not needed
```

**Request Params**
```json
{
  "id": "integer (required)",
  "token": "string (required)"
}
```

**Request Body**
```json
{    
  "email": "String",
  "url": "String", // minta link windows.location di FE
}
```


**Response (201 - Created)**
```json
{
  "message": "Link untuk mengubah password sudah dikirim melalui email anda"
}
```

**Response (400 - Bad Request)**
```json
{
    "message": "Terjadi kesalahan, mohon coba beberapa saat lagi"
}
OR
{
    "message": "Email harus diisi"
}
```

**Response (404 - Not Found)**
```json
{
  "message": "Tidak dapat mendapatkan info user"
}
```

&nbsp;

### POST /reset-password/:id/:token
> Reset password ketika klik link pada email

**Request Headers**
```
not needed
```
**Request Params**
```json
{
  "id": "integer (required)",
  "token": "string (required)"
}
```

**Request Body**

```json
{
  "password": "string",
  "password2": "string"
}
```

**Response (201 - Created)**
```json
{
  "message": "Kata sandi berhasil diubah, mohon login kembali"
}
```
**Response (400 - Bad Request)**
```json
{
  "message": "Password harus diisi"
}
```

**Response (401 - Unauthorized)**
```json
{
  "message": "Password tidak sama"
}
```

&nbsp;

### GET /banners
> Get banner di homepage

**Request Headers**
```json
not needed
```

**Request Params**
```
not needed
```

**Request Body**
```
not needed
```

**Request Query**
```
not needed
```

**Response (200 - Ok)**
```json
[
    {
        "id": "Integer",
        "caption": "String",
        "imgBanner": "String",
        "articleId": "Integer",
        "status": "string"
    },
]
```

&nbsp;

### GET /featured-articles
> Get featured articles di homepage dan setiap kategory

**Request Headers**
```json
not needed
```

**Request Params**
```
not needed
```

**Request Body**
```
not needed
```

**Request Query**
```json
{
    "tag": "integer"
}
```

**Response (200 - Ok)**
```json
[{
    "id": "Integer",
    "title": "String",
    "caption": "String",
    "articleId": "Integer",
    "img": "String",
    "isHomepage": "Boolean",
    "status": "String"
}]
```

&nbsp;

### GET /articles
> Get articles di homepage atau queries

**Request Headers**
```json
not needed
```

**Request Params**
```
not needed
```

**Request Body**
```
not needed
```

**Request Query**
```json
{
    "tag": "integer",
    "search": "string" //by title
}
```

**Response (200 - Ok)**
```json
[{
    "title": "String",
    "tag": "Integer",
    "content": "Text",
    "img": "String",
    "status": "String",
    "publishedAt": "String",
    "userId": "Integer",
    "User": {
            "fullName": "String",
            "profilePic": "String"
        }                 
}]
```

&nbsp;

### GET /articles/:articleId
> GET article detail

**Request Headers**
```json
not needed
```

**Request Params**
```json
{
    "articleId": "Integer"
}
```

**Request Body**
```
not needed
```

**Request Query**
```
not needed
```

**Response (200 - Ok)**
```json
{
      "articles": {
        "id": "Integer",
        "title": "String",
        "tag": "Integer",
        "content": "Text",
        "img": "String",
        "status": "String",
        "publishedAt": "String",
        "userId": "Integer",
        "User": {
            "fullName": "String",
            "profilePic": "String"
        },
        "ArticleSections": [
            {
                "sectionTitle": "String",
                "sectionText": "Text",
                "sectionImg": "String",
                "articleId": "Integer",
            }
        ]
    },
    "comments": [
        {
            "commentText": "Text",
            "userId": "Integer",
            "articleId": "Integer",
            "status": "String",
            "CommentLike": [
                {
                    "userId": "Integer"
                }
            ] // request pake count/length di FE buat tampilin jumlah likes
        }
    ]
}
```

&nbsp;

### GET /more-articles/:articleId
> Get more article di bawah section comment

**Request Headers**
```json
not needed
```

**Request Params**
```json
{
    "articleId": "Integer"
}
```

**Request Body**
```
not needed
```

**Request Query**
```
not needed
```

**Response (200 - Ok)**
```json
{
    "id": "Integer",
    "title": "String",
    "tag": "Integer",
    "content": "Text",
    "img": "String",
    "status": "String",
    "publishedAt": "String",
    "userId": "Integer",
}
```

&nbsp;

### GET /ads
> Get more article di bawah section comment

**Request Headers**
```json
not needed
```

**Request Params**
```
not needed
```

**Request Body**
```
not needed
```

**Request Query**
```
not needed
```

**Response (200 - Ok)**
```json
{
    "id": "Integer",
    "title": "String",
    "url": "Integer",
    "imgAds": "String",
    "status": "String",
}
```

&nbsp;


### POST /comments/:articleId
> POST comment

**Request Headers**
```json
{
  "access_token": "string"
}
```

**Request Params**
```json
{
  "articleId": "string"
}
```

**Request Body**
```json
{
    "commentText": "Text"
}
```

**Response (201 - Created)**
```json
{
    "message": "Komen berhasil dibuat",
    "response": {
        "commentText": "Text",
        "userId": "Integer",
        "articleId": "Integer",
    }
}
```

**Response (401 - Forbidden)**
```json
{
  "message": "Invalid Token"
}
```

&nbsp;

### POST /like/:commentId
> POST comment like

**Request Headers**
```json
{
  "access_token": "string"
}
```

**Request Params**
```json
{
  "commentId": "integer"
}
```

**Request Body**
```
not needed
```

**Response (201 - Created)**
```json
{
  "message": "Komen berhasil disukai"
}
```

**Response (400 - Bad Request)**
```json
{
  "message": "Komen sudah disukai"
}
```

&nbsp;


### POST /submit
> POST Submitted Articles

**Request Headers**
```json
{
  "access_token": "string"
}
```

**Request Params**
```
not needed
```

**Request Body**
```json
{
    "title": "String",
    "attachment": "String", // req.file
    "img": "Array(String)" // req.files
}
```

**Response (201 - Created)**
```json
{
  "message": "Artikel berhasil diunggah dan akan di review oleh kami, mohon cek email untuk status artikel" 
}
```

**Response (400 - Bad Request)**
```json
{
  "message": "Mohon unggah file PDF berisi konten artikel anda"
}
OR
{
  "message": "Mohon unggah file PDF berisi konten artikel anda"
}
OR
{
  "message": "Judul harus diisi"
}
```

&nbsp;

### GET /profile
> GET user detail

**Request Headers**
```json
{
  "access_token": "string"
}
```

**Request Params**
```
not needed
```

**Request Body**
```
not needed
```

**Response (200 - Ok)**
```json
{
    "id": "integer",
    "username": "String",
    "email": "String",
    "password": "String",
    "phoneNumber": "String",
    "fullName": "String",
    "profilePic": "String",
    "status": "String",
    "verifiedAt": "String",
}
```

**Response (404 - Not Found)**
```json
{
  "message": "Tidak dapat mendapatkan info user"
}
```

&nbsp;

### POST /profile
> Send activation link by id

**Request Headers**
```json
{
  "access_token": "string"
}
```

**Request Params**
```
not needed
```

**Request Body**
```json
{
    "username": "String",
    "email": "String",
    "password": "String",
    "phoneNumber": "String",
    "fullName": "String",
    "profilePic": "String",
}
```

**Response (201 - Created)**
```json
{
  "message": "Profil berhasil diubah"
}
```

**Response (400 - Bad Request)**
```json
{
  "message": "Name lengkap harus diisi"
}
OR
{
  "message": "Email harus diisi"
}
OR
{
  "message": "Email sudah terdaftar"
}
OR
{
  "message": "Format email tidak valid"
}
OR
{
  "message": "Nomor telepon harus diisi"
}
OR
{
  "message": "Nomor maksimal 15 digit"
}
```

**Response (404 - Not Found)**
```json
{
  "message": "Tidak dapat mendapatkan info user"
}
```

&nbsp;

### PATCH /change-password
> Patch for change password

**Request Headers**
```json
{
  "access_token": "string"
}
```

**Request Params**
```
not needed
```

**Request Body**
```json
{
    "oldPassword": "String",
    "password": "String",
    "confirmPassword": "String"
}
not needed
```

**Response (201 - Created)**
```json
{
  "message": "Password anda berhasil diubah",
}
```

**Response (400 - Bad Request)**
```json
{
    "message": "Password tidak sama"
}
OR
{
    "message": "Password harus diisi"
}
```
 
**Response (404 - Unauthorized)**
```json
{
    "message": "Tidak dapat mendapatkan info user"
}
```

&nbsp;

### PATCH /subscribe
> Create subscribtion

**Request Headers**
```json
{
  "access_token": "string"
}
```

**Request Body**
```json
{
  "email": "String"
}
```


**Response (201 - Created)**
```json
{
  "message": "Terima kasih telah berlangganan newsletter dari InEnOut",
}
```

**Response (404 - Not Found)**
```json
{
  "message": "Tidak dapat mendapatkan info user"
}
```


## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```