import React, { useState } from 'react'
import { IonPopover, IonHeader, IonToolbar, IonTitle, IonList, IonItem, IonLabel, IonInput, IonDatetime, IonSelect, IonSelectOption, IonTextarea, IonFooter, IonButtons, IonButton, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { add } from 'ionicons/icons'
import './CreateNewPopOverContainer.css'
import { writeNewPost } from './Firebase'
import { Toast } from './Toast'

const CreateNewPopOverContainer: React.FC = () => {
	const [showPopover, setShowPopover] = useState<boolean>(false);
	const [text, setText] = useState<string>('');
	const [selectedDate, setSelectedDate] = useState<string>('');
	const [priority, setPriority] = useState<number>(-1);
	const [description, setDesciption] = useState<string>('');

	function onClickCancel() {
		setText('')
		setSelectedDate('')
		setPriority(-1)
		setDesciption('')
		setShowPopover(false)
	}

	async function onClickOK() {
		if (text === '' || selectedDate === '' || priority === -1) {
			Toast({ message: 'Fields are empty!' })
			return;
		}
		await writeNewPost(text, selectedDate, priority, description)
		setShowPopover(false)
		Toast({ message: 'New Item Created' })
	}

	return (
		<div>
			<IonPopover cssClass='new-to-do-popover' isOpen={showPopover} onDidDismiss={onClickCancel} >
				<IonHeader>
					<IonToolbar>
						<IonTitle>Create New To-Do Item</IonTitle>
					</IonToolbar>
				</IonHeader>
				<IonList lines="full">
					<IonItem>
						<IonLabel position="floating">Name</IonLabel>
						<IonInput maxlength={20} value={text} required={true} onIonChange={e => setText(e.detail.value!)} clearInput></IonInput>
					</IonItem>
					<IonItem>
						<IonLabel position="fixed">Due Date</IonLabel>
						<IonDatetime max="2099" min="2020" displayFormat="MMMM DD YYYY" placeholder="Choose Date" value={selectedDate} onIonChange={e => setSelectedDate(e.detail.value!)}></IonDatetime>
						<IonDatetime displayFormat="h:mm a" placeholder='Choose Time' value={selectedDate} onIonChange={e => setSelectedDate(e.detail.value!)}></IonDatetime>
					</IonItem>
					<IonItem>
						<IonLabel position="floating">Set Priority</IonLabel>
						<IonSelect interface="popover" value={priority} onIonChange={e => setPriority(e.detail.value)}>
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
						<IonTextarea rows={5} maxlength={200} onIonChange={e => setDesciption(e.detail.value!)}></IonTextarea>
					</IonItem>
				</IonList>
				<IonFooter>
					<IonToolbar>
						<IonButtons slot='primary'>
							<IonButton onClick={onClickCancel}>Cancel</IonButton>
							<IonButton onClick={onClickOK}>Create</IonButton>
						</IonButtons>
					</IonToolbar>
				</IonFooter>
			</IonPopover>

			<IonFab vertical="bottom" horizontal="center" slot="fixed">
				<IonFabButton onClick={() => setShowPopover(true)}>
					<IonIcon icon={add} />
				</IonFabButton>
			</IonFab>
		</div>
	);
};

export default CreateNewPopOverContainer;
