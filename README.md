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
     - add `classpath('com.google.gms:google-services:4.4.2')` in `android/build.gradle`
     - add `apply plugin: 'com.google.gms.google-services'` , `implementation("com.google.firebase:firebase-auth")` and `implementation platform('com.google.firebase:firebase-bom:33.7.0')` in `android/app/build.gradle`
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
![Screenshot_1737096012](https://github.com/user-attachments/assets/ee0d4e5b-7c89-43ed-9cfd-4feac5dadaa9)
![Screenshot_1737096029](https://github.com/user-attachments/assets/f64cd5b3-d9c8-4a95-80dd-61f3fd567587)
![Screenshot_1737096111](https://github.com/user-attachments/assets/7a7103c4-d300-4a93-b426-4494334583ad)
![Screenshot_1737096118](https://github.com/user-attachments/assets/867eb6f0-9087-4822-b768-9b4c5f6a2906)
![Screenshot_1737096124](https://github.com/user-attachments/assets/053c05c1-3c8f-4a03-bbbe-df51902f24e8)
![Screenshot_1737096133](https://github.com/user-attachments/assets/dbe30446-7479-48d4-86cc-31cfe58d2339)
![Screenshot_1737104195-o1ygxkabsibk5jcjf86o6npthr](https://github.com/user-attachments/assets/b8983525-904c-4dde-85d2-1017aa0b0307)
