//import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { COLORS, SIZES } from "../constants/theme";
import icons from "../constants/icons"; 
import ScreenHeader from "../components/ScreenHeader";

const Home = () => {
    return (
        <>
            <ScreenHeader header="Home" image={icons.settings} />
        </>
    )
}

export default Home;