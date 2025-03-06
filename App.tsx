import { SafeAreaView, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import EditScreen from "@/screens/UpdateStudentScreen/UpdateStudent";
import { NavigationContainer } from "@react-navigation/native";
import TabStack from "@/Utils/TabBar";
import StudentCreate from "@/screens/CreateStudentScreen/StudentCreate"; // Keep Create here

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator id={undefined} initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={TabStack}
            options={{ headerTitle: "Home" }} 
          />
          <Stack.Screen
            name="Create"
            component={StudentCreate}
            options={{ headerTitle: "Create Student" }}
          />
          <Stack.Screen
            name="UpdateStudentForm"
            component={EditScreen}
            options={{ headerTitle: "Update Student" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default App;
