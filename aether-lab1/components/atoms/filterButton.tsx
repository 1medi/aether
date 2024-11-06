import React from 'react';
import { StyleSheet } from 'react-native';
import { IndexPath, Layout, Select, SelectItem } from '@ui-kitten/components';

const data = [
  {
     "id": 0, 
     "name": "All",
  },
  {
     "id": 1, 
     "name": "Canadian Pension Plan",
  },
  {
     "id": 2, 
      "name": "Disability Plan",
  },
  {
    "id": 3, 
    "name": "T4 Statements",
 },
];

export const FilterButton = ({ onSelect }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const selectedTitle = data[selectedIndex.row]?.name || '';

  const handleSelect = (index) => {
    setSelectedIndex(index);
    onSelect(index); 
  };

  return (
    <Layout
      style={styles.container}
      level='1'
    >
      <Select
        selectedIndex={selectedIndex}
        value={selectedTitle}
        style={styles.select}
        onSelect={handleSelect}
      >
        {data.map((item) => (
          <SelectItem key={item.id} title={item.name} />
        ))}
      </Select>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'none',
    paddingLeft: 10, paddingRight: 10, 
    display: 'flex',
  },

});
