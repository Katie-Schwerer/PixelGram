//import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { COLORS, SIZES } from "../constants/theme";
import icons from "../constants/icons"; 
import ScreenHeader from "../components/ScreenHeader";
import PixelFeed from "../components/PixelFeed";
import FloatingButton from "../components/FloatingButton";
import { Plus } from 'lucide-react-native';
import DailyImageInspiration from "../components/DailyImageInspiration";

import { 
  UNSPLASH_ACCESS_KEY,
  STORAGE_USER_KEY,
  STORAGE_FAVORITES_KEY 
} from '@env';

const Home = () => {
    console.log(UNSPLASH_ACCESS_KEY);
    return (
        <>
            <ScreenHeader header="Home" />
            <DailyImageInspiration />
            <ScrollView showsVerticalScrollIndicator={false} >
                <PixelFeed />
            </ScrollView>
            <FloatingButton onPress={() => console.log('Adding')} icon={<Plus color="white" size="30" />} />
        </>
    );
}

export default Home;