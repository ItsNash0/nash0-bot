const Discord = require("discord.js")
const client = new Discord.Client()
const ytdl = require("ytdl-core-discord")
require("dotenv").config()

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`)
})

client.login(process.env.TOKEN)

// guild.fetchAuditLogs().then((audit) => msg.reply(audit.entries.first()))

client.on("message", async (msg) => {
	if (msg.content === "kapasao") {
		var audit = (await msg.guild.fetchAuditLogs()).entries.first()

		var changes = audit.changes || "null"

		msg.channel.send(
			`${audit.action} by ${audit.executor} to ${
				audit.target?.username || "🤷🏻‍♂️"
			} did ${changes[0].key || "🤷🏻‍♂️"}`
		)
	}
})

client.on("message", (msg) => {
	if (msg.content === "ping") {
		msg.reply("pong")
	}
	switch (msg.content.toLowerCase()) {
		case "vargas":
			msg.reply(
				"no sabe conducir automatico y no se cansa de pedirle a mi amo el puto mercedes."
			)
			break
		case "nacho":
			msg.reply(
				"es un crack, maquina, fiera, jefe, tifón, numero 1, figura, mostro, mastodonte, toro, furia, ciclón, tornado, artista, fenómeno, campeón, maestro, torero"
			)
			break
		case "sanchez":
			msg.reply("no quiere llevar a rubi a su puta casa")
			break
		case "carrasco":
			msg.reply(
				"Python is a programming language that lets you work more quickly and integrate your systems more effectively."
			)
			break

		default:
			break
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
