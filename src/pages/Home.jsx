import { IonHeader, IonPage, IonTitle, IonToolbar, IonLoading } from '@ionic/react';
import React from 'react';
import './Home.css';
import ToDoContainer from '../components/ToDoContainer';
import CreateNewPopOverContainer from '../components/CreateNewPopOverContainer';
import firebase from '../components/Firebase'

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			busy: false,
			todoData: []
		}
	}

	componentDidMount() {
		this.setState({
			busy: true
		})
		const dbRefObject = firebase.database().ref().child('to-do');
		dbRefObject.on('value', snap => {
			let todoData = snap.val()
			let newState = []
			for (let todo in todoData) {
				newState.push({
					id: todo,
					name: todoData[todo].name,
					timestamp: todoData[todo].timestamp,
					priority: todoData[todo].priority,
					description: todoData[todo].description
				})
			}
			this.setState({
				todoData: newState,
				busy: false
			})
		})
	}

	render() {
		return (
			<IonPage>
				<IonHeader>
					<IonToolbar>
						<IonTitle >To-Do List</IonTitle>
					</IonToolbar>
				</IonHeader>
				<IonLoading isOpen={this.state.busy} message={'Please wait...'} duration={0} />
				<ToDoContainer todoData={this.state.todoData} />
				<CreateNewPopOverContainer />
			</IonPage>
		)
	}
}

export default Home;
