import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAllPrismicDocumentsByType } from "@prismicio/react";

const TierList = ({ navigation }) => {
  const [results] = useAllPrismicDocumentsByType("business");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({ business_name: '', description: '' });
  const renderSponsors = (tierLevel) => {
    return (
      <ScrollView 
        showsHorizontalScrollIndicator={true}
        horizontal={true} 
        style={styles.container} 
        snapToAlignment="start"
        snapToInterval={400} 
      >
        {results &&
          results.map((e) => (
            e.data.tier_level === tierLevel ? (
              <TouchableOpacity 
                key={e.id}
                onPress={() => {
                  setModalData({ 
                    business_name: e.data.business_name ? e.data.business_name[0].text : '',
                    description: e.data.description ? e.data.description[0].text : '' 
                  });
                  setModalVisible(true);
                }}
              >
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: e.data.logo.url }}
                    style={styles.image}
                  />
                </View>
              </TouchableOpacity>
            ) : null
      ))}
      </ScrollView> 
    );
  };

  return (
    <SafeAreaView style={styles.container}>
    <Modal
     animationType="fade"
     transparent={true}
     visible={modalVisible}
     onRequestClose={() => {
       setModalVisible(false);
     }}
     >
     <View style={styles.centeredView}>
       <View style={styles.modalView}>
          <View>
            <Text style={styles.businessName}>{modalData.business_name}</Text>
            <Text style={styles.description}>{modalData.description}</Text>
          </View>
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
       </View>
     </View>
   </Modal>

      <View style={styles.headerContainer}>
        <Text style={[styles.headerText, { color: "#DA5C59" }]}>
          Our Partners
        </Text>
      </View>
      
      <View>
        <Text style={styles.goldSponsorText}>Gold Sponsor</Text>
        {renderSponsors('Gold')}
      </View>

      <View>
        <Text style={styles.silverSponsorText}>Silver</Text>
        {renderSponsors('Silver')}
      </View>

      <View style={styles.bronzeContainer}>
        <Text style={styles.bronzeSponsorText}>Bronze</Text>
        {renderSponsors('Bronze')}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 0,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 0,
  },
  headerText: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 0,
  },
  goldSponsorText: {
    color: "#FFD700",
    paddingTop: 30,
    fontWeight: 'bold',
    fontSize: 22,
    alignSelf: 'center',
  },
  silverSponsorText: {
    color: "#C0C0C0",
    paddingTop: 0,
    fontWeight: 'bold',
    fontSize: 22,
    alignSelf: 'center',
  },
  bronzeContainer: {
    alignContent: 'center',
    backgroundColor: "#fff",
    paddingBottom: '30%',
    paddingTop: 50,
    borderBottomWidth: 10,
    borderColor:'black',
  },
  bronzeSponsorText: {
    color: "#CD7F32",
    paddingTop: 0,
    fontWeight: 'bold',
    fontSize: 22,
    alignSelf: 'center',
  },
  imageContainer: {
    width: 420, 
    height: 220, 
    overflow: "hidden",
    marginRight: 5, 
    // borderWidth: 3,
  },
  image: {
    flex: 1,
    resizeMode: "cover", 
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  modalView: {
    height: '50%', 
    width: "80%",
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#DA5C59',
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  businessName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DA5C59',
    paddingBottom: 20,
    textAlign: 'center',

  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    padding: 10,
  },
});


export default TierList;