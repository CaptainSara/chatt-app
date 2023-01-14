const fs = require("fs");
const path = require("path");

// Read .env file
let envPath = path.join(__dirname, "../.env");
let content = fs.readFileSync(envPath, "utf-8").split("\n").map(x => {
  x = x.split("=");
  x[1] = x.slice(1).join("=");
  x = x.map(x => x.trim())
  return x;
});

// Set env variables
for (let [key, val] of content) {
  process.env[key] = val;
}