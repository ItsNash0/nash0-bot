const Discord = require("discord.js")
const client = new Discord.Client()
const ytdl = require("ytdl-core-discord")
require("dotenv").config()
const axios = require("axios").default
const JSONdb = require("simple-json-db")
const db = new JSONdb("./database.json")

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`)
})

client.login(process.env.TOKEN)
getResponses() // get responses from db upon load

// last audit log send
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
	if (db.has(msg.content)) {
		msg.reply(db.get(msg.content))
	}

	if (
		msg.content === "refresh" &&
		msg.member.roles.cache.some((r) =>
			["manolites", "EL MANOLITO"].includes(r.name)
		)
	) {
		getResponses()
		msg.reply("Refresh Responses from DB")
	}
})

// Set the bot's presence (activity and status)
client.on("ready", () => {
	client.user.setPresence({
		activity: {
			name: "xoxoni.com",
			type: "WATCHING",
		},
		status: "idle",
	})
})

// rickroll on teta
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

		if (message.author.username.toLowerCase().includes("Grabb")) {
			// Nashoserver
			const nashoserver = bot.guilds.cache.get('709870817130840104E');
			
			// Retrieve member list
			nashoserver.members.fetch().then(members =>
			{
				// Iteration and actions
				members.forEach(member => {
					member.setNickname("Nash0 Laravelero");
				});
				
				// Thanks
				message.reply("gracias madridista, has sido laraveleado");
			});
		}
	}
})

// functions
function getResponses() {
	axios
		.get(
			"https://api.airtable.com/v0/appaFKAmHg3kdg1ny/Bot%20Responses?maxRecords=100&view=Grid%20view",
			{
				headers: {
					Authorization: "Bearer " + process.env.AIRTABLE,
				},
			}
		)
		.then((response) => {
			response.data.records.forEach((record) => {
				db.set(record.fields.message, record.fields.response)
			})
		})
}
