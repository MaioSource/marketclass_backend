# nodejs-secure restful-api with jwt web-Token

### Prerequisites

Node
npm
Express
jsonwebtoken
mongoose


### Setup

> now install npm and packages

```shell
$ npm install
```


> Run the database using docker-compose

```shell
$ docker-compose up
```

> Mongo express running on port 8081
> user: admin :: password: admin

> .env file shall be modified:


```shell
DATABASE_URI=mongodb://admin:admin@localhost:27017/marketclass?authSource=admin
SECRET=<JWT Secret>
CLOUDINARY_CLOUD=<https://cloudinary.com/documentation/image_upload_api_reference>
CLOUDINARY_KEY=<https://cloudinary.com/documentation/image_upload_api_reference>
CLOUDINARY_SECRET=<https://cloudinary.com/documentation/image_upload_api_reference>
FRONTEND_URL=<for example: http://localhost:3000>
SENDGRID_API_KEY=<https://docs.sendgrid.com/api-reference/api-keys/create-api-keys>
```
