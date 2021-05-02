# Backend side of To Do List with NestJs GraphQl and MongoDB [![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://bitbucket.org/lbesson/ansi-colors)


This project has been made for a test in an interview

### Packages

| Project | Version | Links |
| ------- | ------- |------- |
| **Nestjs** | 6.10.8 | https://nestjs.com/
| **Node** | 12.14.0 | https://nodejs.org/en/
| **graphql** | 14.5.8 | https://graphql.org/
| **nestjs/mongoose** | 6.1.2 | https://docs.nestjs.com/techniques/mongodb
| **TypeScript** | ^4.2.4 | https://www.typescriptlang.org/docs/handbook/intro.html

# Getting started

Install `nodejs`.


```
yarn install
yarn dev
```
This will run the application locally on port 3000. To access the graphQL playground, navigate to:
```sh
http://localhost:3000/graphql
```

# Installation

## Manual Installation
```
git clone
cd
```
Install the dependencies:
```
npm install 
```
Set the environment variables (optional):
```
cp .env.example .env
```
# open .env and modify the environment variables (if needed)
Run the application
```
npm run start
```


## Docker
### Docker Pull Command
To get the project image from the docker hub  you can pull the image by using this command
``` 
docker pull
```
### Run using Docker compose

``` 
docker-compose up 
```
Verify the deployment by navigating to your server address in your preferred browser.

```sh
localhost:3000/graphql
```