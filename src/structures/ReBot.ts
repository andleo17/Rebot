import { Client, ClientEvents, Collection } from 'discord.js';
import type { ClientOptions } from 'discord.js';
import * as fs from 'fs/promises';
import * as path from 'path';
import { EventBuilder } from './Event';
import { CommandBuilder } from './Command';
import { ActionBuilder } from './Action';

export class ReBot extends Client<true> {
	public commands: Collection<string, CommandBuilder>;
	public customActions: Collection<string, ActionBuilder>;

	public constructor(options: ClientOptions) {
		super(options);
		this.commands = new Collection();
		this.customActions = new Collection();
	}

	public async start() {
		await this.login();
		await this.readEvents();
		await this.readCommands();
		await this.readActions();
		await this.publishCommands();
	}

	private async readEvents(): Promise<void> {
		const categories = await fs.readdir(path.join(__dirname, '..', 'events'));
		for (const category of categories) {
			const events = await fs.readdir(
				path.join(__dirname, '..', 'events', category)
			);
			for (const eventFile of events) {
				const aux = await import(
					path.join(__dirname, '..', 'events', category, eventFile)
				);
				const event: EventBuilder<keyof ClientEvents> = aux.default;
				this[event.once ? 'once' : 'on'](
					event.name,
					(...args) => void event.run(this, ...args)
				);
			}
		}
	}

	private async readCommands(): Promise<void> {
		const categories = await fs.readdir(path.join(__dirname, '..', 'commands'));
		for (const category of categories) {
			const events = await fs.readdir(
				path.join(__dirname, '..', 'commands', category)
			);
			for (const commandFile of events) {
				const aux = await import(
					path.join(__dirname, '..', 'commands', category, commandFile)
				);
				const command: CommandBuilder = aux.default;
				this.commands.set(command.name, command);
			}
		}
	}

	private async readActions(): Promise<void> {
		const categories = await fs.readdir(path.join(__dirname, '..', 'actions'));
		for (const category of categories) {
			const events = await fs.readdir(
				path.join(__dirname, '..', 'actions', category)
			);
			for (const actionFile of events) {
				const aux = await import(
					path.join(__dirname, '..', 'actions', category, actionFile)
				);
				const action: ActionBuilder = aux.default;
				this.customActions.set(action.name, action);
			}
		}
	}

	private async publishCommands(): Promise<void> {
		const commands = this.commands.map((c) => c.toJSON());
		if (process.env.NODE_ENV === 'production')
			await this.application.commands.set(commands);
		else
			await this.application.commands.set(commands, process.env.GUILD_TEST_ID!);
	}
}
