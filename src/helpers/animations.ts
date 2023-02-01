import { Animated } from "react-native";

export const fadeIn = (animated: Animated.Value) => {
    Animated.timing(animated, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false
    }).start();
}

export const fadeOut = (animated: Animated.Value) => {
    Animated.timing(animated, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false
    }).start();
}