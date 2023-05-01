import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { ReBot } from './ReBot';

type CommandArguments = {
	client: ReBot;
	interaction: ChatInputCommandInteraction<'cached'>;
};

type CommandAction = (args: CommandArguments) => Promise<any>;

export class CommandBuilder extends SlashCommandBuilder {
	private action!: CommandAction;
	private onlyOwner: boolean = false;

	public setAction(fn: CommandAction) {
		this.action = fn;
		return this;
	}

	public isOnlyOwner(onlyOwner: boolean) {
		this.onlyOwner = onlyOwner;
		return this;
	}

	public execute(args: CommandArguments): Promise<any> {
		const { client, interaction } = args;

		if (this.onlyOwner && interaction.user.id !== client.application.owner!.id)
			throw new Error();

		return this.action(args);
	}
}
