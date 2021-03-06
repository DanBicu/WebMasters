const http = require('http');
const config = require('./config');
const loaders = require('./loaders/index');
const Logger = require('./loaders/logger');
const router = require('./Router');

async function startServer() {
	await loaders();

	http.createServer(router.handle).listen(config.port, (err) => {
		if (err) {
			Logger.error(err);
			process.exit(1);
			return;
		}
		Logger.info(`🛡️  Server listening on port: ${config.port} 🛡️`);
	});
}

startServer();
