import { StyleSheet, Text, SafeAreaView} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import PDF from 'react-native-pdf'

export default function PDFView() {
  const fileSource = require('@/assets/files/ISP-1000-1.pdf');
  return (
    <SafeAreaView style={styles.container}>
      <PDF
      source={fileSource}
      onLoadComplete={(numberOfPages, filePath) => {
        console.log(`Number of pages: ${numberOfPages}`);
      }}
      onPageChanged={(page, numberOfPages) => {
        console.log(`Current Page: ${page}`);
      }}
      onError={(error) => {
        console.log(error);
      }}
      onPressLink={(uri) => {
        console.log(`Link Pressed ${uri}`)
      }}
      style={styles.PDF}
      />
      <StatusBar style='auto'/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 32
  },
  PDF: {
    flex:1,
    alignSelf: "stretch"
  }
})
