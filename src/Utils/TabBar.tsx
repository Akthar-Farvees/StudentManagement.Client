import StudentCreate from "@/screens/CreateStudentScreen/StudentCreate";
import StudentList from "@/screens/HomeScreen/StudentList";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Platform, StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();

const TabStack = () => {
  return (
    <Tab.Navigator
        id={undefined}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Create') {
            iconName = 'add-circle-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'darkblue',
        tabBarInactiveTintColor: 'gray',
        headerShown: false, // Header hidden for Tab screens, we'll manage it in Stack
        tabBarStyle: styles.tabBar,
      })}
    >
      <Tab.Screen name="Home" component={StudentList} />
      <Tab.Screen name="Create" component={StudentCreate} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    backgroundColor: 'white',
    height: 70,
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
  },
});

export default TabStack;
