import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import DropDownPicker from "react-native-dropdown-picker";
import DatePickerField from "@/components/HomeScreenComponents/DatePickerComponent";
import { MotiView } from "moti";
import { FormValues } from "@/constants/types";

const grades = [
  {
    id: 1,
    grade: "A",
  },
  {
    id: 2,
    grade: "B",
  },
  {
    id: 3,
    grade: "C",
  },
  {
    id: 4,
    grade: "D",
  },
  {
    id: 5,
    grade: "F",
  },
];

const EditScreen = ({ route, navigation }) => {
  const { studentRefreshData, refreshData } = route.params;
  const { itemId, setData } = route.params;
  const { student } = route.params;

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();
  const [loading, setLoading] = useState(true);
  const [openCourse, setOpenCourse] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseItems, setCourseItems] = useState([]);

  const [openGrade, setOpenGrade] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [gradeItems, setGradeItems] = useState([]);

  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Fetch course data from API
    fetch("http://192.168.112.176:5000/api/courses/getCourses")
      .then((response) => response.json())
      .then((data) => {
        // Transform API data into dropdown format
        const formattedCourses = data.map((course) => ({
          label: course.CourseName,
          value: course.CourseName,
        }));
        setCourseItems(formattedCourses);

        const formattedGrade = grades.map((grade) => ({
          label: grade.grade,
          value: grade.grade,
        }));
        setGradeItems(formattedGrade);
      })
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  useEffect(() => {
    console.log(student.StudentID);

    const fetchItem = async () => {
      try {
        const response = await axios.get(
          `http://192.168.112.176:5000/api/students/getDetailsByStudent/${student.StudentID}`
        );
        console.log(response.data[0].DOB);
        const studentResponseData = response.data[0];

        if (studentResponseData.DOB) {
          setValue("DOB", new Date(studentResponseData.DOB));
        }

        setValue("FirstName", studentResponseData.FirstName);
        setValue("LastName", studentResponseData.LastName);
        setSelectedGrade(studentResponseData.Grade);
        setSelectedCourse(studentResponseData.CourseName);
        // setValue("DOB", studentResponseData.DOB);
      } catch (error) {
        console.error("Error fetching item:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [itemId]);

  const onUpdate = async (updatedData) => {
    try {
      const dataToSend = {
        newCourseName: selectedCourse,
        studentDetails: {
          firstName: updatedData.FirstName,
          lastName: updatedData.LastName,
          dob: updatedData.DOB,
          grade: selectedGrade,
        },
      };
      const studentId = String(student.StudentID).trim();
      console.log("Final Student Id:", studentId);

      console.log(dataToSend);
      await axios.put(
        `http://192.168.112.176:5000/api/students/updateStudentCourse/${studentId}`,
        dataToSend
      );

      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);

        refreshData();
        navigation.goBack();
      }, 1000);
    } catch (error) {
      console.error("Error updating student data:", error);
      Alert.alert("Error", "Failed to update student details.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#333" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {showSuccess && (
        <MotiView
          from={{ translateY: 100, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ type: "timing", duration: 500 }}
          style={{
            position: "absolute",
            left: 20,
            right: 20,
            backgroundColor: "green",
            padding: 15,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 100,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Student details updated successfully!
          </Text>
        </MotiView>
      )}

      <Text style={styles.title}>Edit User</Text>

      <Text style={styles.label}>First Name</Text>
      <Controller
        control={control}
        name="FirstName"
        rules={{ required: "First name is required" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.FirstName?.message && (
        <Text style={styles.errorText}>*{errors.FirstName.message}</Text>
      )}

      <Text style={styles.label}>Email</Text>
      <Controller
        control={control}
        name="LastName"
        rules={{ required: "Last name is required" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      {errors.LastName?.message && (
        <Text style={styles.errorText}>*{errors.LastName?.message}</Text>
      )}

      <Text style={styles.label}>Select Course</Text>
      <DropDownPicker
        open={openCourse}
        value={selectedCourse}
        items={courseItems}
        setOpen={setOpenCourse}
        setValue={setSelectedCourse}
        setItems={setCourseItems}
        placeholder="Select a Course"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        dropDownDirection="BOTTOM"
        modalAnimationType="slide"
      />

      <DatePickerField
        control={control}
        name="DOB"
        label="Select Date of Birth"
        placeholder="Select birth date"
      />

      <Text style={styles.label}>Select Grade</Text>
      <DropDownPicker
        open={openGrade}
        value={selectedGrade}
        items={gradeItems}
        setOpen={setOpenGrade}
        setValue={setSelectedGrade}
        setItems={setGradeItems}
        placeholder="Select a Grade"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        dropDownDirection="BOTTOM"
        modalAnimationType="slide"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onUpdate)}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: "green",
    color: "white",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 45,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  dropdown: { marginTop: 5, borderColor: "#ccc", zIndex: 1000, elevation: 1 },
  dropdownContainer: {
    borderColor: "#ccc",
    zIndex: 1001,
    elevation: 3,
    position: "absolute",
  },
  dropdownContainers: {
    borderColor: "#ccc",
    zIndex: 1001,
    elevation: 3,
    position: "absolute",
  },

  // Error Text
  errorText: {
    color: "red",
    marginBottom: 15,
    marginTop: -10,
  },
});

export default EditScreen;
