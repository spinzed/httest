const express = require("express");
const cors = require("cors");
const db = require("./models");
const { Package } = require("./models");
const DummyData = require("./utils/dummyData");
const router = require("./routes/api.v1");
const path = require("path");
const ejs = require("ejs");

const server = express();

// allow api requests from all sites
server.use(cors({ origin: "*" }));

server.engine("html", ejs.renderFile);
server.set('views', path.join(__dirname, "public"));
server.use(express.static(path.join(__dirname, "public")));

server.use("/api/v1", router);

server.get("/", (req, resp) => {
  resp.render("public/index.html");
})

db.sequelize.sync().then(async req => {
  // fill the db with dummy data
  const package = await Package.findAll().catch(() => {
    console.info("Could not query db to add dummy data");
  });
  if (!package || package.length == 0) {
    Package.bulkCreate(DummyData);
  }
  server.listen(3000, () => {
      console.log(`Server started in ${process.env.NODE_ENV || "development"} mode on port 3000`);
  });
}).catch(() => console.error("Could not synchronise models with the database"));
