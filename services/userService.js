import { validate, v4 as createUuid } from 'uuid';

const users = [];

const validateUserId = (userId) => {
	return validate(userId);
}

const getAllUsers = () => {
	return users;
}

const getUserById = (userId) => {
	const user = users.find(u => u.id === userId);
	return user;
}

const validateUser = (userData) => {
	const user = userData.user;
	if (!user) {
		return {
			isError: true,
			errorMessage: 'Invalid body format'
		}
	}

	const username = user.username;
	if (!username || typeof username !== 'string') {
		return {
			isError: true,
			errorMessage: 'Please send correct username'
		}
	}

	const age = user.age;
	if (!age || typeof age !== 'number') {
		return {
			isError: true,
			errorMessage: 'Please send correct age'
		}
	}

	const hobbies = user.hobbies;
	if (!hobbies || !Array.isArray(hobbies)) {
		return {
			isError: true,
			errorMessage: 'Please send correct hobbies'
		}
	}

	return {
		isError: false
	};
}

const createUser = (userData) => {
	const {username, age, hobbies} = userData.user;
	const newUser = {
		id: createUuid(),
		username: username,
		age: age,
		hobbies: hobbies
	};
	users.push(newUser);

	return newUser;
}

export { getAllUsers, validateUserId, getUserById, validateUser, createUser }