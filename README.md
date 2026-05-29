# Rick and Morty Companion App

A React Native application for exploring characters, locations, and episodes from the Rick and Morty universe.

> This project was bootstrapped using my custom React Native starter:
> https://github.com/wadekar9/rn-awesome-boilerplate

---

# Demo & Deliverables

## GitHub Repository

https://github.com/wadekar9/rick-morty-app

## Android APK

https://limewire.com/d/3iXsV#5aOuGJeqkA

---

# Features

## Character Listing

* Infinite scroll pagination
* Debounced search (300ms)
* Filter by status and gender
* Progressive image loading
* Skeleton loaders
* Error & empty states

## Character Details

* Full character information
* Episode appearances
* Favourite toggle
* Shared element-like transition animations

## Episodes

* Paginated episode listing
* Grouped by season
* Lazy-loaded character avatars

## Locations

* Browse all locations
* View residents for each location

## Favourites (Offline)

* Stored locally using SQLite
* Works without internet connection
* Persistent across app restarts

---

# Tech Stack

## Core

* React 19.1.0
* React Native 0.81.5
* TypeScript

## Navigation

* @react-navigation/native
* @react-navigation/bottom-tabs
* @react-navigation/native-stack

## State Management

* @reduxjs/toolkit
* react-redux

## Data Fetching

* @tanstack/react-query
* axios

## Offline Storage

* @op-engineering/op-sqlite

## Animations

* React Native Animated API
* react-native-reanimated

## Networking & Utilities

* @react-native-community/netinfo

## UI & Media

* @d11/react-native-fast-image
* lucide-react-native
* react-native-safe-area-context
* react-native-bootsplash

---

# Project Structure

```txt
src/
├── api/
├── components/
├── hooks/
├── navigation/
├── services/
├── store/
├── types/
├── utils/
└── features/
    ├── characters/
    ├── episodes/
    ├── locations/
    └── favourites/
```

---

# Project Setup

## Prerequisites

* Node.js >= 18.x
* Yarn
* Ruby >= 3.2.0
* Xcode
* Android Studio

---

## Installation

### 1. Install JavaScript Dependencies

```sh
yarn install
```

### 2. Install iOS Dependencies

```sh
cd ios
bundle install
bundle exec pod install
cd ..
```

### 3. Run the Application

#### Android

```sh
yarn android
```

#### iOS

```sh
yarn ios
```

---

# Offline Support

The application gracefully handles offline scenarios:

* Favourite characters remain accessible offline
* Network state detection using NetInfo
* Retry mechanisms for failed requests
* Proper empty and error state handling

---

# New Architecture

This project uses React Native's New Architecture:

* Fabric Renderer
* TurboModules

Enabled via:

```properties
newArchEnabled=true
```

---

# API Reference

Rick and Morty Public API:
https://rickandmortyapi.com/api

---

# Author

Developed by:
https://github.com/wadekar9
