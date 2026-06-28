import React from "react";
import { StyleSheet, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import Map from "../components/Map";
import { createStackNavigator } from "@react-navigation/stack";
import NavigateCard from "./NavigateCard";
import RideOptionsCard from "./RideOptionsCard";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements/dist/icons/Icon";

const MapScreen = () => {
  const Stack = createStackNavigator();
  const navigation = useNavigation();

  return (
    <View>
      <View style={tw`h-1/2`}>
        <Map />
        <TouchableOpacity
          onPress={() => navigation.navigate("HomeScreen")}
          //style={tw`bg-red-800  top-16 left-8 z-50 p-3 w-16 rounded-full shadow-lg`}
          style={tw`bg-red-800  z-50 h-16 w-16 rounded-full shadow-lg`}
        >
          <Icon name="menu" />
        </TouchableOpacity>
      </View>
      <View style={tw`h-1/2`}>
        <Stack.Navigator>
          <Stack.Screen
            name="NavigateCard"
            component={NavigateCard}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="RideOptionsCard"
            component={RideOptionsCard}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({});
