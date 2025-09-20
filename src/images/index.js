// src/images/index.js

// 🔹 Map of image number -> Instagram handle
const handlesMap = {
  8695: "Kamerin",
  8696: "Jala",
  8697: "Sydney",
  8698: "Grace",
  8943: "ED",
  8944: "WAIN",
  8945: "Jordan",
  8946: "Sage",
  8947: "Jay",
  8948: "Gabriella",
  8949: "Julia",
  8950: "Xavier",
  8951: "Caleb",
  8952: "Amirah",
  8953: "Nahija",
  8954: "Trebeyon",
  8956: "James",
  8957: "Jadon",
  8958: "Jaden",
  8959: "Myles",
  8960: "Donovan",
  8961: "Mari",
};

// Auto-import all images from the folder
const ctx = require.context("./", false, /^\.\/Streamer_\d+\.(jpe?g|JPG)$/);

// Create a sorted array of streamers with their images and handles
const streamers = ctx
  .keys()
  .map((key) => {
    const id = Number((key.match(/Streamer_(\d+)/) || [])[1]);
    return {
      id,
      src: ctx(key),
      handle: handlesMap[id] || "@comingsoon", // default if missing
    };
  })
  .sort((a, b) => a.id - b.id);

export default streamers;
