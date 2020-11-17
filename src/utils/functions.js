async function verify(
  channel,
  user,
  { time = 30000, extraYes = [], extraNo = [] } = {}
) {
  const filter = (res) => {
    const value = res.content.toLowerCase();
    return (
      (user ? res.author.id === user.id : true) &&
      (yes.includes(value) ||
        no.includes(value) ||
        extraYes.includes(value) ||
        extraNo.includes(value))
    );
  };
  const verify = await channel.awaitMessages(filter, {
    max: 1,
    time,
  });
  if (!verify.size) return 0;
  const choice = verify.first().content.toLowerCase();
  if (yes.includes(choice) || extraYes.includes(choice)) return true;
  if (no.includes(choice) || extraNo.includes(choice)) return false;
  return false;
}
function list(arr, conj = "and") {
  const len = arr.length;
  if (len === 0) return "";
  if (len === 1) return arr[0];
  return `${arr.slice(0, -1).join(", ")}${
    len > 1 ? `${len > 2 ? "," : ""} ${conj} ` : ""
  }${arr.slice(-1)}`;
}
async function promptMessage(message, author, time, validReactions) {
  time *= 1000;

  for (const reaction of validReactions) await message.react(reaction);

  const filter = (reaction, user) =>
    validReactions.includes(reaction.emoji.name) && user.id === author.id;

  return message
    .awaitReactions(filter, { max: 1, time: time })
    .then((collected) => collected.first() && collected.first().emoji.name);
}
module.exports = {
  verify,
  list,
  promptMessage,
};
