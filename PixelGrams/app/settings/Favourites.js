import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    Image,
    TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, FONT, SIZES, SHADOWS } from "../../constants";
import { useFocusEffect, useRouter } from "expo-router";
import ScreenHeader from '../../components/ScreenHeader';

const Favourites = () => {
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const loadFavorites = async () => {
        try {
            const storedFavorites = await AsyncStorage.getItem("favorites");
            const favoritesArray = storedFavorites ? JSON.parse(storedFavorites) : [];
            setFavorites(favoritesArray);
        } catch (error) {
            console.error("Error loading favorites:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            loadFavorites();
        }, [])
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <ScreenHeader header="Favorites" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    {isLoading ? (
                        <ActivityIndicator size="large" color={COLORS.primary} />
                    ) : favorites.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No favorite items found.</Text>
                            <Text style={styles.emptySubText}>Start adding favorites from the home feed!</Text>
                        </View>
                    ) : (
                        <>
                            <Text style={styles.pageTitle}>My Favourite Images</Text>
                            {favorites.map((item) => (
                                <TouchableOpacity 
                                    key={item.id} 
                                    style={styles.favoriteCard}
                                    onPress={() => router.push(`/pixel-details/${item.id}`)}
                                >
                                    <Image 
                                        source={{ uri: item.image }} 
                                        style={styles.favoriteImage} 
                                        resizeMode="cover"
                                    />
                                    <View style={styles.favoriteInfo}>
                                        <Text style={styles.favoriteName}>{item.name}</Text>
                                        <Text style={styles.favoriteDifficulty}>{item.difficulty}</Text>
                                        {item.description && (
                                            <Text style={styles.favoriteDescription} numberOfLines={2}>
                                                {item.description}
                                            </Text>
                                        )}
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Favourites;

const styles = StyleSheet.create({
    container: {
        marginTop: SIZES.medium,
        padding: SIZES.medium,
        paddingBottom: 100,
    },
    pageTitle: {
        textAlign: "center",
        color: COLORS.primary,
        fontWeight: "bold",
        fontSize: SIZES.xLarge,
        marginBottom: SIZES.large,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: SIZES.xxLarge * 2,
    },
    emptyText: {
        fontSize: SIZES.large,
        color: COLORS.primary,
        fontWeight: "bold",
        textAlign: "center",
    },
    emptySubText: {
        fontSize: SIZES.medium,
        color: COLORS.gray,
        textAlign: "center",
        marginTop: SIZES.small,
    },
    favoriteCard: {
        backgroundColor: COLORS.textbox,
        borderRadius: SIZES.medium,
        padding: SIZES.medium,
        marginBottom: SIZES.medium,
        flexDirection: 'row',
        ...SHADOWS.medium,
    },
    favoriteImage: {
        width: 100,
        height: 100,
        borderRadius: SIZES.small,
    },
    favoriteInfo: {
        flex: 1,
        marginLeft: SIZES.medium,
        justifyContent: 'space-between',
    },
    favoriteName: {
        fontSize: SIZES.large,
        fontWeight: "bold",
        color: COLORS.primary,
    },
    favoriteDifficulty: {
        color: '#04157F',
        backgroundColor: '#B1D3FF',
        paddingHorizontal: SIZES.small,
        fontWeight: '600',
        borderRadius: SIZES.small,
        paddingVertical: 2,
        fontSize: SIZES.small,
        alignSelf: 'flex-start',
        marginTop: SIZES.small,
    },
    favoriteDescription: {
        fontSize: SIZES.small,
        color: COLORS.gray,
        marginTop: SIZES.small,
    },
});