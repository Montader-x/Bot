const fs = require("fs");

const createNewChunk = () => {
  const pathToFile = `./src/assets/soundclips/${Date.now()}.pcm`;
  return fs.createWriteStream(pathToFile);
};
module.exports = {
  name: "start-record",
  category: "recording",
  description: "Start recording in a voice channel",
  run: async (client, message, args) => {
    const voicechannel = message.member.voice.channel;
    if (!voicechannel)
      return message.channel.send("Please join a voice channel first!");

    try {
      voicechannel.join().then((connection) => {
        const receiver = connection.receiver;
        connection.on("speaking", (user, speaking) => {
          if (speaking) {
            const audioStream = receiver.createStream(user, { mode: "pcm" });
            audioStream.on("data", (chunk) => {});
            audioStream.pipe(createNewChunk());
            audioStream.on("end", () => {});
          }
        });
      });
    } catch (err) {
      message.channel.send("An error has ocured");
    }
  },
};
