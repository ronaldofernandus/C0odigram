require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const { upload } = require("./middlewares/multer");

const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require("./routes");
app.use(routes);

app.post("/single", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.send(`upload success`);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
