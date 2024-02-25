require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
const Crypto = require("./Model/Crypto");
const Crypto_data = require("./Routes/routes");

const uri = process.env.MONGO_URL;

mongoose
  .connect(uri)
  .then(console.log("Connected to DB"))
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/frontend'));


// Fetch data from WazirX API and store in the database
async function fetchDataAndStore() {
    try {
        const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
        const tickers = response.data;

        const top10Tickers = Object.values(tickers).slice(0, 10);

        await Promise.all(top10Tickers.map(async ticker => {
            const { name, last, buy, sell, volume, base_unit } = ticker;
            await Crypto.findOneAndUpdate({ name }, { name, last, buy, sell, volume, base_unit }, { upsert: true });
        }));

        console.log('Data stored successfully');
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

setInterval(fetchDataAndStore, 60000);  // Fetch data every 1 minute

// routes

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/frontend/index.html");
  });

app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/frontend/about.html");
});

app.get("/crypto_data", Crypto_data.get_crypto_data);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
