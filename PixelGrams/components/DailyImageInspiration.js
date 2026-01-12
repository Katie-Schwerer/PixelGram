import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    ActivityIndicator, 
    StyleSheet, 
    Image, 
    TouchableOpacity,
    Dimensions 
} from 'react-native';
import { createApi } from 'unsplash-js';
import { COLORS, FONT, SIZES, SHADOWS } from '../constants/theme';
import { UNSPLASH_ACCESS_KEY } from '@env';

// Mock data for offline/development mode
const MOCK_PHOTO = {
    urls: {
        regular: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800',
    },
    description: 'Colorful pixel art landscape',
    alt_description: 'Beautiful pixel art inspiration',
    user: {
        name: 'Demo Artist',
    },
};

const unsplash = createApi({
    accessKey: UNSPLASH_ACCESS_KEY,
});

const DailyImageInspiration = () => {
    const [photo, setPhoto] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [useMockData, setUseMockData] = useState(false);

    useEffect(() => {
        fetchDailyPhoto();
    }, []);

    const fetchDailyPhoto = async () => {
        try {
            setIsLoading(true);
            setError(null);
            
            console.log('API Key available:', !!UNSPLASH_ACCESS_KEY);
            console.log('Fetching from Unsplash...');
            
            const result = await unsplash.photos.getRandom({
                query: 'pixel art',
                orientation: 'landscape',
            });

            console.log('Result type:', result.type);

            if (result.type === 'success') {
                setPhoto(result.response);
                setUseMockData(false);
            } else {
                console.error('Unsplash API error:', result.errors);
                setError('Failed to fetch image');
                // Fallback to mock data
                setPhoto(MOCK_PHOTO);
                setUseMockData(true);
            }
        } catch (err) {
            console.error('Error fetching daily photo:', err);
            setError('No internet connection. Using demo image.');
            // Fallback to mock data on network error
            setPhoto(MOCK_PHOTO);
            setUseMockData(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRefresh = () => {
        fetchDailyPhoto();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Daily Pixel Inspiration</Text>
                <TouchableOpacity onPress={handleRefresh} style={styles.refreshButton}>
                    <Text style={styles.refreshText}>Refresh</Text>
                </TouchableOpacity>
            </View>

            {useMockData && (
                <View style={styles.demoNotice}>
                    <Text style={styles.demoText}>📡 Demo Mode - Check internet connection</Text>
                </View>
            )}

            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            ) : error && !photo ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity onPress={handleRefresh} style={styles.retryButton}>
                        <Text style={styles.retryText}>Try Again</Text>
                    </TouchableOpacity>
                </View>
            ) : photo ? (
                <View style={styles.photoContainer}>
                    <Image 
                        source={{ uri: photo.urls.regular }} 
                        style={styles.image}
                        resizeMode="cover"
                    />
                    <View style={styles.photoInfo}>
                        <Text style={styles.photoDescription} numberOfLines={2}>
                            {photo.description || photo.alt_description || 'Daily pixel art inspiration'}
                        </Text>
                        {photo.user && (
                            <Text style={styles.photographer}>
                                Photo by {photo.user.name}
                            </Text>
                        )}
                    </View>
                </View>
            ) : null}
        </View>
    );
}

export default DailyImageInspiration;

const styles = StyleSheet.create({
    container: {
        marginVertical: SIZES.medium,
        marginHorizontal: SIZES.medium,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SIZES.small,
    },
    headerTitle: {
        fontSize: SIZES.large,
        fontFamily: FONT.bold,
        color: COLORS.primary,
    },
    refreshButton: {
        paddingVertical: SIZES.xSmall / 2,
        paddingHorizontal: SIZES.small,
    },
    refreshText: {
        fontSize: SIZES.medium,
        color: COLORS.tertiary,
        fontFamily: FONT.medium,
    },
    demoNotice: {
        backgroundColor: '#FFF3CD',
        padding: SIZES.small,
        borderRadius: 8,
        marginBottom: SIZES.small,
    },
    demoText: {
        fontSize: SIZES.small,
        color: '#856404',
        fontFamily: FONT.regular,
        textAlign: 'center',
    },
    loadingContainer: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.lightWhite,
        borderRadius: 12,
    },
    errorContainer: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.lightWhite,
        borderRadius: 12,
        padding: SIZES.medium,
    },
    errorText: {
        fontSize: SIZES.medium,
        color: COLORS.secondary,
        fontFamily: FONT.regular,
        marginBottom: SIZES.small,
        textAlign: 'center',
    },
    retryButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: SIZES.small,
        paddingHorizontal: SIZES.medium,
        borderRadius: 8,
        marginTop: SIZES.small,
    },
    retryText: {
        color: COLORS.white,
        fontSize: SIZES.medium,
        fontFamily: FONT.medium,
    },
    photoContainer: {
        backgroundColor: COLORS.white,
        borderRadius: 12,
        overflow: 'hidden',
        ...SHADOWS.medium,
    },
    image: {
        width: '100%',
        height: 200,
    },
    photoInfo: {
        padding: SIZES.small,
    },
    photoDescription: {
        fontSize: SIZES.medium,
        color: COLORS.secondary,
        fontFamily: FONT.regular,
        marginBottom: SIZES.xSmall / 2,
    },
    photographer: {
        fontSize: SIZES.small,
        color: COLORS.gray,
        fontFamily: FONT.regular,
        fontStyle: 'italic',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 10,
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        color: '#333',
    },
    errorText: {
        color: 'red',
        fontSize: 18,
    },
}); 