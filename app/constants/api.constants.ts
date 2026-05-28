import Config from "react-native-config"

export const API_ROUTES = {
    CHARACTERS: '/character',
    LOCATIONS: '/location',
    EPISODES: '/episode',
} as const;

export const API_URL = Config.BASE_URL;