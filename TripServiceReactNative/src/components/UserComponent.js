import { View, Text } from 'react-native';
import AvatarComponent from "./AvatarComponent";

const UserComponent = (props) => {
  return (

    props['elevation'] ?
      <View
        style={
          {
            alignContent: 'center',
            marginBottom: 5,
            backgroundColor: props['bgColor'], flexDirection: 'row', borderRadius: 10
          }} >
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 10, marginTop: 10 }}>
          <AvatarComponent userId={props['member']['id']} />

          <View style={{ flexDirection: 'column', justifyContent: 'flex-start', marginLeft: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold' }} >{props['member']['firstName']} {props['member']['lastName']}</Text>
            </View>
            <Text>{props['member']['email']}</Text>
          </View>
        </View>
      </View> :
      <View elevation={5}
        style={
          {
            alignContent: 'center', marginBottom: 10,
            backgroundColor: props['bgColor'], flexDirection: 'row', borderRadius: 10

          }} >
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 10, marginTop: 10 }}>
          <AvatarComponent userId={props['member']['id']} />

          <View style={{ flexDirection: 'column', justifyContent: 'flex-start', marginLeft: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold' }} >{props['member']['firstName']} {props['member']['lastName']}</Text>
            </View>
            <Text>{props['member']['email']}</Text>
          </View>
        </View>
      </View>


  )
}
export default UserComponent;

/*
 [{"birthDay": "2020-08-21T23:15:30", "email": "nkpt2", "firstName": "Trang", "id": "2dbbd0a3-1a39-45d9-9b9e-1fe268845d35", "imgUrl": null, "lastName": "Phuong", "orderId": 0, "phoneNumber": null}, {"birthDay": "0001-01-01T00:00:00", "email": "hiennguyen", "firstName": "Hiên", "id": "8023dc54-026e-4636-8833-a96e1f79161c", "imgUrl": null, "lastName": "Nguyễn", "orderId": 1, "phoneNumber": null}, {"birthDay": "2001-06-08T00:00:00", "email": "nkpt1", "firstName": "Trang Ph", "id": "adabdaa8-89b1-491e-93ad-8bd6fc8fc333", "imgUrl": null, "lastName": "Nguyen", "orderId": 2, "phoneNumber": "0323882823"}]
*/