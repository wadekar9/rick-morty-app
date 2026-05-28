# Rick and Morty Companion App

A high-performance React Native application for exploring characters, locations, and episodes from the Rick and Morty universe. Features include offline persistence for favorites, scroll-driven animated headers, progressive image loading, and robust offline state handling.

> **Note**: This project was created and templated using my custom [rn-awesome-boilerplate](https://github.com/wadekar9/rn-awesome-boilerplate).

## Project Setup

Follow these steps to get the project running locally.

### Prerequisites
- Node.js (>= 18.x)
- Yarn package manager
- Ruby (>= 3.2.0) - required for CocoaPods compatibility
- Xcode / Android Studio

### Installation

1. **Install JavaScript dependencies:**
   ```sh
   yarn install
   ```

2. **Install iOS Native Dependencies:**
   Make sure you are using the correct Ruby version, then run:
   ```sh
   cd ios
   bundle install
   bundle exec pod install
   cd ..
   ```

3. **Run the Application:**
   ```sh
   # For iOS
   yarn ios

   # For Android
   yarn android
   ```

## Libraries & Technologies Used

- **Core**: `react` (v19.1.0), `react-native` (v0.81.5)
- **Navigation**: `@react-navigation/native` (v7.1.18), `@react-navigation/bottom-tabs` (v7.5.0), `@react-navigation/native-stack` (v7.3.26)
- **Data Fetching**: `@tanstack/react-query` (v5.100.14) (API caching, pagination, error states)
- **State Management**: `@reduxjs/toolkit` (v2.9.2), `react-redux` (v9.2.0)
- **Offline Database**: `@op-engineering/op-sqlite` (v16.2.0) (High-performance native SQLite for favorites)
- **Animations**: React Native `Animated` API, `react-native-reanimated` (v4.3.0)
- **Networking**: `axios` (v1.13.1), `@react-native-community/netinfo` (v11.5.2)
- **UI & Media**: `@d11/react-native-fast-image` (v8.13.0), `lucide-react-native` (v1.17.0), `react-native-safe-area-context` (v5.6.1), `react-native-bootsplash` (v6.3.11)
