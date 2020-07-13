import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import ValidationComponent from 'react-native-form-validator';
import { Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import * as Firebase from 'firebase'
import styles from './src/login/style'

class Register extends ValidationComponent {
    constructor(props) {
        super(props);
        state = {
            email: '',
            password: '',
            PasswordAgain: ''
        }
    }

    handleEmail = (text) => {
        this.setState({ email: text })
    }
    handlePassword = (text) => {
        this.setState({ password: text })
    }
    handlePasswordAgain = (text) => {
        this.setState({ PasswordAgain: text })
    }
    AllValid = () => {
        this.validate({
            Password: { minlength: 6, maxlength: 10, required: true },
            email: { email: true },
            PasswordAgain: { minlength: 6, maxlength: 10, required: true }
        });
        var Err = this.getErrorMessages()
        if (Err != '') {
            alert(Err)
        }
        else {
            if (this.state.password != this.state.PasswordAgain)
                alert('Unmach password')
            else {
                Firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                    .catch(error => { this.props.onAuthStateChanged(false); alert(error); })
                    .then(this.props.onAuthStateChanged(true))
            }
        }

    }
    render() {
        return (
            <View style={styles.loginScreenContainer}>
                <View style={styles.loginFormView}>
                    <Text style={styles.logoText}>Register employee app</Text>
                    <TextInput placeholder="Email" placeholderColor="#c4c3cb" onChangeText={this.handleEmail} style={styles.loginFormTextInput} />
                    <TextInput placeholder="Password" placeholderColor="#c4c3cb" onChangeText={this.handlePassword} style={styles.loginFormTextInput} secureTextEntry={true} />
                    <TextInput placeholder="Password Again" placeholderColor="#c4c3cb" onChangeText={this.handlePasswordAgain} style={styles.loginFormTextInput} secureTextEntry={true} />

                    <Button
                        buttonStyle={styles.loginButton}
                        onPress={this.AllValid}
                        title="Register"
                    />
                    <Button
                        buttonStyle={styles.loginButton}
                        onPress={() => { this.props.isRegister(false) }}
                        title="Back To  Login"
                    />
                </View>
            </View>
        )
    }
}
export default Register



