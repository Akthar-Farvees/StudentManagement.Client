import React from "react";
import { StyleSheet, View } from "react-native";
import { MotiView } from "moti";
import { Easing } from "react-native-reanimated";

const MoView = MotiView;

const SkeletonLoader = () => {
  return (
    <MoView
      from={{
        opacity: 0.6,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        type: "timing",
        duration: 800,
        easing: Easing.inOut(Easing.ease),
        loop: true,
        repeatReverse: true,
      }}
      style={styles.skeletonContainer}
    >
      {[...Array(5)].map((_, index) => (
        <View key={index} style={styles.skeletonCard}>
          <View style={styles.skeletonHeader}>
            <View style={styles.skeletonName} />
            <View style={styles.skeletonCircle} />
          </View>
          <View style={styles.skeletonRow}>
            <View style={styles.skeletonDetail} />
            <View style={styles.skeletonDetail} />
          </View>
          <View style={styles.skeletonYear} />
        </View>
      ))}
    </MoView>
  );
};

const styles = StyleSheet.create({
  // Skeleton styles
  skeletonContainer: {
    padding: 16,
  },
  skeletonCard: {
    backgroundColor: "#e0e0e0",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    height: 120,
  },
  skeletonHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  skeletonName: {
    width: "60%",
    height: 20,
    backgroundColor: "#d0d0d0",
    borderRadius: 4,
  },
  skeletonCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#d0d0d0",
  },
  skeletonRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  skeletonDetail: {
    width: "30%",
    height: 30,
    backgroundColor: "#d0d0d0",
    borderRadius: 4,
    marginRight: 12,
  },
  skeletonYear: {
    width: "40%",
    height: 24,
    backgroundColor: "#d0d0d0",
    borderRadius: 12,
  },
});

export default SkeletonLoader;
