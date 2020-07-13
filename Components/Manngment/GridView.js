import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ImageBackgroundBase, ScrollView, FlatList, Modal, TouchableOpacity, Image } from 'react-native';
import EmployeeDetails from './EmployeeDetails'


class GridView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            IdToSend: 1,
            DetailsVisible: false,
            MakeRequest: false,
            CreateUser: false,
        };
    }
    componentDidMount() {
        fetch('http://dummy.restapiexample.com/api/v1/employees')
            .then((response) => response.json())
            .then((json) => {
                this.setState({ data: json.data });
            })
            .catch((error) => console.error(error))

    }
    SetMakeRequest = (value) => {
        this.setState({ MakeRequest: value });
    }
    SetIdToSend = (value) => {
        this.setState({ IdToSend: value });
    }
    SetDetailsVisible = (State) => {
        this.setState({ DetailsVisible: State });
    }
    render() {
        const { data, IdToSend, DetailsVisible, MakeRequest, CreateUser } = this.state;
        const ShowDetails = employeeID => {
            this.SetIdToSend(employeeID);
            this.SetDetailsVisible(true);
            this.SetMakeRequest(true);
        }
        return (
            <View style={{ flex: 1, paddingRight: 5, paddingTop: 30 }}>

                <View style={{ padding: 10, backgroundColor: '#00ffff', borderWidth: 1 }}>
                    <Text style={{ fontSize: 35 }}>Employee Manngment</Text>
                </View>

                <View >
                    <Button title="Add new Employee" onPress={() => { this.state.CreateUser = true; this.SetDetailsVisible(true); }} ></Button>
                    <FlatList
                        data={data}
                        keyExtractor={({ id }, index) => id}
                        renderItem={({ item }) => (

                            <TouchableOpacity onPress={() => { this.state.CreateUser = false; ShowDetails(item.id) }} style={{ padding: 20, backgroundColor: '#99bbff', borderWidth: 1 }}>

                                <Text style={{ fontSize: 20 }} >{item.employee_name}</Text>

                            </TouchableOpacity >

                        )
                        }
                    />


                    <Modal animationType="slide"
                        transparent={true}
                        visible={DetailsVisible}>
                        <EmployeeDetails id={IdToSend} MakeRequest={MakeRequest} SetVisible={this.SetDetailsVisible} CreateUser={this.state.CreateUser} />
                    </Modal>

                </View>
            </View >
        )
    }
};
export default GridView



const styles = StyleSheet.create({
    ViewPage:
    {
        padding: 10
    }

});

