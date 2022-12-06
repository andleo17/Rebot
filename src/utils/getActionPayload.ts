export function getActionPayload<T = any>(customId: string) {
	const customIdData = customId.split(':').slice(1).join(':');

	if (!customIdData) return null;

	const payload = JSON.parse(customIdData) as T;

	return payload;
}
