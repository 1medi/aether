import { Icon } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { Layout, Input } from "@ui-kitten/components";

const SearchBar = ({placeholder}) => {
  const FilterIcon = (props) => (
    <Icon 
      name="options-2-outline" 
      {...props} 
      style={styles.filterIcon}
    />
  );
  return (
    <Layout style={styles.searchSection}>
    <Input
      style={styles.searchInput}
      placeholder={placeholder}
    />
    <Layout style={styles.iconContainer}>
      <FilterIcon />
    </Layout>
  </Layout>
  )
} 

const styles = StyleSheet.create({
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 24,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  searchInput: {
    borderRadius: 20,
    flex: 1,
    marginRight: 10,
  },
  searchSection: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'rgba(0, 0, 0, 0)'
  },
})

export default SearchBar