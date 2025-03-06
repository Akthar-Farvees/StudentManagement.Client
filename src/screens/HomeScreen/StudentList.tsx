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
import ConfirmationModal from "@/components/HomeScreenComponents/ConfirmationModal";

const StudentList = () => {
  const [studentData, setStudentData] = useState([]);
  const navigation = useNavigation<NavigationProp>();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [modalVisible, setModalVisible] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response: AxiosResponse<Student[]> = await axios.get(
        "http://192.168.112.176:5000/api/student-course/getCoursesStudents"
      );
      if (response.status === 404) {
        return <SkeletonLoader />;
      } else {
        setStudentData(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response && error.response.status === 404) {
        return <SkeletonLoader />;
      } else {
        setErrorMessage("An error occurred while fetching data");
      }
    } finally {
      setLoading(false);
    }
  };

  const confirmDeleteStudent = (studentId: string) => {
    setStudentToDelete(studentId);
    setModalVisible(true);
  };

  const handleDeleteStudent = async () => {
    if (!studentToDelete) return;

    try {
      console.log("Deleting student:", studentToDelete);

      const response = await axios.delete(
        `http://192.168.112.176:5000/api/students/deleteStudent/${studentToDelete}`
      );
      if (response.status === 200) {
        setStudentData((prevData) =>
          prevData.filter((student) => student.StudentID !== studentToDelete)
        );
      } else {
        alert("Failed to delete the student.");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("An error occurred while deleting the student.");
    }
  };
  const handleStudentPress = (student: Student) => {
    navigation.navigate("UpdateStudentForm", {
      student,
      refreshData: fetchData,
    });
  };

  const renderItem = ({ item }: { item: Student }) => (
    <StudentItem
      student={item}
      onPress={() => handleStudentPress(item)}
      handleDelete={() => confirmDeleteStudent(item.StudentID)}
    />
  );

  useEffect(() => {
    fetchData();
  }, []);

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

        <View style={styles.confirmationModal}>
        <ConfirmationModal
          visible={modalVisible}
          onClose={() => {
            setModalVisible(false);
            setStudentToDelete(null);
          }}
          onConfirm={handleDeleteStudent}
          title="Delete Student"
          message="Are you sure you want to delete this student? This action cannot be undone."
        />
        </View>

      </View>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  confirmationModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
