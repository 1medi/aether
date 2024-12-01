import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@ui-kitten/components";
import { colors, typography } from "@/css/globals";
import { BlurView } from "expo-blur";
import { ScrollView } from "react-native-gesture-handler";

const PensionPlanModal = ({ visible, onClose }) => {
  const navigation = useNavigation();

  const handleNavigation = () => {
    navigation.navigate("LibraryScreen");
    onClose(true);
  };

  const CancelIcon = (props) => <Icon {...props} name="close-outline" />;

  const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity of the blur view is 0

  React.useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1, // Fade-in to full opacity
        duration: 600, // Adjust duration for fade-in effect
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0, // Fade-out when the modal is not visible
        duration: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]); // Trigger animation when visibility changes

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        {/* Animated Blur View with fade-in effect */}
        <Pressable style={styles.blurOverlay} onPress={onClose}>
          <Animated.View style={[styles.blurOverlay, { opacity: fadeAnim }]}>
            <BlurView intensity={32} tint="dark" style={styles.blurOverlay} />
          </Animated.View>
        </Pressable>
        <View style={styles.modalOverlay}>
          {/* Modal Content */}
          <BlurView intensity={32} tint="light" style={styles.modalContent}>
            <View style={styles.topText}>
              <Text style={styles.title}>Extended Health Care Form</Text>
              <Text style={styles.subtitle}>Sunlife Financial</Text>
            </View>
            <ScrollView
              style={styles.modalImageScroll}
              showsVerticalScrollIndicator={false}
            >
              <Image
                source={require("@/assets/files/insurance1.png")}
                style={styles.modalImage}
                resizeMode="cover"
              />
            </ScrollView>
            <View style={styles.modalDescription}>
              <Text style={styles.descriptionTitle}>Description:</Text>
              <Text style={styles.description}>
                This form helps you apply for pension benefits based on your
                injury history.
              </Text>
              <Text style={styles.descriptionTitle}>Purpose:</Text>
              <Text style={styles.description}>
                To ensure you receive your entitled benefits by providing the
                necessary application details.
              </Text>
            </View>
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
                <Icon
                  name="close-outline"
                  style={{
                    width: 24,
                    height: 24,
                    tintColor: colors.apple.black,
                  }}
                />
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.startButton}
                onPress={handleNavigation}
              >
                <Text style={styles.startButtonText}>Start Now</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  blurOverlay: {
    position: "absolute", // Ensures it is positioned behind the content
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // backgroundColor: colors.apple.black05,
    // backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%", // Makes sure it covers the entire screen
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    paddingTop: 24,
    flexDirection: "column",
    justifyContent: "center",
    width: "90%",
    // padding: 24,
    backgroundColor: colors.apple.glass70,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: colors.apple.lightStroke,
    zIndex: 1, // Ensure this stays above the blur view
    overflow: "hidden",
    gap: 24,
  },

  topText: {
    paddingHorizontal: 16,
  },
  title: {
    ...typography(true).h2Med,
    // textAlign: "center",
  },
  subtitle: {
    ...typography(true).body,
    color: colors.apple.secondaryText,
    // textAlign: "center",
    // marginVertical: 10,
  },

  modalImageScroll: {
    width: "100%",
    height: 240,
  },
  modalImage: {
    paddingHorizontal: 16,
    width: "100%",
    height: 400,
  },
  modalDescription: {
    paddingHorizontal: 16,
    // marginVertical: 16,
  },
  descriptionTitle: {
    ...typography(true).bodyMed,
    color: colors.apple.black,
    marginBottom: 4,
  },
  description: {
    ...typography(true).footnote,
    color: colors.apple.black,
    marginBottom: 16,
  },

  modalActions: {
    flexDirection: "row",
    height: 56,
    borderTopWidth: 1,
    borderColor: colors.apple.lightStroke,
    // width: 300,
  },
  cancelButton: {
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 32,
    width: "50%",
    flexDirection: "row",
    gap: 8,
    borderRightWidth: 1,
    borderColor: colors.apple.lightStroke,
  },
  startButton: {
    alignItems: "center",
    justifyContent: "center",
    borderBottomRightRadius: 32,
    width: "50%",
  },
  buttonText: {
    ...typography(true).bodyMed,
    color: colors.apple.black,
    textAlign: "center",
  },
  startButtonText: {
    ...typography(true).body,
    color: colors.light.blue,
    textAlign: "center",
  },
});

export default PensionPlanModal;
