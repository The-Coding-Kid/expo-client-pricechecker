//@ts-ignore
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
import LoginButton from "../../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Oswald_300Light,
  Oswald_400Regular,
  Oswald_500Medium,
  Oswald_600SemiBold,
  Oswald_700Bold,
} from "@expo-google-fonts/oswald";

// Login Schema Yup(Formik)
const LoginSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

//AsyncStorage Functions
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

//--------------------------
//--------------------------
//--------------------------
//Login Form
//@ts-ignore
const LoginForm: React.FC<any> = ({ navigation }) => {
  //Fonts
  let [fontsLoaded] = useFonts({
    Oswald_300Light,
    Oswald_400Regular,
    Oswald_500Medium,
    Oswald_600SemiBold,
    Oswald_700Bold,
  });

  //Hooks, State, Events
  const [error, setError] = useState<Number>();

  useEffect(() => {
    const token = getData("token");
    const userData = getData("userData");
    //@ts-ignore
    if (token) {
      navigation.navigate("Main");
    } else {
      navigation.navigate("Login");
    }
  }, []);

  const handleSubmit = (values: any): void => {
    axios
      .post("http://192.168.86.20:5001/login", {
        username: values.username,
        password: values.password,
      })
      .then(async (response: any) => {
        await storeData("token", response.data.token);
        await storeData("userData", JSON.stringify(response.data.result));
        navigation.navigate("Main");
      })
      .catch((err: any) => {
        setError(err.response.status);
        navigation.navigate("Login");
      });
  };
  const handlePress = () => {
    navigation.navigate("Register");
  };

  if (!fontsLoaded) {
    //@ts-ignore
    return <AppLoading />;
  } else {
    if (error === 400) {
      return (
        <View style={styles.container}>
          <Text style={styles.loginErrorText}>
            Invalid username or password
          </Text>
          <Formik
            initialValues={{ email: "", username: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={(values, actions) => {
              actions.resetForm({});
              handleSubmit(values);
            }}
          >
            {(props: any) => (
              <View>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter Username"
                  onChangeText={props.handleChange("username")}
                  // @ts-ignore
                  value={props.touched.username && props.values.username}
                  onBlur={props.handleBlur("username")}
                  autoCompleteType="username"
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
          <Text style={styles.loginErrorText}>
            Invalid Username or Password
          </Text>
          <Formik
            initialValues={{ email: "", username: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={(values, actions) => {
              actions.resetForm({});
              handleSubmit(values);
            }}
          >
            {(props: {
              handleChange: (arg0: string) => any;
              touched: { username: any };
              values: { username: any; password: any };
              handleBlur: (arg0: string) => any;
              errors: { username: any; password: any };
              handleSubmit: any;
            }) => (
              <View>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter Username"
                  onChangeText={props.handleChange("username")}
                  // @ts-ignore
                  value={props.touched.username && props.values.username}
                  onBlur={props.handleBlur("username")}
                  autoCompleteType="username"
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
            {(props: {
              handleChange: (arg0: string) => any;
              touched: { username: any };
              values: { username: any; password: any };
              handleBlur: (arg0: string) => any;
              errors: { username: any; password: any };
              handleSubmit: any;
            }) => (
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
    fontFamily: "Oswald_700Bold",
  },
  loginErrorText: {
    color: "crimson",
    fontWeight: "bold",
    fontFamily: "Oswald_700Bold",
  },
});

export default LoginForm;
