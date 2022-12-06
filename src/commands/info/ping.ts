import { CommandBuilder } from '../../structures/Command';

export default new CommandBuilder()
	.setName('ping')
	.setDescription('Probando bot')
	.setAction(async () => {
		return {
			content: 'Pi pi pi pinga',
		};
	});
