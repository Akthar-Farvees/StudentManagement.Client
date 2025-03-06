import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

// Define your Student type
export type Student = {
  StudentID: string;
  StudentIntID: number;
  CourseID: string;
  FirstName: string;
  LastName: string;
  DOB: string;  // Date of Birth (as a string in ISO format or another format)
  Gender: string;
  Email: string;
  PhoneNumber: number;
  Address: string;
  IsActive: boolean;
  AcademicYear: number;
  CourseName: string;
  CourseDuration: number;  // In months or years, specify unit if required
  Credits: number;
  Grade: 'A' | 'B' | 'C' | 'D' | 'F';  // Correct type for Grade, it's a union type of string literals
};

// Define your navigation parameter list for your stack
export type RootStackParamList = {
  StudentList: undefined;  // No parameters expected for StudentList screen
  UpdateStudentForm: { student: Student };  // Student object passed to UpdateStudentForm
};


// Define the navigation prop type for StudentList screen
export type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'StudentList'>;
