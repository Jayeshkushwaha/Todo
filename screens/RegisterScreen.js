import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    PermissionsAndroid,
    Image,
    Platform
} from 'react-native';

import auth from "@react-native-firebase/auth";

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import firestore from '@react-native-firebase/firestore';

const RegisterScreen = ({ navigation }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [address, setAddress] = useState("");
    const [errortext, setErrortext] = useState("");
    const [imageUri, setImageUri] = useState(null);

    const handleGalleryLaunch = () => {
        const options = {
            mediaType: 'photo',
            quality: 0.8,
            maxWidth: 1200,
            maxHeight: 1200,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled gallery picker');
            } else if (response.error) {
                setErrortext('Gallery Error: ' + response.error);
            } else if (response.assets && response.assets[0]) {
                setImageUri(response.assets[0].uri);
                setErrortext('');
            }
        });
    };

    const handleCameraLaunch = async () => {
        const hasPermission = await requestCameraPermission();
        if (!hasPermission) {
            setErrortext('Camera permission is required');
            return;
        }

        const options = {
            mediaType: 'photo',
            quality: 0.8,
            maxWidth: 1200,
            maxHeight: 1200,
            saveToPhotos: true,
        };

        launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled camera');
            } else if (response.error) {
                setErrortext('Camera Error: ' + response.error);
            } else if (response.assets && response.assets[0]) {
                setImageUri(response.assets[0].uri);
                setErrortext('');
            }
        });
    };

    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'App needs camera permission to take pictures.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        }
        return true;
    };

    const handleSubmitButton = async () => {
        setErrortext("");
    
        const nameRegex = /^[a-zA-Z]{2,30}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const addressRegex = /^[a-zA-Z0-9\s,.'-]{3,}$/;
    
        if (!imageUri) {
            setErrortext("Please select an Image");
            return;
        }
    
        if (!firstName) {
            setErrortext("Please fill First Name");
            return;
        }
        if (!nameRegex.test(firstName)) {
            setErrortext("First Name should only contain letters and be 2-30 characters long");
            return;
        }
    
        if (!lastName) {
            setErrortext("Please fill Last Name");
            return;
        }
        if (!nameRegex.test(lastName)) {
            setErrortext("Last Name should only contain letters and be 2-30 characters long");
            return;
        }
    
        if (!userEmail) {
            setErrortext("Please fill Email");
            return;
        }
        if (!emailRegex.test(userEmail)) {
            setErrortext("Please enter a valid email address");
            return;
        }
    
        if (!Password) {
            setErrortext("Please fill Password");
            return;
        }
        if (!passwordRegex.test(Password)) {
            setErrortext("Password must contain at least 8 characters, including uppercase, lowercase, number, and special character");
            return;
        }
    
        if (!confirmPassword) {
            setErrortext("Please fill Confirm Password");
            return;
        }
        if (Password !== confirmPassword) {
            setErrortext("Password and Confirm Password must match");
            return;
        }
    
        if (!address) {
            setErrortext("Please fill Address");
            return;
        }
        if (!addressRegex.test(address)) {
            setErrortext("Please enter a valid address");
            return;
        }
    
        try {
            const userCredential = await auth().createUserWithEmailAndPassword(userEmail, Password);
            const userId = userCredential.user.uid;
    
            await firestore().collection('users').doc(userId).set({
                firstName,
                lastName,
                email: userEmail,
                address,
                imageUri,
                createdAt: firestore.FieldValue.serverTimestamp(),
            });
    
            alert("Registration Successful. Please Login to proceed");
            navigation.navigate("LoginScreen");
        } catch (error) {
            console.log(error);
            if (error.code === "auth/email-already-in-use") {
                setErrortext("That email address is already in use!");
            } else {
                setErrortext(error.message);
            }
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>

                <View style={styles.imageContainer}>
                    {imageUri ? (
                        <Image source={{ uri: imageUri }} style={styles.profileImage} />
                    ) : (
                        <View style={styles.placeholderImage}>
                            <Text>No Image Selected</Text>
                        </View>
                    )}
                </View>

                <View style={styles.imageButtonsContainer}>
                    <TouchableOpacity style={styles.imageButton} onPress={handleCameraLaunch}>
                        <Text style={styles.imageButtonText}>Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.imageButton} onPress={handleGalleryLaunch}>
                        <Text style={styles.imageButtonText}>Gallery</Text>
                    </TouchableOpacity>
                </View>

                <TextInput style={styles.input} onChangeText={(text) => setFirstName(text)} placeholder="First Name" />
                <TextInput style={styles.input} onChangeText={(text) => setLastName(text)} placeholder="Last Name" />
                <TextInput style={styles.input} onChangeText={(text) => setUserEmail(text)} placeholder="Email" />
                <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} onChangeText={(text) => setPassword(text)} />
                <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry={true} onChangeText={(text) => setConfirmPassword(text)} />
                <TextInput style={styles.input} placeholder="Address" secureTextEntry={true} onChangeText={(text) => setAddress(text)} />

                {errortext != "" ? (
                    <Text style={styles.errorTextStyle}>
                        {" "}
                        {errortext}{" "}
                    </Text>
                ) : null}

                <TouchableOpacity style={styles.button} onPress={handleSubmitButton}>
                    <Text style={styles.buttonText}>REGISTER</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
        paddingBottom: 20,
        width: '100%',
        height: 200,
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    forgotPasswordButton: {
        width: '100%',
        textAlign: 'flex-end',
    },
    forgotPasswordButtonText: {
        color: '#20B2AA',
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'right'
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        padding: 20,
        marginTop: 40,
        width: '90%',
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        width: '100%',
    },
    button: {
        backgroundColor: '#20B2AA',
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    createAccountButton: {
        marginTop: 20,
    },
    createAccountButtonText: {
        color: '#20B2AA',
        fontSize: 12,
        fontWeight: 'bold',
    },
    errorTextStyle: {
        color: "red",
        textAlign: "center",
        fontSize: 14,
    },
    imageContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        overflow: 'hidden',
        marginBottom: 20,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    placeholderImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    imageButton: {
        backgroundColor: '#20B2AA',
        borderRadius: 5,
        padding: 10,
        width: '48%',
    },
    imageButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default RegisterScreen;
