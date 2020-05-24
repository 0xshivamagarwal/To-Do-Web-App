import React from 'react';
import './ToDoContainer.css';
import { IonLabel, IonContent, IonItem, IonItemSliding, IonItemOption, IonItemOptions, IonItemGroup, IonNote, IonIcon, IonPopover, IonHeader, IonToolbar, IonTitle, IonFooter, IonButton, IonButtons, IonList, IonInput, IonTextarea, IonSelectOption, IonSelect, IonDatetime } from '@ionic/react';
import { trashOutline } from 'ionicons/icons'
import firebase from '../components/Firebase'
import { Toast } from './Toast';
import { updatePost } from './Firebase'

class ToDoContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			busy: false,
			id: '',
			name: '',
			timestamp: '',
			priority: '',
			description: ''
		}
	}

	render() {
		const cards = this.props.todoData.map((card, index) => {
			return (
				<IonItemSliding key={index}>
					<IonItem onClick={() => {
						this.setState({
							busy: true,
							id: card.id,
							name: card.name,
							timestamp: card.timestamp,
							priority: card.priority,
							description: card.description
						})
					}}>
						<IonItemGroup>
							<IonItem class='card'>
								<IonLabel>{card.name}</IonLabel>
							</IonItem>
							<IonItem>
								<IonNote>{card.timestamp}</IonNote>
							</IonItem>
						</IonItemGroup>
					</IonItem>
					<IonItemOptions side='end'>
						<IonItemOption color='danger' onClick={() => {
							firebase.database().ref().child('to-do').child(card.id).remove()
							Toast({ message: 'Item Deleted' })
						}}>
							<IonIcon size='large' icon={trashOutline} />
						</IonItemOption>
					</IonItemOptions>
				</IonItemSliding>
			)
		})

		return (
			<IonContent>
				{cards}
				<IonPopover cssClass='update-to-do-popover' isOpen={this.state.busy} >
					<IonHeader>
						<IonToolbar>
							<IonTitle>Update To-Do Item</IonTitle>
						</IonToolbar>
					</IonHeader>
					<IonList lines="full">
						<IonItem>
							<IonLabel position="floating">Name</IonLabel>
							<IonInput maxlength={20} value={this.state.name} required={true} onIonChange={e => this.setState({ name: e.detail.value })} clearInput></IonInput>
						</IonItem>
						<IonItem>
							<IonLabel position="fixed">Due Date</IonLabel>
							<IonDatetime max="2099" min="2020" displayFormat="MMMM DD YYYY" placeholder="Choose Date" value={this.state.timestamp} onIonChange={e => this.setState({ timestamp: e.detail.value })}></IonDatetime>
							<IonDatetime displayFormat="h:mm a" placeholder='Choose Time' value={this.state.timestamp} onIonChange={e => this.setState({ timestamp: e.detail.value })}></IonDatetime>
						</IonItem>
						<IonItem>
							<IonLabel position="floating">Set Priority</IonLabel>
							<IonSelect interface="popover" value={this.state.priority} onIonChange={e => this.setState({ priority: e.detail.value })}>
								<IonSelectOption value="0">0</IonSelectOption>
								<IonSelectOption value="1">1</IonSelectOption>
								<IonSelectOption value="2">2</IonSelectOption>
								<IonSelectOption value="3">3</IonSelectOption>
								<IonSelectOption value="4">4</IonSelectOption>
								<IonSelectOption value="5">5</IonSelectOption>
							</IonSelect>
						</IonItem>
						<IonItem>
							<IonLabel position='floating'>Description</IonLabel>
							<IonTextarea rows={5} maxlength={200} value={this.state.description} onIonChange={e => this.setState({ description: e.detail.value })}></IonTextarea>
						</IonItem>
					</IonList>
					<IonFooter>
						<IonToolbar>
							<IonButtons slot='primary'>
								<IonButton onClick={() => {
									this.setState({ busy: false })
								}}>Cancel</IonButton>
								<IonButton onClick={() => {
									this.setState({ busy: false })
									updatePost(this.state)
									Toast({ message: 'Item Updated' })
								}}>Update</IonButton>
							</IonButtons>
						</IonToolbar>
					</IonFooter>
				</IonPopover>
			</IonContent >)
	}
}

export default ToDoContainer;