export const videoSources = [
	{
		id: 1,
		name: "from Codisia",
		url: "rtsp://admin:admin123@106.51.152.115:1025",
		type: "ANPR",
		recorderInfo: 2,
		detectorId: 1,
		location: "HOPES SIGNAL",
		latitude: "11.02834",
		longitude: "77.0218",
		recorder: 1,
		images: true,
		video: false,
	},
];

export const detector = [
	{
		id: 1,
		name: "detector",
		url: "172.17.0.1:3002",
	},
];

export const recorder = [
	{
		id: 1,
		name: "recorder",
		url: "http://0.0.0.0:3003",
	},
];

export const user = [{ username: "user", password: "Password@123" }];

export const tagTypes = [
	{ name: "VIP" },
	{ name: "Stolen" },
	{ name: "Government Vehicle" },
	{ name: "Involved In Crime" },
];

