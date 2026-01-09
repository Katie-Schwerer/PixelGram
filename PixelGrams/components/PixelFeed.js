import { useState } from "react";
import { useRouter } from "expo-router";
import { COLORS, FONT, SHADOWS, SIZES } from '../constants/theme'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    ActivityIndicator,
    StyleSheet,
} from "react-native";

import useFetch from "../hook/useFetch";

const PixelFeed = ({ images }) => {
    const router = useRouter();
    const { isLoading, error, bestMeditations } = useFetch("search", {
        query: "",
        num_pages: "1",
    });

    const handleCardPress = (item => {
        router.push(`/pixel-details/${item.id}`);
    })

    const data = images || bestMeditations;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Pixel Feed</Text>
            </View>

            <View style={styles.cardsContainer}>
                {isLoading ? (
                    <ActivityIndicator size="large" color={COLORS.primary} />
                ) : error ? (
                    <Text>Something went wrong</Text>
                ) : (
                    data?.map((images) => (
                        <TouchableOpacity key={`image-${images.id}`} style={styles.cardContainer} onPress={() => handleCardPress(images)}>
                            <View style={styles.logoContainer}>
                                <Image source={{ uri: images.image }} resizeMode="cover" style={styles.logoImage} />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.meditationName} numberOfLines={1}>{images.name}</Text>
                                <Text style={styles.difficulty}>{images.difficulty}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                )}
            </View>
        </View>
    )
}

export default PixelFeed;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: SIZES.xLarge,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: SIZES.small,
    },
    headerTitle: {
        fontSize: SIZES.large,
        fontWeight: "bold",
        marginLeft: SIZES.small,
        color: COLORS.primary,
    },
    cardsContainer: {
        marginTop: SIZES.medium,
        gap: SIZES.small,
        padding: SIZES.small,
    },
    cardContainer: {
        flex: 1,
        justifyContent: "space-between",
        padding: SIZES.medium,
        borderRadius: SIZES.small,
        backgroundColor: COLORS.textbox,
        ...SHADOWS.medium,
        shadowColor: COLORS.textbox,
    },
    logoContainer: {
        width: "100%",
        height: 150,
        backgroundColor: COLORS.textbox,
        justifyContent: "center",
        borderRadius: SIZES.medium,
        alignItems: "center",
    },
    logoImage: {
        width: "100%",
        height: "100%",
        borderRadius: SIZES.medium,
    },
    textContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: SIZES.medium,
        marginTop: SIZES.medium,
    },
    meditationName: {
        fontSize: SIZES.medium,
        fontWeight: "bold",
        color: 'black',
    },
    difficulty: {
        color: '#04157F',
        backgroundColor: '#B1D3FF',
        paddingHorizontal: SIZES.small,
        fontWeight: '600',
        borderRadius: SIZES.small,
        paddingVertical: 2,
        fontSize: SIZES.medium,
    },
});