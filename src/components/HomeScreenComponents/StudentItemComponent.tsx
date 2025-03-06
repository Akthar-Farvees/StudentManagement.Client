import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import { MotiView } from "moti";
import { Easing } from "react-native-reanimated";
import { Student } from "@/constants/types";
import Icon from 'react-native-vector-icons/MaterialIcons';


const MoView = MotiView;

const StudentItem = ({ student, onPress, handleDelete }: { student: Student; onPress: () => void; handleDelete: () => void;  }) => {

  const calculateAge = (dob: string): number => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    return age;
  };

  const age = calculateAge(student.DOB);


  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.cardPressable, pressed && styles.cardPressed]}>
          <MoView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        type: "timing",
        duration: 500,
        easing: Easing.out(Easing.ease),
      }}
      style={styles.card}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.name}>
          {student.FirstName} {student.LastName}
        </Text>
        <View
          style={[
            styles.statusIndicator,
            { backgroundColor: student.IsActive ? "#4CAF50" : "#9E9E9E" },
          ]}
        />
      </View>
      <View style={styles.parentDetailsRow}>
        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Age</Text>
            <Text style={styles.detailValue}>{age}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Grade</Text>
            <Text style={styles.detailValue}>{student.Grade}</Text>
          </View>
        </View>

        <View style={styles.academicYearContainer}>
          <Text style={styles.academicYear}>{student.CourseName}</Text>
        </View>

      </View>

      <View style={styles.courseDurationContainer}>
          <Text style={styles.courseDuration}>Duration: {student.CourseDuration} Months</Text>
          <TouchableOpacity onPress={handleDelete} style={styles.studentDelete}>
            <Icon name="delete" size={26} color="red" />
          </TouchableOpacity>
      </View>
    </MoView>
    </Pressable>

  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  statusIndicator: {
    width: 9,
    height: 9,
    borderRadius: 6,
  },
  detailsRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  detailItem: {
    marginRight: 24,
  },
  detailLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  academicYearContainer: {
    backgroundColor: "#f0f0f5",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  parentDetailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  academicYear: {
    fontSize: 14,
    color: "#555",
    fontWeight: "500",
  },
  cardPressable: {
    marginBottom: 16,
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  courseDuration: {
    fontSize: 14,
    color: "gray"
  },
  courseDurationContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  studentDelete: {
    padding: 3,
  }
});

export default StudentItem;
