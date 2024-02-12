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

const deleteUser = (userId) => {
	const user = users.find((u, i) => u.id === userId);
	users.splice(users.indexOf(user), 1);
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

const validateUserUpdate = (userData) => {
	const user = userData.user;
	if (!user) {
		return {
			isError: true,
			errorMessage: 'Invalid body format'
		}
	}

	const username = user.username;
	if (username && typeof username !== 'string') {
		return {
			isError: true,
			errorMessage: 'Please send correct username'
		}
	}

	const age = user.age;
	if (age && typeof age !== 'number') {
		return {
			isError: true,
			errorMessage: 'Please send correct age'
		}
	}

	const hobbies = user.hobbies;
	if (hobbies && !Array.isArray(hobbies)) {
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

const updateUser = (userId, userData) => {
	const {username, age, hobbies} = userData.user;
	const user = getUserById(userId);
	if (username) {
		user.username = username;
	}
	if (age) {
		user.age = age;
	}
	if (hobbies) {
		user.hobbies = hobbies;
	}

	return user;
}

export { getAllUsers, validateUserId, getUserById, validateUser, createUser, deleteUser, validateUserUpdate, updateUser }