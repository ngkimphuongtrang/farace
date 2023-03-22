import { StyleSheet } from 'react-native';
import { primaryColor } from '../constants';
const styles = StyleSheet.create({
    greenText: {
        color: primaryColor
    },
    bottomContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: "row",
        alignContent: "space-around",

        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: primaryColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1.5,
        marginTop: 10,
    },
    icon: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 38,
        height: 38,
        marginLeft: 15,
        marginRight: 15,
    }, text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
});
export { styles };