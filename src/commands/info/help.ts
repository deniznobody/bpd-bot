import { Command, CommandOptions } from '@sapphire/framework';
import { CommandInteraction, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, MessageComponentInteraction, ComponentType } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

export class HelpCommand extends Command {
    public constructor(context: Command.LoaderContext, options: CommandOptions) {
        super(context, {
            ...options
        });
    }

    public override registerApplicationCommands(registry: Command.Registry) {
        registry.registerChatInputCommand((builder) =>
          builder.setName('help').setDescription('Help command')
        );
      }

    public async chatInputRun(interaction: CommandInteraction) {
        const cmds = this.container.stores.get('commands');
        const categories = new Map<string, Command[]>();

        cmds.forEach(cmd => {
            const category: string = (cmd as any).category || 'Uncategorized';
            const list = categories.get(category) || [];
            list.push(cmd);
            categories.set(category, list);
        });

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('select-help')
            .setPlaceholder('Choose a category')
            .addOptions(
                Array.from(categories.keys()).map(category => ({
                    label: category,
                    description: `Commands from the ${category} category`,
                    value: category
                }))
            );

        const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(selectMenu);
        const emb = new EmbedBuilder()
            .setDescription("Choose a category from the list.");

        await interaction.reply({
            components: [row],
            embeds: [emb],
        });

        const filter = (i: MessageComponentInteraction) =>
            i.isStringSelectMenu() &&
            i.customId === 'select-help' &&
            i.user.id === interaction.user.id;

        const collector = interaction.channel?.createMessageComponentCollector({
            filter,
            componentType: ComponentType.StringSelect,
            time: 60000
        });

        collector?.on('collect', async (i: MessageComponentInteraction) => {
            if (!i.isStringSelectMenu()) return;

            const selectedCategory = i.values[0];
            const commands = categories.get(selectedCategory);
            if (commands) {
                const embed = new EmbedBuilder()
                    .setTimestamp()
                    .setTitle(`Help - ${selectedCategory}`)
                   // .setDescription(`<> - required argument\n[] - optional argument`)
                    .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })
                    .setColor(0x0099ff);

                    const description = commands.map(cmd => `\`>\` ${cmd.name}\n${cmd.description || 'No description'}`).join('\n\n');
                    embed.setDescription(description);


                await i.update({ embeds: [embed], components: [row] });
            }
        });

        collector?.on('end', () => {
            interaction.deleteReply();
        });
    }
}
