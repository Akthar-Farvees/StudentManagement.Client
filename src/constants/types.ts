import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

export type Student = {
  StudentID: string;
  StudentIntID: number;
  CourseID: string;
  FirstName: string;
  LastName: string;
  DOB: string;  
  Gender: string;
  Email: string;
  PhoneNumber: number;
  Address: string;
  IsActive: boolean;
  AcademicYear: number;
  CourseName: string;
  CourseDuration: number;  
  Credits: number;
  Grade: 'A' | 'B' | 'C' | 'D' | 'F';  
};

export type RootStackParamList = {
  StudentList: undefined;
  UpdateStudentForm: {
    student: Student;
    refreshData: () => void;
  };
};


export type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'StudentList'>;


export type FormValues = {
  FirstName: string;
  LastName: string;
};
