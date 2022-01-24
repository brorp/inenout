# INENOUT WEB
Peduli Lindungi is an application to manage your .... This app has : 
### RESTful endpoint for :

### auth
1. `POST /login`
2. `POST /register`
3. `PATCH /verification/:id/:token`
4. `POST /resend-otp/:id/:token`
5. `POST /forgot-password/:id/:token`
6. `PATCH /reset-password/:id/:token`


### articles (no need token headers)
1. `GET /banners`
2. `GET /featured-articles`
3. `GET /articles`
4. `GET /articles/:articleId`
5. `GET /more-articles/:articleId`


### comments (need token headers)
1. `POST  /comments/:articleId`
2. `POST /like/:commentId`


### users (need token headers)
1. `POST  /submit`
2. `GET /profile`
3. `POST /profile`
4. `POST /change-password`
5. `PATCH /subscribe`


### JSON formatted response

&nbsp;

### POST /register
> Create users

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
  "username": "String", //required
  "email": "String", //required 
  "password": "String", //required
  "phoneNumber": "String", //required
  "fullName": "String", //required
}
```

**Response (201 - Created)**
```json
{
  "message": "OTP dikirim ke <user email>",
  "id": "Integer",
  "token": "String"
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
  "message": "Password harus diisi"
}
OR
{
  "message": "Nomor telepon harus diisi"
}
OR
{
  "message": "Nomor maksimal 15 digit"
}
OR
{
  "message": "Terjadi kesalahan, mohon coba beberapa saat lagi"
}
```

&nbsp;

### POST /login
> Login user


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
        
  "email": "String",
  "password": "String"
}
```

**Response (200 - OK)**
```json
{
    "message": "Welcome back <User email> !",
    "access_token": "String"
}
```

**Response (401 - Unauthorized)**
```json
{
  "message": "Email atau kata sandi salah"
}
```

&nbsp;

### POST /verification/:id/:token
> Verifikasi user ketika input OTP dari email

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
  "otp": "String"
}
```

**Response (200 - OK)**
```json
{
  "message": "Registrasi Berhasil! Mohon login"
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