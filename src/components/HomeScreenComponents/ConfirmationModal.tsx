import { ConfirmationModalProps } from "@/constants/types";
import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  const scaleValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      scaleValue.setValue(0);
    }
  }, [visible]);

  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalText}>{message}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
              <Text style={styles.cancelButtonText}>No</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={() => {
                onConfirm()
                onClose()
              }}
            >
              <Text style={styles.confirmButtonText}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const { width, height } = Dimensions.get("window")

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: width * 0.85,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#1a1a1a",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  button: {
    borderRadius: 10,
    padding: 12,
    elevation: 2,
    minWidth: "45%",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#f5f5f7",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  confirmButton: {
    backgroundColor: "#ff3b30",
  },
  confirmButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelButtonText: {
    color: "#666",
    fontWeight: "bold",
    fontSize: 16,
  },
})

export default ConfirmationModal
