const express = require("express");
const { Op } = require("sequelize");
const { Package } = require("../models");
const { reducePackageFields } = require("../utils/pickFields");

const router = express.Router();

router.get("/get/recent", async (req, res) => {
  const package = await Package.findAll({
    where: {
      initiatedAt: {
        [Op.gt]: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // in the last 30 days
      }
    }}).catch(() => {
    res.status(400).send("Greska!");
  });
  if (!package) return;
  res.send(package.map(p => reducePackageFields(p)));
});

router.get("/get/byDate", async (req, res) => {
  const package = await Package.findAll({
    where: {
      initiatedAt: {
        [Op.between]: [new Date(req.query.start), new Date(req.query.end)]
      }
    }}).catch(() => {
    res.status(400).send("Greska!");
  });
  if (!package) return;
  res.send(package.map(v => reducePackageFields(v)));
});

router.get("/get", async (req, res) => {
  const id = Number.parseInt(req.query.id);
  if (isNaN(id)) {
    res.status(400).send("Greska!");
    return;
  }
  const package = await Package.findAll({
    where: {
      id: {
        [Op.eq]: id,
      }
    }}).catch(() => {
    res.status(400).send("Greska!");
  });
  if (!package) return;
  res.send(package[0]);
});

router.post("/add", async (req, res) => {
  Package.create(req.query)
    .then(() => {
      Package.findOne({
        order: [[ 'createdAt', 'DESC' ]],
      }).then((v) => {
        res.send(v)
      });
    })
    .catch(() => {
      res.status(400).send("Greska!");
    });
  }
);

router.post("/update", async (req, res) => {
  const id = Number.parseInt(req.query.id);
  if (isNaN(id)) {
    res.status(400).send("Greska!");
    return;
  }
  await Package.update(req.query, {
    where: {
      id: {
        [Op.eq]: id,
      }
    }}).catch(() => {
    res.status(400).send("Greska!");
  });
  res.sendStatus(200)
});

router.post("/delete", async (req, res) => {
  const id = Number.parseInt(req.query.id);
  if (isNaN(id)) {
    res.status(400).send("Greska!");
    return;
  }
  await Package.destroy({
    where: {
      id: {
        [Op.eq]: id,
      }
    }}).catch(() => {
    res.status(400).send("Greska!");
  });
  res.sendStatus(200)
});

module.exports = router;