import DatePickerField from "@/components/HomeScreenComponents/DatePickerComponent";
import { Student } from "@/constants/types";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const grades = [
  { label: "A", value: "A" },
  { label: "B", value: "B" },
  { label: "C", value: "C" },
  { label: "D", value: "D" },
  { label: "F", value: "F" },
];

const genders = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];



const StudentCreate = () => {
const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Student>();
  const [openCourse, setOpenCourse] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseItems, setCourseItems] = useState([]);

  const [openGrade, setOpenGrade] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [gradeItems, setGradeItems] = useState([]);

  const [openGender, setOpenGender] = useState(false);
  const [selectedGender, setSelectedGender] = useState(null);
  const [genderItems, setGenderItems] = useState([]);

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
          label: grade.label,
          value: grade.label,
        }));
        setGradeItems(formattedGrade);

        const formattedGender = genders.map((gender) => ({
          label: gender.label,
          value: gender.label,
        }));
        setGenderItems(formattedGender);
      })
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  useEffect(() => {
    fetch("http://192.168.112.176:5000/api/courses/getCourses")
      .then((response) => response.json())
      .then((data) => {
        setCourseItems(data.map((course) => ({ label: course.CourseName, value: course.CourseName })));
      })
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  const onSubmit = async (data) => {
    try {
      if (!selectedCourse || !selectedGrade || !selectedGender) {
        alert("Please select Course, Grade, and Gender");
        return;
      }
  
      const payload = {
        firstName: data.FirstName,
        lastName: data.LastName,
        dob: data.DOB,
        grade: selectedGrade,
        gender: selectedGender,
        courseName: selectedCourse,
        courseDuration: data.CourseDuration,
      };
  
      const response = await fetch("http://192.168.112.176:5000/api/students/insertStudent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert("Student created successfully!");
        navigation.navigate("Home");
      } else {
        alert("Failed to create student: " + result.error);
      }
    } catch (error) {
      console.error("API error:", error);
      alert("Something went wrong!");
    }
  };
  

  return (
    //   <ScrollView style={styles.scrollView} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Create Student</Text>
          <Text style={styles.label}>First Name</Text>
          <Controller control={control} name="FirstName" rules={{ required: "First name is required" }}
            render={({ field: { onChange, value } }) => (
              <TextInput style={styles.input} value={value} onChangeText={onChange} />
            )}
          />
          {errors.FirstName && <Text style={styles.errorText}>{errors.FirstName.message}</Text>}

          <Text style={styles.label}>Last Name</Text>
          <Controller control={control} name="LastName" rules={{ required: "Last name is required" }}
            render={({ field: { onChange, value } }) => (
              <TextInput style={styles.input} value={value} onChangeText={onChange} />
            )}
          />
          {errors.LastName && <Text style={styles.errorText}>{errors.LastName.message}</Text>}

            <View style={styles.datePicker}>
            <DatePickerField  control={control} name="DOB" label="Date of Birth" placeholder="Select birth date" />

            </View>

          <Text style={styles.label}>Grade</Text>
          <View >
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
          </View>

          <Text style={styles.label}>Gender</Text>
          <View>
          <DropDownPicker
          open={openGender}
          value={selectedGender}
          items={genderItems}
          setOpen={setOpenGender}
          setValue={setSelectedGender}
          setItems={setGenderItems}
          placeholder="Select a Course"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
          dropDownDirection="BOTTOM"
          modalAnimationType="slide"
        />
          </View>

          <Text style={styles.label}>Course Duration</Text>
          <Controller
            control={control}
            name="CourseDuration"
            rules={{ required: "Course Duration is required" }}
            render={({ field: { onChange, value } }) => (
                <TextInput
                style={styles.input}
                value={value ? String(value) : ""}
                onChangeText={onChange}
                keyboardType="numeric" 
                />
            )}
            />

          {errors.CourseDuration && <Text style={styles.errorText}>{errors.CourseDuration.message}</Text>}

          <Text style={styles.label}>Course</Text>
          <View>
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
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
    //   </ScrollView>
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
    marginTop: 20,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  dropdown: { marginTop: 3, borderColor: "#ccc", zIndex: 1000, elevation: 1 , marginBottom: 18,},
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
  scrollView: {
    flex: 1, // Ensure the scroll view takes full height
    marginBottom: 100
  },
  datePicker: {
    marginTop: -18
  }
});

export default StudentCreate;
