import { validate } from 'uuid';

const users = [{

}];

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

export { getAllUsers, validateUserId, getUserById }