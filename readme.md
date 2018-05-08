<h1 align>Picture Contest App 🌁</h1>

### Backend application implemented as a REST API for a picture contest application

> The app lists all the entrants with their favourite sight. The entrant model stores a location as it will be showed as pin in a map at the frontend. The user can vote a maximum of 3 entrants every 10 minutes, and those votes will be updated in real time.

**Technology used**: Node.js, Express.js, MongoDB and mongoose.js

## Getting started

To get the Node server running locally:

* Clone this repo.
* Set up MongoDB locally. [Link](https://www.mongodb.com/download-center?jmp=nav#community) to get started (Click on 'Community Server' Tab to download).
  > If you have homebrew in your machine, use the following command in your Terminal: `brew install mongodb`. And then activate it with the command: `brew services start mongodb`.
* `npm install` to install all the dependencies.
* `node index.js` to start the local server (You will see logged in your console 'Server listening').
* View in browser at http://localhost:3000

## Code Overview

### Dependencies

> This is only information about the dependencies used in the project. Using the command `npm install` as explained before, they will all be installed, as they are already included in the [package.json file](https://docs.npmjs.com/files/package.json).

* [expressjs](https://github.com/expressjs/express) - Light-weight web application framework
* [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript
* [mongoose-validator](https://github.com/leepowellcouk/mongoose-validator) - Validators for Mongoose schemas
* [body-parser](https://github.com/expressjs/body-parser) - Node.js body parsing middleware
* [node-config](https://github.com/lorenwest/node-config) - Organizes hierarchical configurations for your app deployments
* [cookie-parser](https://github.com/expressjs/cookie-parser) - Parses cookies and puts the cookie information on req object in the middleware
* [faker](https://github.com/Marak/Faker.js) - for generating fake data for seeding the database and tests
* [pug](https://github.com/pugjs/pug) - high-performance template engine implemented with JavaScript for Node.js and browsers
* [ava](https://github.com/avajs/ava) - Test runner
* [nyc](https://github.com/istanbuljs/nyc) - Command line interface to use with AVA
* [supertest](https://github.com/visionmedia/supertest) - Provides a high-level abstraction for testing HTTP

### Application Structure

* `index.js` - entry point of our application.

* `app.js`- defines our express server and the Error Handling middelware.

* `database-connection.js`- defines the connection to our MongoDB database.

* `routes/` - This folder contains the routes definitions for our API.

* `models/` - This folder contains the models used in our application, using Mongoose schema definitions.

* `services/` - Contains the files where we define the methods to connect to our database.

* `views/`- The view files of our application using the pug template.

* `ìndex.html` - This html file will define our main view structure to be afterwards modelated by our different pug views. Here we will also implement the axios script that will allow us to make real time POST and GET requests from the Google Chrome console.

### Error Handling

In the file `app.js` we define our error-handling middleware for handling any possible error in our application and be able to show error messages that the user/client can understand.

> Every Error ocurred at the database or Schema level will be propagated until this stage to be properly handled.

We will consider different types of error:

* [409](https://httpstatuses.com/409) - When the user/entrant tries to use an email that has been already used for another user.

* [400](https://httpstatuses.com/400) - When the user introduces empty or non valid data in the request.

* [500](https://httpstatuses.com/500) - When any other internal error ocurrs.

### API Endpoints

#### Get a list of entrants with their votations

`GET`

```
/contest/entrant/all
```

#### Add a new entrant

`POST`

```
/contest/entrant/
```

The information of the entrant will be defined on the body request.

Example:

```
{ firstName: 'Joan', lastName: 'López', email: 'joanlopez567@gmail.com', pictureUrl: "http://...", location: { type: 'Point', coordinates: [-564638, 332432] }
```

All fields are required, as we will need them for the different features of the app (like `pictureUrl` or `location` to show it on the map).`email` is an unique field, so if there is already an entrant in the database with the same email, the user will receive a `409` response with the informative error.

#### Add a new user

`POST`

```
/contest/user/
```

The information of the user will be defined on the body request.

Example:

```
{ firstName: 'Marina', lastName: 'Heart', email: 'mar_heart@gmail.com'}
```

`email` is a required and unique field. If there is already an user in the database with the same email, the user will receive a `409` response with the informative error.

#### Make a votation

`POST`

```
/contest/votation'
```

```
body: { entrantId: **THE_ENTRANT_ID**, userId: **THE_USER_ID**}
```

`entrantId` and `userId` are required fields.

If the votation is succesful, the entrant votes (an array with the userIds that performed the vote) will be updated. This way the votes will be easy to count and will also allow us to get more information about the user that performed the vote.

On the other hand, the user information will also be updated with the entrantId and time of votation.

Every user can only vote 3 entrants every 10 minutes. This will be correctly handled by the route checks and will show any encoutered error to the user. (Feature under construction in branch feature/voting)

### Helpful Software

* I recommend using [Robomongo](https://robomongo.org/) (now called Robo 3T) to manage easily your MongoDB database.

* You can use [Axios](https://github.com/axios/axios) or [Postman](https://www.getpostman.com/) to perform the GET and POST requests.

### TODO

* Improve voting system avoiding more than 3 votes every 10 minutes (Feature under construction in branch feature/voting)
