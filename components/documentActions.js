import { captureRef } from 'react-native-view-shot';
import { useNavigation } from '@react-navigation/native';

export const handleNextPage = (currentPage, setCurrentPage, maxPages) => {
  const viewToSnapshotRef = useRef();
  const [snapshotImg, setSnapshotImg] = useState();

  const navigation = useNavigation();

  if (currentPage < maxPages) setCurrentPage(currentPage + 1);
};

export const handlePreviousPage = (currentPage, setCurrentPage) => {
  if (currentPage > 1) setCurrentPage(currentPage - 1);
};

export const handleSave = async (viewRef, setSnapshotImg, setIsModalVisible) => {
  try {
    const result = await captureRef(viewRef, {
      format: "png", // or "jpg"
      quality: 0.8, // Adjust quality as needed
    });
    console.log("Form saved! Path:", result);
    setSnapshotImg(result);
    setIsModalVisible(true);
  } catch (error) {
    console.error("Failed to capture view:", error);
  }
};
