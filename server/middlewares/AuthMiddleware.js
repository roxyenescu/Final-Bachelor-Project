const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) return res.json({ error: "User not logged in!" });

  try {
    const validToken = verify(accessToken, "importantsecret");
    req.user = validToken;
    if (validToken) {

      // Verificăm timpul de expirare
      const currentTimestamp = Date.now() / 1000; // Obținem timestamp-ul curent în secunde
      if (validToken.exp < currentTimestamp) {
        return res.json({ error: "Token has expired!" });
      }

      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { validateToken };