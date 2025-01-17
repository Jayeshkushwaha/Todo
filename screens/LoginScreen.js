import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';

import auth from "@react-native-firebase/auth";

const LoginScreen = ({ navigation }) => {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [errortext, setErrortext] = useState("");

    const handleSubmitPress = () => {
        setErrortext("");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!userEmail) {
            setErrortext("Please fill Email");
            return;
        }
        if (!emailRegex.test(userEmail)) {
            setErrortext("Please enter a valid email address");
            return;
        }

        if (!userPassword) {
            setErrortext("Please fill Password");
            return;
        }
        if (!passwordRegex.test(userPassword)) {
            setErrortext("Password must contain at least 8 characters, including uppercase, lowercase, number and special character");
            return;
        }

        auth()
            .signInWithEmailAndPassword(userEmail, userPassword)
            .then((user) => {
                console.log(user);
                if (user) navigation.replace("Tabs");
            })
            .catch((error) => {
                console.log(error);
                if (error.code === "auth/invalid-email")
                    setErrortext(error.message);
                else if (error.code === "auth/user-not-found")
                    setErrortext("No User Found");
                else {
                    setErrortext(
                        "Please check your email id or password"
                    );
                }
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <TextInput style={styles.input} onChangeText={(UserEmail) => setUserEmail(UserEmail)} placeholder="Email" />
                <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} onChangeText={(UserPassword) => setUserPassword(UserPassword)} />

                {errortext != "" ? (
                    <Text style={styles.errorTextStyle}>
                        {" "}
                        {errortext}{" "}
                    </Text>
                ) : null}

                <TouchableOpacity style={styles.button} onPress={handleSubmitPress}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.createAccountButton} onPress={() => navigation.navigate("RegisterScreen")}>
                    <Text style={styles.createAccountButtonText}>CREATE ACCOUNT</Text>
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
});

export default LoginScreen;