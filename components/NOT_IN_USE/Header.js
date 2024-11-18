// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, Image, View } from 'react-native';
// import { Layout } from '@ui-kitten/components';

// const HeaderProfile = () => {
//   const [currentDate, setCurrentDate] = useState('');

//   useEffect(() => {
//     const date = new Date();
//     const options = { month: 'long', day: 'numeric', weekday: 'short' };
//     const formattedDate = date.toLocaleDateString(undefined, options);
//     setCurrentDate(formattedDate);
//   }, []);

//   return (
//     <Layout style={styles.headerContainer}>
//       <View style={styles.profileContainer}>
//         <Image
//           style={styles.profileImage}
//           source={require('@/assets/images/lbj.jpg')}
//         />
//         <View style={styles.profileInfo}>
//           <Layout style={styles.profileTextContainer}>
//             <Text style={styles.profileName}>Chris Topher</Text>
//             <Text>{currentDate}</Text>
//           </Layout>
//         </View>
//       </View>
//     </Layout>
//   );
// };

// const styles = StyleSheet.create({
//   headerContainer: {
//     backgroundColor: 'transparent',
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     flex: 1,
//   },
//   profileContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   profileImage: {
//     width: 75,
//     height: 75,
//     borderRadius: 100,
//   },
//   profileInfo: {
//     marginLeft: 10,
//   },
//   profileTextContainer: {
//     backgroundColor: 'none',
//     padding: 10,
//   },
//   profileName: {
//     fontFamily: 'Inter_600SemiBold',
//     fontSize: 18,
//   },
//   rightContainer: {
//     flexDirection: 'row',
//     borderLeftWidth: 1.5,
//     borderLeftColor: 'white',
//     height: 40,
//     width: 50,
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     paddingLeft: 50,
//   },
// });

// export default HeaderProfile;