import { Args, Command } from '@sapphire/framework';
import type { Message } from 'discord.js';

export class Kick extends Command {
  public constructor(context: Command.LoaderContext, options: Command.Options) {
    super(context, {
      ...options,
      name: 'kick',
      aliases: ['k'],
      description: 'Kicks a user if you have permission.'
    });
  }

public async messageRun(message: Message, args: Args) {
        if(message.member?.permissions.has('KickMembers')) {
            const target = message.mentions.members?.first();
            target?.kick();
            const reply = await message.channel.send({ content: `Kicked ${target?.user.tag}` });
            
            setTimeout(() => {
                reply.delete();
            }, 5000);
        } else {
            const reply = await message.channel.send({ content: `You don't have the permission to use this command.` })

            setTimeout(() => {
                reply.delete();
            }, 5000);
        }
    }
}