const fs = require("fs");

// Ensure required folders exist
["uploads/input", "uploads/output"].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const compressRoute = require("./routes/compress");

const app = express();
app.use(express.static("public"));
app.use(fileUpload());
app.use(express.json());

app.use("/compress", compressRoute);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(` Server running at http://localhost:${PORT}`));