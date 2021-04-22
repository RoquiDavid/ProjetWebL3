const app = require("./app.js");
const port = 4001;
app.default.listen(port, () => {
  console.log(`Serveur actif sur le port ${port}`);
});

