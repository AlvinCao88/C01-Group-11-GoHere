import { View, Text, StyleSheet} from "react-native";
import TestComponent from "../components/TestComponent";

import Map from "../components/Map";
import CurrentLocation from './../components/CurrentLocation';
import WashroomBottomSheet from "../components/WashroomBottomSheet";

export default function TestScreen() {
  return (
    <View style={styles.container}>
      
      <TestComponent />
      <CurrentLocation/>
      <Map />
      {/* <View style={styles.bottomSheet}>
        
        <WashroomBottomSheet/>
      </View> */}
      
      
    </View>
   
   
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  bottomSheet: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },

});
