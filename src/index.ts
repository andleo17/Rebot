import { ReBot } from './structures/ReBot';

async function bootstrap() {
	const rebot = new ReBot({
		intents: 3276799,
	});

	await rebot.start();
}

bootstrap();
