import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StudentItem from "@/components/HomeScreenComponents/StudentItemComponent";
import SkeletonLoader from "@/components/HomeScreenComponents/SkeletonLoader";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp, Student } from "@/constants/types";
import axios, { AxiosResponse } from "axios";

const StudentList = () => {
  const [studentData, setStudentData] = useState([]);
  const navigation = useNavigation<NavigationProp>();
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<Student[]> = await axios.get(
          "http://192.168.112.176:5000/api/student-course/getCoursesStudents"
        );
        setStudentData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleStudentPress = (student: Student) => {
    navigation.navigate("UpdateStudentForm", { student  });
  };

  const renderItem = ({ item }: { item: Student }) => (
    <StudentItem student={item} onPress={() => handleStudentPress(item)} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#f5f5f7" />

        <View style={styles.header}>
          <Text style={styles.headerTitle}>Student Directory</Text>
          <Text style={styles.headerSubtitle}>
            {loading ? "Loading students..." : `${studentData.length} students`}
          </Text>
        </View>

        {loading ? (
          <SkeletonLoader />
        ) : (
          <FlatList
            data={studentData}
            keyExtractor={(item) => item.StudentID}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f7",
    paddingTop: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 6,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#666",
  },
  listContainer: {
    padding: 12,
    paddingBottom: 30,
  },
});

export default StudentList;
