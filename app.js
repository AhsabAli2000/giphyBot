// importing the required libraries and config

const discord = require("discord.js");
const fetch = require("node-fetch");
require("dotenv").config();
const {
  prefix,
  base_url,
  limit,
  offset,
  rating,
  lang,
} = require("./config.json");
const bot_token = process.env.bot_token;
const giphy_token = process.env.giphy_token;

// making an instance of the discord client

const app = new discord.Client();

// defining some variables

let req_url;

// making some functions

function numGen(fnum = 0, snum) {
  let ranNum = fnum + Math.round(Math.random() * snum - fnum);
  return ranNum;
}

// logging a message to confirm if the bot has started

app.once("ready", () => {
  console.log("\nThe bot started");
});

// An example search url https://api.giphy.com/v1/gifs/search?api_key=token&q=hello&limit=5&offset=0&rating=g&lang=en

app.on("message", (message) => {
  // dont tell anyone

  console.log(`\n${message.content}`);

  if (message.content.startsWith(`${prefix} gif`)) {
    // getting the search query from message

    let search_query = message.content.replace(RegExp(`${prefix} gif`), "");

    // the url it will generate to get gifs, probably should make it into a function, hmmmmmm

    req_url = `${base_url}gifs/search?api_key=${giphy_token}&q=${search_query}&limit=${limit}&offset=${offset}&rating=${rating}&lang=${lang}`;

    // making http(s) request to get the url for gif

    fetch(req_url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // getting the url for the gif and sending it

        let gif_url =
          data.data[numGen(0, data.data.length)].images.downsized.url;

        message.channel.send(gif_url);
      })
      .catch((err) => {
        // logging the error and giving an error to the user
        console.error(err);
        message.channel.send(
          `\`\`\`javascript\nconsole.log("error dum dum")\n\`\`\``
        );
      });
  } else {
  }
});

// Logging into discord with the token

app.login(bot_token);

// Made by AhsabAli2000
