const express = require("express");
const app = express();
const server = require("http").Server(app);
const next = require("next");
const cors = require('cors')
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
require("dotenv").config({ path: "./config.env" });
const connectDb = require("./utilsServer/connectDb");
connectDb();
app.use(express.json());

app.use(cors())
const PORT = process.env.PORT || 3000;


const robotsOptions = {
  root: __dirname + '/public/static/',
  headers: {
    'Content-Type': 'text/plain;charset=UTF-8'
  }
}

const sitemapOptions = {
  root: __dirname + '/public/static/',
  headers: {
    'Content-Type': 'text/xml;charset=UTF-8'
  }
}

const faviconOptions = {
  root: __dirname + '/public/static/'
}




nextApp.prepare().then(() => {
  app.use("/api/signup", require("./api/signup"));
  app.use("/api/auth", require("./api/auth"));
  app.use('/api/search',require("./api/search"))
  app.use("/api/posts",require('./api/posts'))
  

  


  app.all("*", (req, res) => handle(req, res));

  server.listen(PORT, err => {
    if (err) throw err;
    console.log("Express server running ⚠️⚠️⚠️");
  });
});
