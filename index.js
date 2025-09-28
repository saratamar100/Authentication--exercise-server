const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

const apiRouter = require("./routes/api");
app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
