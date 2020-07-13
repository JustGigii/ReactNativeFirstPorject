import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ImageBackgroundBase, ScrollView, FlatList, Modal, Image } from 'react-native';

class EmployeeDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            ShowVisible: true,
            IsEditMode: false,
            id: 0,
            employee_name: '',
            employee_salary: '',
            employee_age: '',
        };
        if (!this.props.CreateUser)
            this.SetData(this.props.id)

    }
    handleemployee_age = (text) => {
        this.setState({ employee_age: text })
    }
    handleemployee_name = (text) => {
        this.setState({ employee_name: text })
    }
    handleemployee_salary = (text) => {
        this.setState({ employee_salary: text })
    }
    UpdateUser = (employee_age, employee_name, employee_salary, id) => {

        fetch('http://dummy.restapiexample.com/api/v1/update/' + String(id), {
            method: 'POST',
            body: JSON.stringify({
                name: employee_name,
                salary: employee_salary,
                age: employee_age,
                id: id
            })
        }).then((response) => response.json())
            .then((json) => {
                alert(json.status)
            })
            .catch((err) => { alert(err.message) });

    }
    CreateEploee = (employee_age, employee_name, employee_salary, id) => {

        fetch('	http://dummy.restapiexample.com/api/v1/create', {
            method: 'POST',
            body: JSON.stringify({
                name: employee_name,
                salary: employee_salary,
                age: employee_age,
            })
        }).then((response) => response.json())
            .then((json) => {
                alert(json.data.id)
            })
            .catch((err) => { alert(err.message) });

    }
    DeleteUser = (id) => {
        if (this.props.MakeRequest) {
            var Url = 'http://dummy.restapiexample.com/api/v1/employee/' + String(id)
            fetch(Url)
                .then((response) => response.json())
                .then((json) => {
                    alert(json.message)
                })
                .catch((err) => { alert(err.message) })

            this.props.MakeRequest = false;
        }
    }
    SetData(Value) {
        if (this.props.MakeRequest) {
            var Url = 'http://dummy.restapiexample.com/api/v1/employee/' + String(Value)
            fetch(Url)
                .then((response) => response.json())
                .then((json) => {
                    this.setState({ data: json.data });
                    this.setState({ id: json.data.id });
                    this.setState({ employee_name: json.data.employee_name });
                    this.setState({ employee_salary: json.data.employee_salary });
                    this.setState({ employee_age: json.data.employee_age });
                })
                .catch((err) => { this.props.SetVisible(false); alert(err.message); })

            this.props.MakeRequest = false;
        }
    }
    SetShowVisible = (State) => {
        this.setState({ ShowVisible: State });
    }
    render() {

        const { data, ShowVisible, IsEditMode, employee_name: Fname, employee_salary: lname, employee_age: email } = this.state;
        if (!IsEditMode && !this.props.CreateUser) {
            return (
                <View style={{ paddingRight: 50, paddingTop: 30, backgroundColor: "#85e0e0", }}>
                    <View style={{ padding: 20 }} >
                        <Text style={{ fontSize: 20, padding: 20 }} > id: {this.state.data.id}</Text>
                        <Text style={{ fontSize: 20, padding: 20 }} > employee name: {this.state.data.employee_name}</Text>
                        <Text style={{ fontSize: 20, padding: 20 }}> employee salary: {this.state.data.employee_salary} </Text>
                        <Text style={{ fontSize: 20, padding: 20 }}> employee age:  {this.state.data.employee_age}</Text>
                        <Image source={{ uri: this.state.data.avatar }} />
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Button title="Edit" onPress={() => { { this.setState({ IsEditMode: true }) } }}></Button>
                        <Button title="Delte" onPress={this.DeleteUser(this.state.id)}></Button>
                        <Button title="Cencel" onPress={() => { if (this.state.EditVisible) this.SetEditVisible(false); else this.props.SetVisible(false) }}></Button>
                    </View>
                </View >
            );
        }
        if (IsEditMode) {
            return (
                <View style={{ paddingRight: 50, paddingTop: 30, backgroundColor: "#85e0e0", }}>
                    <View>
                        <Text style={{ fontSize: 20, padding: 20 }}>Edit Mode</Text>
                    </View>
                    <View style={{ padding: 20 }} >
                        <Text style={{ fontSize: 20, padding: 20 }} > id = {this.state.data.id}</Text>
                        <TextInput style={{ fontSize: 20, padding: 20, borderBottomWidth: 1 }} placeholder="employee employee name" value={this.state.employee_name} onChangeText={this.handleemployee_name}></TextInput>
                        <TextInput style={{ fontSize: 20, padding: 20, borderBottomWidth: 1 }} placeholder="employee employee salary" value={this.state.employee_salary} onChangeText={this.handleemployee_salary}></TextInput>
                        <TextInput style={{ fontSize: 20, padding: 20, borderBottomWidth: 1 }} placeholder="employee employee age" value={this.state.employee_age} onChangeText={this.handleemployee_age}></TextInput>
                        <Image source={{ uri: this.state.data.avatar }} />
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Button title="Submit" onPress={() => { this.UpdateUser(this.state.employee_age, this.state.employee_name, this.state.employee_salary, this.state.id) }}></Button>
                        <Button title="Cencel" onPress={() => { this.setState({ IsEditMode: false }) }}></Button>
                    </View>
                </View >
            );
        }
        if (this.props.CreateUser) {
            return (
                <View style={{ paddingRight: 50, paddingTop: 30, backgroundColor: "#85e0e0", }}>
                    <View>
                        <Text style={{ fontSize: 20, padding: 20 }}>Create Mode</Text>
                    </View>
                    <View style={{ padding: 20 }} >
                        <TextInput style={{ fontSize: 20, padding: 20, borderBottomWidth: 1 }} placeholder="employee name" value={this.state.employee_name} onChangeText={this.handleemployee_name}></TextInput>
                        <TextInput style={{ fontSize: 20, padding: 20, borderBottomWidth: 1 }} placeholder="employee employee salary" value={this.state.employee_salary} onChangeText={this.handleemployee_salary}></TextInput>
                        <TextInput style={{ fontSize: 20, padding: 20, borderBottomWidth: 1 }} placeholder="employee employee age" value={this.state.employee_age} onChangeText={this.handleemployee_age}></TextInput>
                        <Image source={{ uri: this.state.data.avatar }} />
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Button title="Submit" onPress={() => { this.CreateEploee(this.state.employee_age, this.state.employee_name, this.state.employee_salary, this.state.id); this.props.SetVisible(false) }}></Button>
                        <Button title="Cencel" onPress={() => { this.props.CreateUser = false; this.props.SetVisible(false) }}></Button>
                    </View>
                </View >
            )
        }
    }
}
export default EmployeeDetails


const styles = StyleSheet.create({
    ButtonVr:
    {
        width: 100
    }

});

