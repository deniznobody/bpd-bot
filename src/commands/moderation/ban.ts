import { Args, Command } from '@sapphire/framework';
import type { Message } from 'discord.js';


export class Ban extends Command {
  public constructor(context: Command.LoaderContext, options: Command.Options) {
    super(context, {
      ...options,
      name: 'ban',
      aliases: ['ban'],
      description: 'Clears the messages that was sent by bots.'
    });
  }

public async messageRun(message: Message, args: Args) {
           const uid = await args.pick('member')
           //const member = message.guild?.members.cache.get(uid)
           console.log(uid)
           uid?.ban()
           const reply =  await message.channel.send({ content: `Banned` })
           setTimeout(() => {
               reply.delete();
           }, 5000);
        }
}