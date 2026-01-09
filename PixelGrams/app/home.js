//import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { COLORS, SIZES } from "../constants/theme";
import icons from "../constants/icons"; 
import ScreenHeader from "../components/ScreenHeader";
import PixelFeed from "../components/PixelFeed";
import FloatingButton from "../components/FloatingButton";
import { Plus } from 'lucide-react-native';

const Home = () => {
    return (
        <>
            <ScreenHeader header="Home" image={icons.settings} />
            <ScrollView showsVerticalScrollIndicator={false} >
                <PixelFeed />
            </ScrollView>
            <FloatingButton onPress={() => console.log('Adding')} icon={<Plus color="white" size="30" />} />
        </>
    );
}

export default Home;