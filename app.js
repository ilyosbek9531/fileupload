const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");

const app = express();

app.use(fileUpload());
app.use("/uploads", express.static("uploads")); // Serve the static files from the "uploads" directory
app.use(bodyParser.json());

app.post("/upload", function (req, res) {
  if (!req.files || !req.files.image) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  const file = req.files.image;

  file.mv("uploads/" + file.name, function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "File upload failed." });
    }

    const imageUrl =
      req.protocol + "://" + req.get("host") + "/uploads/" + file.name;
    res.status(200).json({ message: "File uploaded successfully.", imageUrl });
  });
});

app.get("/", (req, res) => {
  res.status(200).json([
    { id: 1, name: "ilyosbek" },
    { id: 2, name: "alisher" },
  ]);
});

app.listen(3000, () => console.log("Server is running on port 3000"));
