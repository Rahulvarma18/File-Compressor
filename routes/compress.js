const express = require("express");
const path = require("path");
const huffman = require("../huffman/huffman");
const fs = require("fs");
const router = express.Router();

router.post("/", async (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  const inputFile = req.files.file;
  const inputPath = path.join(__dirname, "../uploads/input", inputFile.name);
  const outputPath = path.join(__dirname, "../uploads/output", inputFile.name + ".huff");

  await inputFile.mv(inputPath);
  const result = huffman.compressFile(inputPath, outputPath);

  res.json({
    originalSize: result.originalSize,
    compressedSize: result.compressedSize,
    ratio: ((1 - result.compressedSize / result.originalSize) * 100).toFixed(2),
    downloadLink: `/uploads/output/${inputFile.name}.huff`
  });
});

module.exports = router;