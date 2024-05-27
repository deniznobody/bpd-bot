import { Args, Command } from '@sapphire/framework';
import type { Message } from 'discord.js';


export class BotClear extends Command {
  public constructor(context: Command.LoaderContext, options: Command.Options) {
    super(context, {
      ...options,
      name: 'bc',
      aliases: ['bc'],
      description: 'Clears the messages that was sent by bots.'
    });
  }

public async messageRun(message: Message, args: Args) {
      if(message.member?.permissions.has("ManageMessages")) {
        const messages = await message.channel.messages.fetch({ limit: 100 });
        messages.forEach(msg => {
            if (msg.author.id == "1183493348007366736") msg.delete();
         })
    
           const reply =  await message.channel.send({ content: `Deleted ${messages.size} messages by bots.` })
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