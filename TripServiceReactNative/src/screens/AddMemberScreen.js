import { React, useState, useEffect } from 'react';
import {
	View, StyleSheet, Image, Text, Button, ScrollView, SafeAreaView, StatusBar
} from 'react-native';
import { CheckBox } from '@rneui/themed';
import { styles } from '../styles/CommonStyles';
import { bottomTabIcon } from '../assets/image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { endpoints, colors, keys } from '../constants';
import axios from 'axios';
import { getDataFromAsyncStorage, getUserInfoById, storeGroupId } from '../components/util';

const AddMemberScreen = ({ route, navigation }) => {
	var Members;
	if (route.params) {
		Members = route.params;
	}
	const [members, setMembers] = useState([]);
	const [chosenMembers, setChosenMembers] = useState(new Set());
	const [myUsername, setMyUsername] = useState();
	function isChosenMember(username) {
		if (chosenMembers instanceof Set)
			return chosenMembers.has(username);
		else return false;
	}
	function removeMember(username) {
		if (chosenMembers instanceof Set) {
			setChosenMembers(prev => new Set([...prev].filter(x => x !== username)))
		}
	}
	const handleOnCheckbox = (username) => {
		console.log("chosen", chosenMembers);
		let n = members.length;
		for (let i = 0; i < n; i++) {
			if (isChosenMember(username)) {
				removeMember(username);
			} else {
				setChosenMembers((oldArray) => new Set([...oldArray, username]));
			}
		}
		console.log("chosen", chosenMembers);
	}
	const storeMembers = async (members) => {
		try {
			await AsyncStorage.setItem('@member', JSON.stringify(members));
			console.log('Set @member in AsyncStorage done:', members);
		} catch (e) {
			// save error
		}
	}

	useEffect(() => {
		async function getData() {
			const userId = await getDataFromAsyncStorage(keys.userId);
			const request = `${endpoints.members}/${userId}/friend`;
			axios.get(request)
				.then(function (response) {
					setMembers(response.data);
					console.log(`${request} response:`, members);
				})
				.catch(function (error) {
					console.log(error);
				});
			const username = await getDataFromAsyncStorage(keys.username);
			setMyUsername(username);
		}
		getData();
		if (Members) {
			const { Members } = route.params;
			let n = Members.length;
			for (let i = 0; i < n; i++) {
				setChosenMembers((oldArray) => new Set([...oldArray, Members[i].email]));
			}
		}

	}, []);
	const postTripHandle = async () => {
		const locationSerialized = await AsyncStorage.getItem("@location");
		var _locationData;
		if (locationSerialized) {
			_locationData = JSON.parse(locationSerialized);
			console.log("location get from asyncstorage:", _locationData, members)
		}
		var customers = []
		var j = 0;
		for (let i = 0; i < members.length; i++) {
			if (isChosenMember(members[i].email)) {
				customers[j++] = members[i]
			}
		}
		let locations = _locationData;
		storeMembers(customers);

		let postTripDomain = endpoints.postTrip;
		if (Members) {
			const groupId = await getDataFromAsyncStorage(keys.groupId);
			postTripDomain = `${endpoints.postTrip}/${groupId}/update`;
			console.log("payload", { locations, customers }, postTripDomain);
			try {
				await axios.put(postTripDomain, {
					locations,
					customers,
				}).then(function (response) {
					console.log("update trip:", response, response.data, locations, customers);

				});
			} catch (error) {
				console.log("ERROR post trip:", error);
			}
			navigation.navigate("JourneyDetailScreen", { groupId: groupId });
		}
		else {
			const me = await getUserInfoById(keys.userId);
			console.log("myinfo", me);
			customers[j++] = me
			try {
				console.log("payload", { locations, customers }, postTripDomain);
				await axios.post(postTripDomain, {
					locations,
					customers,
				}).then(function (response) {
					console.log("post trip:", response.data.id, locations, customers);
					if (response.data.id) {
						storeGroupId(response.data.id);
					}
				});
			} catch (error) {
				console.log("ERROR post trip:", error);
			}
			navigation.navigate("JourneyDetailScreen");
		}

	}
	return (
		<SafeAreaView style={styles.ContainerScreen}>
			<SafeAreaView style={{
				flex: 1,
				paddingTop: StatusBar.currentHeight
			}}>
				<ScrollView style={{
					marginHorizontal: 20,
				}}>
					{
						members.map((member, i) => {
							return (
								<View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
									<Image
										style={styles.image}
										resizeMode="cover"
										source={bottomTabIcon.profile}
									/>
									<View style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
										<View style={{ flexDirection: 'row' }}>
											<Text style={{ fontStyle: 'italic' }}>{member.orderId + 1},</Text>
											<Text style={{ fontWeight: 'bold' }} >{member.firstName} {member.lastName}</Text>
										</View>
										{/* <Text color={colors.primary}>{member.email}</Text>: */}
										<Text>{member.email}</Text>
									</View>
									<CheckBox
										checked={isChosenMember(member.email)}
										onPress={() => handleOnCheckbox(member.email)}
										iconType="material-community"
										checkedIcon="checkbox-outline"
										uncheckedIcon={'checkbox-blank-outline'}
									/>
								</View>
							);
						})
					}
				</ScrollView>
			</SafeAreaView>
			<View style={[mystyles.button, { alignContent: 'space-between', marginBottom: 20 }]}>
				<View style={[{ width: "40%", alignContent: 'center' }, styles.BorderStyle]}>
					<Button
						onPress={postTripHandle}
						title="Tiếp tục"
						color={colors.primary}
					/>
				</View>
			</View>
		</SafeAreaView >
	);
};

export default AddMemberScreen;
const mystyles = StyleSheet.create({
	button: {
		alignItems: 'center',
		marginTop: 50
	},
});