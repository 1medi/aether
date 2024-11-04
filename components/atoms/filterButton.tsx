import React from 'react';
import { StyleSheet } from 'react-native';
import { IndexPath, Layout, Select, SelectItem } from '@ui-kitten/components';

export const FilterButton = (): React.ReactElement => {

  const [selectedIndex, setSelectedIndex] = React.useState<IndexPath | IndexPath[]>(new IndexPath(0));

  return (
    <Layout
      style={styles.container}
      level='1'
    >
      <Select
        selectedIndex={selectedIndex}
        style={styles.select}
        onSelect={index => setSelectedIndex(index)}
      >
        <SelectItem title='Canadian Pension Plan' />
        <SelectItem title='Disability Plan' />
        <SelectItem title='T4 Statements' />
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

  select: {


  }
});
