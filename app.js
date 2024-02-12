import http from 'node:http';
import * as httpService from './services/httpService.js';

const PORT = process.env.PORT || 8000;
const server = http.createServer();
server.on('request', async (request, response) => {
	try {
		const responseDetails = await httpService.handleRequest(request);
		httpService.sendResponse(responseDetails, response);
	} catch {
		const serverErrorDetails = {
			statusCode: 500,
			headers: {},
			data: 'Unexpected server error.'
		};
		httpService.sendResponse(serverErrorDetails, response);
	}
});

server.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));