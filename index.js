const Discord = require("discord.js")
const client = new Discord.Client()
const ytdl = require("ytdl-core-discord")

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`)
})

client.login(process.env.TOKEN)

client.on("message", (msg) => {
	if (msg.content === "ping") {
		msg.reply("pong")
	}
})

client.on("message", async (message) => {
	// Voice only works in guilds, if the message does not come from a guild,
	// we ignore it
	if (!message.guild) return

	if (message.content === "teta") {
		// Only try to join the sender's voice channel if they are in one themselves
		if (message.member.voice.channel) {
			const connection = await message.member.voice.channel.join()

			connection.play(
				await ytdl("https://www.youtube.com/watch?v=dQw4w9WgXcQ"),
				{ type: "opus" }
			)
		} else {
			message.reply("You need to join a voice channel first!")
		}
	}
})
