# Express GraphQL server

Mock server for GZ console proof of concept

## Getting Started

Clone the repo & install dependencies

```
npm install
```

Run the server locally

```
heroku local web
```

Use /graphql url to open the Graphiql client and perform Graphql queries

### Deploy changes to Heroku

After you commit your changes to git, you can deploy your app to Heroku

```
git add .
git commit -m "stuff I've changed"
heroku login
heroku create
git push heroku master
```

### View the changes

To open the app in the browser type

```
heroku open
```

Ta-daa, your changes are live :)