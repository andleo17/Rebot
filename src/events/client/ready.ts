import { EventBuilder } from '../../structures/Event';

export default new EventBuilder('ready')
	.isOnce(true)
	.setAction(async (client) => {
		console.log(`El bot ${client.user.username} está listo.`);
	});
