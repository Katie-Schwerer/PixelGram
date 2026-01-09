import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import { useCallback, useState } from "react";
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
    Image
} from "react-native";

import { COLORS, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";
import ScreenHeader from "../../components/ScreenHeader";
import InfoSection from "../../components/InfoSection";
import FloatingButton from "../../components/FloatingButton";
import { ShareIcon } from "lucide-react-native";

const PixelDetails = () => {
    const params = useGlobalSearchParams();
    const router = useRouter();
    const [refreshing, setRefreshing] = useState(false);

    const { data, isLoading, error, refetch, getItemById } = useFetch("search", {
        id: params.id,
    });

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch();
        setRefreshing(false);
    }, []);

    const pixelItem = getItemById(parseInt(params.id, 10))

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <ScreenHeader header={pixelItem.name} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={refetch} />
                }
            >
                {isLoading ? (
                    <ActivityIndicator size="large" color={COLORS.primary} />
                ) : error ? (
                    <Text>Something went wrong</Text>
                ) : (
                    <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                       <Image 
                           source={{ uri: pixelItem.image }} 
                           style={styles.image} 
                           resizeMode="contain"
                       />
                       <InfoSection data={pixelItem} />
                    </View>
                )}
            </ScrollView>
            <FloatingButton onPress={() => router.back()} icon={<ShareIcon color={'white'} size={25} />} />
        </SafeAreaView>
    )
}

export default PixelDetails;

const styles = StyleSheet.create({ 
    title: {
        fontSize: SIZES.large,
        fontWeight: "bold",
        color: COLORS.primary,
        marginBottom: SIZES.small / 2,
    },
    description: {
        fontSize: SIZES.medium,
        color: COLORS.secondary,
        lineHeight: 22,
    },
    image: {
        width: '100%',
        height: 400,
        borderRadius: 10,
        marginBottom: SIZES.medium,
    },
});