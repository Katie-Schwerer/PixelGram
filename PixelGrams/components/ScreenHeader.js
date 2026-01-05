import { useRouter } from "expo-router";
import { TouchableOpacity, View, Image, StyleSheet, Text } from "react-native";
import icons from "../constants/theme";
import { COLORS, SIZES } from "../constants/theme";
import { Settings } from 'lucide-react-native';

const ScreenHeader = ({ header, image }) => {
    const router = useRouter();

    return (
        <>
            <View style={styles.btn}>
                <View style={styles.btnContainer}>
                    <Text style={styles.header}>{header}</Text>
                </View>
                <TouchableOpacity style={styles.btnContainer} onPress={() => router.push("/settings")}>
                    <Settings color="white" size="35" />
                </TouchableOpacity>
            </View>
        </>
    )
}

export default ScreenHeader;

const styles = StyleSheet.create({
    btn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 55,
        width: '100vw',
        height: '15%',
        backgroundColor: COLORS.primary,
    },
    header: {
        color: COLORS.white,
        fontWeight: 800,
        fontSize: 35,
        resizeMode: 'contain',
        marginTop: '1rem',
        paddingHorizontal: 70,
    },
    image: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    btnContainer: {
        width: 40,
        height: 40,
        color: COLORS.white,
        borderRadius: SIZES.small / 1.25,
        justifyContent: "center",
        alignItems: "center",
    },
});