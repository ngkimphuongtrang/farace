import React, { useState } from 'react';
import {
	View,
	Image, Alert,
	StyleSheet, ScrollView, Text, TouchableOpacity, StatusBar, Button
} from 'react-native';
import { bottomTabIcon, icons } from '../assets/image/index.js';
import { colors, endpoints, keys } from '../constants/index.js';
import { Searchbar } from 'react-native-paper';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getDataFromAsyncStorage } from '../components/util.js';
import { styles } from '../styles/CommonStyles.js';

const FriendScreen = ({ navigation }) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [members, setMembers] = useState([]);
	const onChangeSearch = async (query) => {
		setSearchQuery(query);
		const request = endpoints.userSearch;
		let Filters = [{ "FieldName": "FirstName", "Comparision": "Contains", "FieldValue": query }];
		let Sorts = ["FirstName"];
		let Page = 1;
		let PageSize = 30;
		console.log(request, { Filters, Sorts, Page, PageSize });
		await axios.post(request, {
			Filters, Sorts, Page, PageSize
		})
			.then(function (response) {
				console.log("Search:", response.data);
				setMembers(response.data.result);
			}).catch(function (error) {
				if (error.response) {
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.headers);
				} else if (error.request) {
					console.log(error.request);
				} else {
					console.log('Error', error.message);
				}
				console.log(error.config);
			});
	}
	const addFriendSuccess = (member) => {
		Alert.alert('Gửi lời mời kết bạn thành công', member['firstName'] + " " + member['lastName'] + " " + member['email'], [
			{
				text: 'OK',
			},
		]);
	}
	const addFriendFail = (member) => {
		Alert.alert('Gửi lời mời kết bạn thất bại', member['firstName'] + " " + member['lastName'] + " " + member['email'], [
			{
				text: 'OK',
			},
		]);
	}
	const handleAddFriend = async (member) => {
		const request = endpoints.sendFriend;
		let UserIdSend = await getDataFromAsyncStorage(keys.userId);
		let UserIdReceive = member['id'];
		console.log(request, { UserIdSend, UserIdReceive });
		await axios.post(request, {
			UserIdSend, UserIdReceive
		}).then(function (response) {
			console.log("Send friend:", response, response.data);
			setMembers(response.data);
			addFriendSuccess(member);
		}).catch(function (error) {
			addFriendFail(member);
			if (error.response) {
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
			} else if (error.request) {
				console.log(error.request);
			} else {
				console.log('Error', error.message);
			}
			console.log(error.config);
		});
	}

	return (
		<SafeAreaView style={styles.ContainerScreen}>

			<Searchbar
				placeholder="Tìm kiếm"
				onChangeText={onChangeSearch}
				value={searchQuery}
			/>
			<SafeAreaView style={{
				flex: 1,
				paddingTop: StatusBar.currentHeight
			}}>
				<ScrollView style={{
					marginHorizontal: 20,
				}}>
					{
						members.length > 0 && members?.map((member, i) => {
							return (
								<View key={i} style={{
									flexDirection: 'row',
									justifyContent: 'space-between',
									marginBottom: 5,
								}}>
									<Image
										style={styles.image}
										resizeMode="cover"
										source={bottomTabIcon.profile}
									/>
									<View style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
										<View style={{ flexDirection: 'row' }}>
											<Text style={{ fontStyle: 'italic' }}>{member['orderId'] + 1},</Text>
											<Text style={{ fontWeight: 'bold' }} >{member['firstName']} {member['lastName']}</Text>
										</View>
										{/* <Text color={colors.primary}>{member.email}</Text>: */}
										<Text>{member['email']}</Text>
									</View>
									<TouchableOpacity onPress={() => handleAddFriend(member)}>
										<Image source={icons.add}
											style={
												{
													// justifyContent: 'center',
													height: 40,
													width: 40,
												}
											}></Image></TouchableOpacity>
								</View>
							);
						})
					}
				</ScrollView>
			</SafeAreaView>

		</SafeAreaView >
	);
};

export default FriendScreen;
