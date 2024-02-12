import http from 'node:http';
import * as httpService from './services/httpService.js';


const PORT = process.env.PORT || 8000;
const server = http.createServer();
server.on('request', async (request, response) => {
	const responseDetails = await httpService.handleRequest(request);
	httpService.sendResponse(responseDetails, response);
});

server.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));