import { StyleSheet } from "react-native"

const colors = {
    coffee: '#855737',
    banana: '#FCE9BC',
    deep: '#F1D0A4',
    dark: '#371B16',
    brown: '#4C2819'
}

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.brown,
        alignItems: 'center'
    },
    text: {
        fontSize: 16,
    },
})

export { colors, globalStyles }