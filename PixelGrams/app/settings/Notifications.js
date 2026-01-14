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
    Switch,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, FONT, SIZES, SHADOWS } from "../../constants";
import { useFocusEffect, useRouter } from "expo-router";
import ScreenHeader from '../../components/ScreenHeader';
import { ArrowBigLeft, Mail, Bell, MessageSquare } from 'lucide-react-native';
import * as Notifications from 'expo-notifications';

const NotificationsScreen = () => {
    const router = useRouter();
    const [emailNotifications, setEmailNotifications] = useState(false);
    const [pushNotifications, setPushNotifications] = useState(false);
    const [smsNotifications, setSmsNotifications] = useState(false);
    const [loading, setLoading] = useState(true);

    // Load notification preferences
    useEffect(() => {
        loadNotificationPreferences();
    }, []);

    const loadNotificationPreferences = async () => {
        try {
            const email = await AsyncStorage.getItem('emailNotifications');
            const push = await AsyncStorage.getItem('pushNotifications');
            const sms = await AsyncStorage.getItem('smsNotifications');

            setEmailNotifications(email === 'true');
            setPushNotifications(push === 'true');
            setSmsNotifications(sms === 'true');
        } catch (error) {
            console.error('Error loading notification preferences:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleEmailNotifications = async (value) => {
        try {
            setEmailNotifications(value);
            await AsyncStorage.setItem('emailNotifications', value.toString());
            alert('Email notification preference updated.');
        } catch (error) {
            console.error('Error saving email notification preference:', error);
        }
    };

    const togglePushNotifications = async (value) => {
        try {
            if (value) {
                // Request permissions when enabling push notifications
                const { status } = await Notifications.requestPermissionsAsync();
                if (status !== 'granted') {
                    alert('Permission to receive push notifications was denied!');
                    return;
                } else {
                    alert('Push notifications enabled.');
                }
            }
            setPushNotifications(value);
            await AsyncStorage.setItem('pushNotifications', value.toString());
        } catch (error) {
            console.error('Error saving push notification preference:', error);
        }
    };

    const toggleSmsNotifications = async (value) => {
        try {
            setSmsNotifications(value);
            await AsyncStorage.setItem('smsNotifications', value.toString());
            alert('SMS notification preference updated.');
        } catch (error) {
            console.error('Error saving SMS notification preference:', error);
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
                <ScreenHeader header="Notifications" image={<ArrowBigLeft color={COLORS.lightWhite} size={35} />} />
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <ScreenHeader header="Notifications" image={<ArrowBigLeft color={COLORS.lightWhite} size={35} />} />
            <ScrollView style={styles.container}>
                <View style={styles.settingItem}>
                    <View style={styles.settingInfo}>
                        <Mail color={COLORS.primary} size={24} />
                        <View style={styles.settingTextContainer}>
                            <Text style={styles.settingText}>Email Notifications</Text>
                            <Text style={styles.settingDescription}>Receive updates via email</Text>
                        </View>
                    </View>
                    <Switch
                        trackColor={{ false: COLORS.gray2, true: COLORS.primary }}
                        thumbColor={emailNotifications ? COLORS.lightWhite : COLORS.gray}
                        ios_backgroundColor={COLORS.gray2}
                        onValueChange={toggleEmailNotifications}
                        value={emailNotifications}
                    />
                </View>

                <View style={styles.settingItem}>
                    <View style={styles.settingInfo}>
                        <Bell color={COLORS.primary} size={24} />
                        <View style={styles.settingTextContainer}>
                            <Text style={styles.settingText}>Push Notifications</Text>
                            <Text style={styles.settingDescription}>Receive push notifications</Text>
                        </View>
                    </View>
                    <Switch
                        trackColor={{ false: COLORS.gray2, true: COLORS.primary }}
                        thumbColor={pushNotifications ? COLORS.lightWhite : COLORS.gray}
                        ios_backgroundColor={COLORS.gray2}
                        onValueChange={togglePushNotifications}
                        value={pushNotifications}
                    />
                </View>

                <View style={styles.settingItem}>
                    <View style={styles.settingInfo}>
                        <MessageSquare color={COLORS.primary} size={24} />
                        <View style={styles.settingTextContainer}>
                            <Text style={styles.settingText}>SMS Notifications</Text>
                            <Text style={styles.settingDescription}>Receive updates via SMS</Text>
                        </View>
                    </View>
                    <Switch
                        trackColor={{ false: COLORS.gray2, true: COLORS.primary }}
                        thumbColor={smsNotifications ? COLORS.lightWhite : COLORS.gray}
                        ios_backgroundColor={COLORS.gray2}
                        onValueChange={toggleSmsNotifications}
                        value={smsNotifications}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default NotificationsScreen;

const styles = StyleSheet.create({
    container: {
        padding: SIZES.medium,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: SIZES.medium,
        backgroundColor: COLORS.textbox,
        borderRadius: SIZES.small,
        marginBottom: SIZES.medium,
    },
    settingInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    settingTextContainer: {
        marginLeft: SIZES.medium,
        flex: 1,
    },
    settingText: {
        fontSize: SIZES.medium,
        color: COLORS.primary,
        fontWeight: '600',
    },
    settingDescription: {
        fontSize: SIZES.small,
        color: COLORS.gray,
        marginTop: 4,
    },
});