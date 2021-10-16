import React, { useState, useEffect } from "react";
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
import * as yup from "yup";
import LoginButton from "./LoginButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};

const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return;
    }
  } catch (e) {
    console.error(e);
  }
};

const LoginForm: React.FC<any> = ({ navigation }) => {
  const [error, setError] = useState<Number>();

  useEffect(() => {
    const token = getData("token");
    const userData = getData("userData");
    //@ts-ignore
    if (token) {
      navigation.navigate("Home");
    } else {
      navigation.navigate("Login");
    }
  }, []);

  const handleSubmit = (values: any): void => {
    axios
      .post("http://192.168.86.162:5000/login", {
        username: values.username,
        password: values.password,
      })
      .then(async (response: any) => {
        await storeData("token", response.data.token);
        await storeData("userData", JSON.stringify(response.data.result));
        navigation.navigate("Home");
      })
      .catch((err: any) => {
        setError(err.response.status);
        navigation.navigate("Login");
      });
  };
  const handlePress = () => {
    navigation.navigate("Register");
  };

  if (error === 400) {
    return (
      <View style={styles.container}>
        <Text style={styles.loginErrorText}>Invalid username or password</Text>
        <Formik
          initialValues={{ email: "", username: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={(values, actions) => {
            actions.resetForm({});
            handleSubmit(values);
          }}
        >
          {(props) => (
            <View>
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
              <LoginButton onPress={props.handleSubmit} text="Log In" />
            </View>
          )}
        </Formik>
        <View style={{ paddingTop: 30 }}>
          <TouchableOpacity onPress={handlePress}>
            <Text style={{ color: "blue" }}>
              Don't Have an Account? Register Now!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  if (error === 404) {
    return (
      <View style={styles.container}>
        <Text style={styles.loginErrorText}>Please Register First</Text>
        <Formik
          initialValues={{ email: "", username: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={(values, actions) => {
            actions.resetForm({});
            handleSubmit(values);
          }}
        >
          {(props) => (
            <View>
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
              <LoginButton onPress={props.handleSubmit} text="Log In" />
            </View>
          )}
        </Formik>
        <View style={{ paddingTop: 30 }}>
          <TouchableOpacity onPress={handlePress}>
            <Text style={{ color: "blue" }}>
              Don't Have an Account? Register Now!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Formik
          initialValues={{ email: "", username: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={(values, actions) => {
            actions.resetForm({});
            handleSubmit(values);
          }}
        >
          {(props) => (
            <View>
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
              <LoginButton onPress={props.handleSubmit} text="Log In" />
            </View>
          )}
        </Formik>
        <View style={{ paddingTop: 30 }}>
          <TouchableOpacity onPress={handlePress}>
            <Text style={{ color: "blue" }}>
              Don't Have an Account? Register Now!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
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
  loginErrorText: {
    color: "crimson",
    fontWeight: "bold",
  },
});

export default LoginForm;
