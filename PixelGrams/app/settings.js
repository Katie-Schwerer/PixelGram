import React from "react";
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { COLORS, SIZES } from "../constants";
import ScreenHeader from "../components/ScreenHeader";
import { Heart, Bell, ArrowBigLeft } from 'lucide-react-native';

const Settings = () => {
    const router = useRouter();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <ScreenHeader header="Settings" image={<ArrowBigLeft color={COLORS.lightWhite} size={35} />} />
            <ScrollView style={styles.container}>
                <TouchableOpacity 
                    style={styles.settingItem}
                    onPress={() => router.push("/settings/Favourites")}
                >
                    <Heart color={COLORS.primary} size={24} />
                    <Text style={styles.settingText}>Favorites</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingItem}>
                    <Bell color={COLORS.primary} size={24} />
                    <Text style={styles.settingText}>Notifications</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
};

export default Settings;

const styles = StyleSheet.create({
    container: {
        padding: SIZES.medium,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SIZES.medium,
        backgroundColor: COLORS.textbox,
        borderRadius: SIZES.small,
        marginBottom: SIZES.medium,
    },
    settingText: {
        marginLeft: SIZES.medium,
        fontSize: SIZES.medium,
        color: COLORS.primary,
        fontWeight: '600',
    },
});