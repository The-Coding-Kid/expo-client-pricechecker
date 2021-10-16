import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import { Formik } from "formik";
var axios = require("axios");
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as yup from "yup";
import RegisterButton from "./RegisterButton";
import * as SecureStore from "expo-secure-store";
import { AxiosResponse } from "axios";

const RegisterSchema = yup.object({
  email: yup.string().email().required().min(4),
  username: yup.string().required().min(4),
  password: yup.string().required().min(8),
});

const RegisterForm: React.FC<any> = ({ navigation }) => {
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState({});

  const handleSubmit = (values: any) => {
    axios
      .post("http://192.168.86.162:5000/register", {
        email: values.email,
        username: values.username,
        password: values.password,
      })
      .then((response: any) => {});
    navigation.navigate("Login");
  };

  const handlePress = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        validationSchema={RegisterSchema}
        onSubmit={(values, actions) => {
          actions.resetForm({});
          handleSubmit(values);
        }}
      >
        {(props) => (
          <View>
            <TextInput
              style={styles.textInput}
              placeholder="Enter Email"
              onChangeText={props.handleChange("email")}
              value={props.values.email}
              keyboardType="email-address"
              onBlur={props.handleBlur("email")}
            />
            <Text style={styles.errorText}>
              {props.touched.email && props.errors.email}
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter Username"
              onChangeText={props.handleChange("username")}
              // @ts-ignore
              value={props.touched.username && props.values.username}
              onBlur={props.handleBlur("username")}
            />
            <Text style={styles.errorText}>{props.errors.username}</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter Password"
              onChangeText={props.handleChange("password")}
              value={props.values.password}
              secureTextEntry={true}
              onBlur={props.handleBlur("password")}
            />
            <Text style={styles.errorText}>
              {props.touched.username && props.errors.password}
            </Text>
            {/* @ts-ignore */}
            <RegisterButton onPress={props.handleSubmit} text="Register" />
          </View>
        )}
      </Formik>
      <View style={{ paddingTop: 30 }}>
        <TouchableOpacity onPress={handlePress}>
          <Text style={{ color: "blue" }}>
            Already Have an Account? Log In!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 50,
  },
  textInput: {
    borderColor: "black",
    borderWidth: 1,
    width: 200,
    marginTop: 30,
    height: 45,
  },
  errorText: {
    color: "crimson",
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 6,
    textAlign: "center",
  },
});

export default RegisterForm;
