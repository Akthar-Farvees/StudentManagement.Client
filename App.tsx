
import StudentList from '@/screens/HomeScreen/StudentList';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import UpdateStudentForm from '@/screens/UpdateStudentScreen/UpdateStudent';
import { createStackNavigator } from '@react-navigation/stack';
import EditStudentScreen from '@/screens/UpdateStudentScreen/UpdateStudent';
import EditScreen from '@/screens/UpdateStudentScreen/UpdateStudent';


const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" id={undefined}>
        <Stack.Screen name="Home" component={StudentList} />
        <Stack.Screen name="UpdateStudentForm" component={EditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}