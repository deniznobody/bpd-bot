import { Listener } from '@sapphire/framework';
import { ActivityType, type Client } from 'discord.js';
import connectToDB from '../models/db';

export class ReadyListener extends Listener {
  public run(client: Client) {
    if(!process.env.guildtoken) this.container.logger.warn(`Guild Webhook not found, please add one to the .env file.`)
    connectToDB()
    const { username, id } = client.user!;
    this.container.logger.info(`Successfully logged in as ${username} (${id})`);
    client.user?.setPresence({
        activities: [{
            name: `:(`, 
            type: ActivityType.Streaming,
            url: 'https://twitch.tv/elraenn'
        }],
        status: 'dnd'
    })
  }
}
