# How to build an Instagram Clone with React and Node.js

Read the full tutorial here: [**>> How to build an Instagram Clone with React and Node.js**](https://www.cometchat.com/tutorials/#)

## Technology

This demo uses:

- CometChat Pro 3.0.0
- CometChat UI Kit
- React.js
- Uuid
- Validator
- @emotion/core
- dateformat
- emoji-mart
- react-html-parser
- twemoji
- Node.js
- Express.js
- MySQL
- Cors
- Dotenv
- Nodemon

## Running the demo - Client Side.

To run the demo follow these steps:

1. [Head to CometChat Pro and create an account](https://app.cometchat.com/signup)
2. From the [dashboard](https://app.cometchat.com/apps), add a new app called **"instagram-clone-react-node"**
3. Select this newly added app from the list.
4. From the Quick Start copy the **APP_ID, APP_REGION and AUTH_KEY**. These will be used later.
5. Also copy the **REST_API_KEY** from the API & Auth Key tab.
6. Navigate to the Users tab, and delete all the default users and groups leaving it clean **(very important)**.
7. Download the repository [here](https://github.com/hieptl/instagram-clone-react-node/archive/main.zip) or by running `git clone https://github.com/hieptl/instagram-clone-react-node.git` and open it in a code editor.
8. Create a file called **.env** in the root folder of your project.
9. The content of the **.env** file should be as follow.

```js
REACT_APP_COMETCHAT_APP_ID=xxx-xxx-xxx-xxx-xxx-xxx-xxx-xxx
REACT_APP_COMETCHAT_REGION=xxx-xxx-xxx-xxx-xxx-xxx-xxx-xxx
REACT_APP_COMETCHAT_AUTH_KEY=xxx-xxx-xxx-xxx-xxx-xxx-xxx-xxx
```

10. Make sure to exclude **.env** in your gitIgnore file from being exposed online.
11. Run the following command to install the app.

```sh
    npm install
    npm run start
```

## Running the Demo - Server Side

To run the demo follow these steps:

1. We will use the MySQL database. For this reason, this section describes how to create the database and its table. Before proceeding, you need to make sure that you have installed the MySQL database on your computer already. To create the database and its table, you need to get the instagram.sql and run it.
2. Create .env file and replace the below information with the information of your database connection.
```js
PORT=xxx - xxx - xxx - xxx - xxx - xxx - xxx - xxx
DB_HOST=xxx - xxx - xxx - xxx - xxx - xxx - xxx - xxx
DB_USER_NAME=xxx - xxx - xxx - xxx - xxx - xxx - xxx - xxx
DB_USER_PASSWORD=xxx - xxx - xxx - xxx - xxx - xxx - xxx - xxx
DB_NAME=xxx - xxx - xxx - xxx - xxx - xxx - xxx - xxx
DB_PORT=xxx - xxx - xxx - xxx - xxx - xxx - xxx - xxx
```
3. Install all the dependencies of the applicatoin by running
```js
npm install
```
4. Because we are installing the nodemon library. Therefore you can run one of the follow statements to run your project.
```js
node index.js 
or 
npx nodemon index.js
```
5. Make sure to include the .env file in your gitIgnore file from being exposed online.

Questions about running the demo? [Open an issue](https://github.com/hieptl/instagram-clone-react-node/issues). We're here to help ✌️

## Useful links

- 🏠 [CometChat Homepage](https://app.cometchat.com/signup)
- 🚀 [Create your free account](https://app.cometchat.com/apps)
- 📚 [Documentation](https://www.cometchat.com/docs/home/welcome)
- 👾 [GitHub](https://www.github.com/cometchat-pro)
- 🔥 [Node.js](https://nodejs.org/en/)
- 🔷 [React.js](https://reactjs.org/)