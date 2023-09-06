const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');
const { validateToken } = require('../middlewares/AuthMiddleware')
const { sign } = require('jsonwebtoken');

const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');


router.post("/", async (req, res) => {
  const { nume, prenume, email, parola } = req.body;

  const user = await Users.findOne({ where: { email: email } });

  if (user) {
    res.json({ error: "Emailul există deja!" });
  } else {
    bcrypt.hash(parola, 10).then((hash) => {
      Users.create({
        nume: nume,
        prenume: prenume,
        email: email,
        parola: hash,
      });
      res.json("SUCCES");
    });
  }


});


router.post("/login", async (req, res) => {
  const { email, parola } = req.body;

  const user = await Users.findOne({ where: { email: email } });

  if (!user) {
    res.json({ error: "Utilizatorul nu exista!" });

  } else {
    bcrypt.compare(parola, user.parola).then((match) => {
      if (!match) {
        res.json({ error: "Combinatie gresita de email si parola!" });

      } else {
        const accessToken = sign(
          { email: user.email, id: user.id },
          "importantsecret",
          { expiresIn: "30d" }
        );
        res.json({ token: accessToken, email: email, id: user.id });
      }
    });
  }
});

router.get('/profile', validateToken, async (req, res) => {
  try {
    const user = await Users.findOne({ where: { email: req.user.email } });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'Utilizatorul nu există!' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'A apărut o eroare' });
  }
});


router.get('/auth', validateToken, (req, res) => {
  res.json(req.user);
});

router.put('/changepassword', validateToken, async (req, res) => {
  const { oldPsw, newPsw } = req.body;

  const user = await Users.findOne({ where: { email: req.user.email } });

  bcrypt.compare(oldPsw, user.parola).then(async (match) => {
    if (!match) res.json({ error: "Parola veche introdusă este greșită!" });

    bcrypt.hash(newPsw, 10).then((hash) => {
      Users.update(
        { parola: hash },
        { where: { email: req.user.email } }
      );
      res.json("SUCCES");
    });


  });
});




module.exports = router;