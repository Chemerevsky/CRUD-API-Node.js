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

const getRequestBody = (request) => {
	return new Promise((resolve, reject) => {
		let body = [];

		request.on('data', chunk => {
			body.push(chunk);
		});

		request.on('end', () => {
			try {
				body = Buffer.concat(body).toString();
				body = body ? JSON.parse(body) : {};
				resolve(body);
			} catch (error) {
				reject(error);
			}
		});
	});
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

const handlePostRequest = async (request) => {
	try {
		if (request.url === '/api/users') {
			const body = await getRequestBody(request);
			const validationResult = userService.validateUser(body);
			if (!validationResult.isError) {
				const newUser = userService.createUser(body);
				return prepareResponseData(201, {}, JSON.stringify(newUser));
			}

			return prepareResponseData(400, {}, validationResult.errorMessage);
		}
		return sendNotFoundError(INVALID_REQUEST_ERROR_TEXT);
	} catch (error) {
		console.log(error);
		return sendNotFoundError('Something went wrong. Please check request and it body');
	}
}

const handleDeleteRequest = (url) => {
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

		userService.deleteUser(userId);

		return prepareResponseData(204 , {}, 'User was deleted');
	}

	return sendNotFoundError(INVALID_REQUEST_ERROR_TEXT);
}

const handleRequest = async (request) => {
	const {method, url} = request;

	switch (method) {
		case 'GET':
			return handleGetRequest(url);
		case 'POST':
			return handlePostRequest(request);
		case 'DELETE':
			return handleDeleteRequest(url);
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