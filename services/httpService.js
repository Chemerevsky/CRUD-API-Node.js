import * as userService from './userService.js'

const INVALID_REQUEST_ERROR_TEXT = 'Invalid request';
const prepareResponseData = (statusCode, headers, data = '') => {
	return {
		statusCode: statusCode,
		headers: headers,
		data: data
	};
}

const sendNotFoundError = (data) => {
	return prepareResponseData(404, {}, data);
}

const handleGetRequest = (url) => {
	if (url === '/api/users') {
		const data = userService.getAllUsers();
		const headers = {
			'Content-Type': 'application/json'
		};

		return prepareResponseData(200, headers, JSON.stringify(data));
	}

	const standardPath = '/api/users/';
	if (url.startsWith(standardPath)) {
		const userId = url.replace(standardPath, '');
		const isValidId = userService.validateUserId(userId);
		if (!isValidId) {
			return prepareResponseData(400 , {}, 'Invalid user Id');
		}

		const user = userService.getUserById(userId);
		if (!user) {
			return sendNotFoundError(`User with id=${userId} does not exist`);
		}

		return prepareResponseData(200 , {}, JSON.stringify(user));
	}

	return sendNotFoundError(INVALID_REQUEST_ERROR_TEXT);
}

const handleRequest = async (request) => {
	const {method, url} = request;

	switch (method) {
		case 'GET':
			return handleGetRequest(url);
		default:
			return sendNotFoundError(INVALID_REQUEST_ERROR_TEXT);
	}
}

const sendResponse = (responseDetails, response) => {
	console.log(`statusCode ${responseDetails.statusCode}; headers ${responseDetails.headers}; data ${responseDetails.data}`);
	response.writeHead(responseDetails.statusCode, responseDetails.headers);
	if (responseDetails.data) {
		response.write(responseDetails.data);
	}

	response.end();
}

export { handleRequest, sendResponse }