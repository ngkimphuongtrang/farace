import React, { useState, useEffect } from 'react';
import {
	View,
	StyleSheet, TouchableOpacity, Image, SafeAreaView, ScrollView, StatusBar, Text
} from 'react-native';
import { ADD_ICON } from '../assets/image/index.js';
import { endpoints, keys } from '../constants/index.js';
import axios from 'axios';
import { getDataFromAsyncStorage } from '../components/util.js';
import { styles } from '../styles/CommonStyles.js';
import { colors } from '../constants/index.js';

const JourneyScreen = ({ navigation }) => {
	const [trips, setTrips] = useState(null);
	const getTripOfUserDomain = async () => {
		const userId = await getDataFromAsyncStorage(keys.userId);
		console.log(userId)
		if (userId) {
			console.log("userId", userId, endpoints.trip + userId);
			return endpoints.trip + userId;
		}
		console.log("get trip of user domain failed");
	}
	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			async function getData() {
				axios.get(await getTripOfUserDomain())
					.then(function (response) {
						console.log("Trip response:", response, response.data);
						setTrips(response.data.tripCustomer);
					})
					.catch(function (error) {
						if (error.response) {
							// The request was made and the server responded with a status code
							// that falls out of the range of 2xx
							console.log(error.response.data);
							console.log(error.response.status);
							console.log(error.response.headers);
						} else if (error.request) {
							// The request was made but no response was received
							// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
							// http.ClientRequest in node.js
							console.log(error.request);
						} else {
							// Something happened in setting up the request that triggered an Error
							console.log('Error', error.message);
						}
						console.log(error.config);
					});
			}
			getData();
		});
		return unsubscribe;
	}, []);
	const handleOnTripDetail = (groupId) => {
		console.log("on press", groupId);
		navigation.navigate("JourneyDetailScreen", { groupId: groupId });
	}
	return (
		<View style={styles.ContainerScreen}>

			<View style={{ flex: 8 }}>
				<SafeAreaView style={{
					flex: 1,
					paddingTop: StatusBar.currentHeight
				}}>
					<ScrollView style={{
						marginHorizontal: 20,
					}}>
						{trips != undefined ? trips.map((l, i) =>
							<TouchableOpacity onPress={() => handleOnTripDetail(l.groupId)} key={i}>
								<View style={{ flexDirection: 'row', width: 310 }}>

									<View style={[
										{ width: 30, height: 30, backgroundColor: colors.generic1, alignContent: 'center', marginBottom: 5, justifyContent: 'center' },
										styles.BorderStyle,
									]}>
										<Text style={{ textAlign: 'center' }}>{i + 1}</Text>
									</View>

									<View style={[
										{ alignContent: 'center', marginBottom: 5, backgroundColor: colors.generic2, justifyContent: 'space-around' },
										styles.BorderStyle,
										{ borderColor: colors.generic2 }]}>
										<View style={[
											{ alignContent: 'center', marginBottom: 5, backgroundColor: colors.generic3 },
											styles.BorderStyle,
											{ borderColor: colors.generic3 }]
										}>
											<Text style={{ fontWeight: 'bold', color: 'black' }}>
												{l.start}
											</Text>
										</View>

										<View style={[
											{ alignContent: 'center', marginBottom: 5, backgroundColor: colors.generic4 },
											styles.BorderStyle,
											{ borderColor: colors.generic4 }]}>
											<Text style={{ fontWeight: 'bold', color: 'black' }}>
												{l.end}
											</Text>
										</View></View>
								</View>
							</TouchableOpacity>
						) : null}
					</ScrollView>
				</SafeAreaView>
			</View>
			<View style={[
				{ alignItems: 'center' },
				{ flex: 1 }]}
			>
				<TouchableOpacity onPress={() => navigation.navigate("AddJourney")}>
					<Image source={ADD_ICON}
						style={
							{
								justifyContent: 'center',
								height: 50,
								width: 50,
							}
						}></Image></TouchableOpacity>
			</View>

		</View >
	);
};
export default JourneyScreen;
