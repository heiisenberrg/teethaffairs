import {
	GET_ADD_MEMBER,
	SET_ADD_MEMBER,
	GET_USER_LIST,
	SET_USER_LIST,
	SET_USER_NOTE,
	GET_USER_NOTE,
	GET_DEACTIVATE_USER_ID,
	SET_DEACTIVATE_USER_ID
} from '../constants/journal';

function getAddMember(userInputData, onFailure, onSuccess) {
	return {
		type: GET_ADD_MEMBER,
		payload: userInputData,
		onFailure,
		onSuccess
	};
}

function setAddMember(AddMembersResponse) {
	return {
		type: SET_ADD_MEMBER,
		payload: AddMembersResponse
	};
}

function getUserList(onFailure) {
	return {
		type: GET_USER_LIST,
		onFailure
	};
}

function setUserList(userList) {
	return {
		type: SET_USER_LIST,
		payload: userList
	};
}

function setUserNote(userNote) {
	return {
		type: SET_USER_NOTE,
		payload: userNote
	};
}

function getUserNote(userQueries, onFailure) {
	return {
		type: GET_USER_NOTE,
		payload: userQueries,
		onFailure
	};
}

function getDeactivateUserId(userDeactivateId, onFailure) {
	return {
		type: GET_DEACTIVATE_USER_ID,
		payload: userDeactivateId,
		onFailure
	};
}

function setDeactivateUserId(DeactivatedUser) {
	return {
		type: SET_DEACTIVATE_USER_ID,
		payload: DeactivatedUser
	};
}
export {
	getAddMember,
	setAddMember,
	getUserList,
	setUserList,
	setUserNote,
	getUserNote,
	setDeactivateUserId,
	getDeactivateUserId
};
