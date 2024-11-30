export const AccountScreen = ({ navigation }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [textSize, setTextSize] = useState(16); // Default text size

  // Handle text size change
  const handleTextSizeChange = (index) => {
    setTextSize(TEXT_SIZE_OPTIONS[index].value);
  };

  const styles = useMemo(() => {
    return getStyles(isDarkMode, textSize);
  }, [isDarkMode, textSize]);

  // Calculate the selected index directly as a number
  const selectedIndex = TEXT_SIZE_OPTIONS.findIndex(item => item.value === textSize);

  const ArrowIcon = (props) => (
    <Icon name="arrow-ios-forward-outline" {...props} style={styles.icon} />
  );

  const MoonIcon = (props) => (
    <Icon name="moon-outline" {...props} style={styles.icon} />
  );

  return (
    <SafeAreaView style={styles.fullPage} edges={["top", "left", "right"]}>
      <LinearGradient
        colors={
          isDarkMode
            ? ['transparent', colors.dark.black]
            : [colors.apple.offWhite, "#D8ECFF"]
        }
        style={styles.bgGradient}
        start={{ x: 0.5, y: 0.75 }}
        end={{ x: 0.5, y: 1 }}
      >
        <Header title="Account" isDarkMode={isDarkMode} />
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Layout style={styles.section}>
            <Text style={styles.sectionTitle}>Settings</Text>
            <SectionItem
              label="Edit Account Info"
              onPress={() => {}}
              accessoryLeft="edit-outline"
              accessoryRight={ArrowIcon}
            />
            <Divider style={styles.divider} />
            <SectionItem
              label="Change Password"
              onPress={() => {}}
              accessoryLeft="lock-outline"
              accessoryRight={ArrowIcon}
            />
            <Divider style={styles.divider} />
            <SectionItem
              label="Set Language"
              onPress={() => {}}
              accessoryLeft="globe-2-outline"
              accessoryRight={ArrowIcon}
            />
            <Divider style={styles.divider} />
            {/* Add Dropdown for Text Size */}
            <Layout style={styles.sectionItem}>
              <Layout style={styles.leftSide}>
                <Text style={styles.sectionItemText}>Text Size</Text>
              </Layout>
              <Layout style={styles.rightSide}>
                <Select
                  selectedIndex={selectedIndex} // Use the number directly here
                  onSelect={index => handleTextSizeChange(index.row)}
                  style={{ width: 120 }}
                >
                  {TEXT_SIZE_OPTIONS.map((option, idx) => (
                    <SelectItem key={idx} title={option.label} />
                  ))}
                </Select>
              </Layout>
            </Layout>
            <Divider style={styles.divider} />
            <Layout style={styles.sectionItem}>
              <Layout style={styles.leftSide}>
                <MoonIcon />
                <Text style={styles.sectionItemText}>Dark Mode</Text>
              </Layout>
              <Layout style={styles.rightSide}>
                <Toggle
                  status="primary"
                  onChange={toggleDarkMode}
                  checked={isDarkMode}
                  accessibilityRole="switch"
                  accessibilityLabel="Toggle Dark Mode"
                />
              </Layout>
            </Layout>
          </Layout>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};
