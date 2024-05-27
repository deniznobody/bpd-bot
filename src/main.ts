import { ApplicationCommandRegistries, LogLevel, SapphireClient } from "@sapphire/framework";
import '@sapphire/plugin-logger/register';
import 'dotenv/config'
import { Partials } from 'discord.js';
const token = process.env.TOKEN;

ApplicationCommandRegistries.setDefaultGuildIds(['1242543443205685320']);

const client = new SapphireClient({
    intents: ['Guilds', 'GuildMessages', 'MessageContent'],
    partials: [Partials.Message, Partials.Reaction, Partials.Channel],
    logger: {
        level: LogLevel.Debug
    },
    
});


client.login(token)