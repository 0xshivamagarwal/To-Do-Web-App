import * as firebase from 'firebase/app'
import 'firebase/database'

const config = {
	apiKey: "AIzaSyBzsO2RfKUDowKFArlxDvC1qXp1HlEiq20",
	authDomain: "to-do-app-fc7f2.firebaseapp.com",
	databaseURL: "https://to-do-app-fc7f2.firebaseio.com",
	projectId: "to-do-app-fc7f2",
	storageBucket: "to-do-app-fc7f2.appspot.com",
	messagingSenderId: "1029881626720",
	appId: "1:1029881626720:web:133f3954890bf38e0d8305"
};

firebase.initializeApp(config);
export default firebase;

export function writeNewPost(name, timestamp, priority, description) {
	const postToDo = {
		name: name,
		timestamp: timestamp,
		priority: priority,
		description: description
	};

	const newToDoKey = firebase.database().ref().child('to-do').push().key;

	const updates = {};
	updates['/to-do/' + newToDoKey] = postToDo;

	return firebase.database().ref().update(updates);
}

export function updatePost(data) {
	const Key = data.id;
	delete data.id;
	delete data.busy;
	const update = {};
	update['/to-do/' + Key] = data;
	return firebase.database().ref().update(update);
}