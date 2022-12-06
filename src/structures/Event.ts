import { ClientEvents } from 'discord.js';
import { ReBot } from './ReBot';

type EventAction<T extends keyof ClientEvents> = (
	client: ReBot,
	...args: ClientEvents[T]
) => any;

export class EventBuilder<T extends keyof ClientEvents> {
	public name: T;
	public run!: EventAction<T>;
	public once: boolean = false;

	public constructor(name: T) {
		this.name = name;
	}

	public setAction(action: EventAction<T>) {
		this.run = action;
		return this;
	}

	public isOnce(once: boolean) {
		this.once = once;
		return this;
	}
}
