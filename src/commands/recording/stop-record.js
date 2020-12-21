const fs = require("fs");
module.exports = {
  name: "stop-record",
  category: "recording",
  description: "stop recording in a voice channel",
  run: async (client, message, args) => {
    const chunks = fs.readdirSync("./src/assets/soundclips");
    let inputStream;
    let currentfile;
    const outputStream = fs.createWriteStream(
      "./src/assets/soundclips/merge.pcm"
    );

    chunks.sort((a, b) => {
      return a - b;
    });

    function appendFiles() {
      if (!chunks.length) {
        outputStream.end(() => console.log("Finished."));
        return;
      }

      currentfile = "./src/assets/soundclips/" + chunks.shift();
      inputStream = fs.createReadStream(currentfile);

      inputStream.pipe(outputStream, { end: false });

      inputStream.on("end", function () {
        console.log(currentfile + " appended");
        appendFiles();
      });
    }

    appendFiles();
  },
};
