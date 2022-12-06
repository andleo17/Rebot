import { Interaction } from 'discord.js';
import { ReBot } from './ReBot';

type ActionCallback = (
	interaction: Interaction<'cached'>,
	client: ReBot
) => Promise<any>;

export class ActionBuilder {
	public name: string;
	public run!: ActionCallback;

	public constructor(name: string) {
		this.name = name;
	}

	public setAction(action: ActionCallback) {
		this.run = action;
		return this;
	}
}
