import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import { useCallback, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    View,
    Text,
    ScrollView,
    ActivityIndicator,
    RefreshControl,
    Share,
    Alert,
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Heart, Share2 } from 'lucide-react-native';
import { COLORS, SIZES } from "../constants";

const InfoSection = ({ data }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const checkIfFavorite = async () => {
        try {
            const favorites = await AsyncStorage.getItem("favorites");
            const favoritesArray = favorites ? JSON.parse(favorites) : [];
            const isFav = favoritesArray.some((item) => item.id === data.id);
            setIsFavorite(isFav);
        } catch (error) {
            console.error("Failed to fetch favorites", error);
        }
    };

    useEffect(() => {
        checkIfFavorite();
    }, []);

    const handleFavoriteToggle = async () => {
        try {
            let favorites = await AsyncStorage.getItem("favorites");
            favorites = favorites ? JSON.parse(favorites) : [];

            const updatedFavorites = isFavorite
                ? favorites.filter((item) => item.id !== data.id)
                : [...favorites, data];

            await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error("Failed to update favorites", error);
        }
    };

     const onShare = async () => {
        try {
            const result = await Share.share({
                message: `Check out this pixel image: ${data?.image}`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                } else {
                }
            } else if (result.action === Share.dismissedAction) {

            }
        } catch (error) {
            Alert.alert(error.message);
        }
    }

    return (
        <SafeAreaView style={styles.info}>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleFavoriteToggle} style={styles.box}>
                    <Heart color={isFavorite ? "red" : "grey"} size={30} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.box} onPress={onShare}>
                    <Share2 color={COLORS.primary} size={30} />
                </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.difficulty}>{data.difficulty}</Text>
            </View>
        </SafeAreaView>
    );
}

export default InfoSection;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    box: {
        backgroundColor: COLORS.textbox,
        padding: SIZES.medium,
        borderRadius: SIZES.small,
        marginTop: SIZES.medium,
        marginBottom: SIZES.large,
        boxshadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        marginRight: SIZES.medium,
    },
    difficulty: {
        color: '#04157F',
        backgroundColor: '#B1D3FF',
        paddingHorizontal: SIZES.small,
        fontWeight: '600',
        fontSize: '35px',
        borderRadius: SIZES.small,
        paddingVertical: 2,
        fontSize: SIZES.medium,
        marginTop: SIZES.medium,
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})