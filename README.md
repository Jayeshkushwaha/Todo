# **My Movie App**

## **Project Description**
My Movie App is a React Native application designed to provide users with a seamless movie exploration experience. Users can view trending movies and manage a personalized list of favorite movies. The app includes user authentication, powered by Firebase, for secure access to personalized features.

---

## **Features**
- **User Authentication**: Login and registration with Firebase Authentication.
- **Movie Listing**: Browse trending movies from the TMDb API.
- **Favorites Management**: Add or remove movies from a personalized favorites list.
- **Interactive Tabs**: Navigation through multiple sections (e.g., Now Playing, Popular, Upcoming and Favorites).
- **Smooth Navigation**: Powered by React Navigation.

---

## **Setup Instructions**

### **Clone the Repository**
```bash
git clone https://github.com/Jayeshkushwaha/Todo.git
cd Todo
```

### **Requirements**
- **Node.js** (>= 14.x)
- **React Native CLI** or **Expo CLI**
- **Android Studio** (for Android builds) or **Xcode** (for iOS builds)
- **Firebase Account** (for authentication and Firestore setup)
- TMDb API Key (for movie data)

### **Install Dependencies**
Run the following command to install project dependencies:
```bash
npm install or
yarn install

cd ios && pod install
```

### **Firebase Setup**
1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Enable **Authentication**:
   - Go to the Authentication section and enable Email/Password provider.
3. Setup **Firestore Database**:
   - Create a Firestore database in test mode.
   - Add a collection named `favorites` and `Users` (or according to your app's logic).
4. Add Firebase Configuration:
   - Download the `google-services.json` (for Android) or `GoogleService-Info.plist` (for iOS).
   - Place these files in the respective folders:
     - `android/app/` for `google-services.json`
     - `ios/` for `GoogleService-Info.plist`

### **Run the App**
#### For Android:
```bash
npx react-native run-android or
yarn android
```
#### For iOS:
```bash
npx react-native run-ios or 
yarn ios
```

---

## **Usage**
1. **Login/Registration**:
   - Register a new account or log in with existing credentials.
2. **Browse Movies**:
   - View trending movies and detailed information.
3. **Manage Favorites**:
   - Add movies to your favorites list for quick access.
   - Remove movies from your favorites list as needed.

---

## **Tech Stack**
- **Frontend**: React Native
- **Backend**: Firebase (Authentication, Firestore)
- **API**: [The Movie Database (TMDb) API](https://www.themoviedb.org/)
- **Navigation**: React Navigation

---
