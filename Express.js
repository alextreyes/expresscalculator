const express = require("express");
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Route for calculating mean
app.get("/mean", (req, res) => {
  const nums = req.query.nums;
  if (!nums) {
    return res.status(400).json({ error: "nums are required." });
  }

  const numbers = nums.split(",").map(Number);
  if (numbers.some(isNaN)) {
    return res.status(400).json({ error: "Invalid number detected." });
  }

  const mean = numbers.reduce((acc, val) => acc + val, 0) / numbers.length;

  res.json({ operation: "mean", value: mean });
});

// Route for calculating median
app.get("/median", (req, res) => {
  const nums = req.query.nums;
  if (!nums) {
    return res.status(400).json({ error: "nums are required." });
  }

  const numbers = nums.split(",").map(Number);
  if (numbers.some(isNaN)) {
    return res.status(400).json({ error: "Invalid number detected." });
  }

  numbers.sort((a, b) => a - b);
  const length = numbers.length;
  const median =
    length % 2 === 0
      ? (numbers[length / 2 - 1] + numbers[length / 2]) / 2
      : numbers[Math.floor(length / 2)];

  res.json({ operation: "median", value: median });
});

// Route for calculating mode
app.get("/mode", (req, res) => {
  const nums = req.query.nums;
  if (!nums) {
    return res.status(400).json({ error: "nums are required." });
  }

  const numbers = nums.split(",").map(Number);
  if (numbers.some(isNaN)) {
    return res.status(400).json({ error: "Invalid number detected." });
  }

  const numCount = {};
  numbers.forEach((num) => {
    numCount[num] = (numCount[num] || 0) + 1;
  });

  let mode;
  let maxCount = 0;
  for (const num in numCount) {
    if (numCount[num] > maxCount) {
      mode = parseInt(num);
      maxCount = numCount[num];
    }
  }

  res.json({ operation: "mode", value: mode });
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = server;
