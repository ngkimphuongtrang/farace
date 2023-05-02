import { StyleSheet } from 'react-native';
import { colors } from '../constants';

const styles = StyleSheet.create({
    greenText: {
        color: colors.primary
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
        shadowColor: colors.primary,
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
    AppButtonContainer: {
        elevation: 8,
        borderRadius: 5,
        paddingVertical: 8,
        // paddingHorizontal: 40,
        height: 40,
        width: 140,
    },
    AppButtonText: {
        alignSelf: "center",
        textTransform: "uppercase",
    },
    BorderStyle: {
        borderRadius: 10,
        borderWidth: 3,
        borderColor: colors.primary,
    },
    ContainerScreen: {
        flex: 1,
    },
});
export { styles };