export const HOST = import.meta.env.VITE_HOST;
export const PORT = import.meta.env.VITE_PORT;

const SERVER_URL = `http://${HOST}:${PORT}`;
const WS_URL = `ws://${HOST}:${PORT}`;

export const config = {
	SERVER_URL,
	WS_URL,
};
