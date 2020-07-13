import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import ValidationComponent from 'react-native-form-validator';
import * as Firebase from 'firebase'
import styles from "./src/login/style";
import Register from "./Register"
import { Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import * as Google from 'expo-google-app-auth';

class Login extends ValidationComponent {
    constructor(props) {
        super(props);
        state = {
            email: '',
            password: '',
            isRegister: false,
        }
    }
    signInWithGoogleAsync = async () => {
        try {
            //behavion: 'web',
            const result = await Google.logInAsync({ behavion: 'web', androidClientId: "952617990179-qnf5lee491clqtnfic6u848ro4dr9muo.apps.googleusercontent.com", iosClientId: "952617990179-is5luql9mfqis3eq0cb4dk88glsj12gg.apps.googleusercontent.com", scopes: ["profile", "email"] });
            if (result.type === "success") { // I get result object
                const credential = Firebase.auth.GoogleAuthProvider.credential(result.idToken, result.accessToken);
                /* credential is and xf {} object */
                try {
                    Firebase.auth().signInWithCredential(credential).then(user => { console.log(user); }).catch(error => { alert(error); });
                    this.props.onAuthStateChanged(true)
                    return result.accessToken;
                }
                catch (err) {
                    alert(err.message)
                }

            }
            return { cancelled: true };
        } catch (e) {
            return { error: true };
        }
    };
    handleEmail = (text) => {
        this.setState({ email: text })
    }
    handlePassword = (text) => {
        this.setState({ password: text })
    }
    handleisRegister = (Value) => {
        this.setState({ isRegister: Value })
    }
    AllValid = () => {
        this.validate({
            Password: { minlength: 6, maxlength: 8, required: true },
            email: { email: true },
        });

        var Err = this.getErrorMessages()
        if (Err != '') {
            alert(Err)

        }
        else {
            Firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
                .catch(error => { this.props.onAuthStateChanged(false); alert(error); })
                .then(this.props.onAuthStateChanged(true));
        }
    }
    render() {
        if (!this.state.isRegister)
            return (
                <View style={styles.loginScreenContainer}>
                    <View style={styles.loginFormView}>
                        <Text style={styles.logoText}>employee app</Text>
                        <TextInput placeholder="Email" placeholderColor="#c4c3cb" onChangeText={this.handleEmail} style={styles.loginFormTextInput} />
                        <TextInput placeholder="Password" placeholderColor="#c4c3cb" onChangeText={this.handlePassword} style={styles.loginFormTextInput} secureTextEntry={true} />

                        <Button
                            buttonStyle={styles.loginButton}
                            onPress={this.AllValid}
                            title="Login"
                        />
                        <Button
                            buttonStyle={styles.loginButton}
                            onPress={this.signInWithGoogleAsync}
                            title="Login with Google"
                            color="#3897f1"
                        />
                        <Button
                            buttonStyle={styles.loginButton}
                            onPress={() => { this.setState({ isRegister: true }) }}
                            title="Register"
                            color="#3897f1"
                        />

                    </View>

                </View>
            )
        else
            return (
                <View style={styles.loginFormView} >
                    <Register onAuthStateChanged={this.props.onAuthStateChanged} isRegister={this.handleisRegister} />

                </View>
            )
    }
}
export default Login



