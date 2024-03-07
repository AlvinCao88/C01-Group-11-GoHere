export default function ReportIssueScreen (washroomId) {
    const [name, setName] = useState("");
    const [phoneNum, setPhoneNum] = useState(0);
    const [email, setEmail] = useState("");
    const [issue, setIssue] = useState("");
    const [address, setAddress] = useState("");

    const submit = async () => {
        if (issue) {
            const status = false; //Initially, the issue is not verified
            const info = {
                name,
                phoneNum,
                email,
                issue,
                address,
                status,
                washroomId
            };

            try {
                //TODO: setup connection to DB and add in the new issue
            } catch (e) {

            }
        }
    }
    
    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}
            >
            <Text style={{ fontSize: 24, color: "black" }}>&lt;</Text>
            </TouchableOpacity>
            <View style={styles.dividingLine}></View>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.inputContainer}>
                <Text style={styles.solidText}>Name (optional)</Text>
                <TextInput
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={setName}
                    style={styles.textInput}
                />
                <Text style={styles.spaceText}> </Text>
                <Text style={styles.solidText}>Phone number (optional)</Text>
                <TextInput
                    placeholder="Enter your phone number"
                    value={phoneNum}
                    onChangeText={setPhoneNum}
                    style={styles.textInput}
                    keyboardType='phone-pad'
                />
                <Text style={styles.spaceText}> </Text>
                <Text style={styles.solidText}>Email (optional)</Text>
                <TextInput 
                    placeholder="Enter your email"
                    keyboardType='email-address'
                    value={email}
                    style={styles.textInput}
                    onChangeText={setEmail}
                />
                <Text style={styles.spaceText}> </Text>
                <Text style={styles.solidText}>Issue</Text>
                <TextInput
                    placeholder="Enter a description of the issue"
                    value={issue}
                    onChangeText={setIssue}
                    style={styles.textInput}
                />
                </View>
                <TouchableOpacity
                onPress={handleSubmit}
                disabled={!issue}
                style={[
                    styles.submitButton,
                    issue
                    ? styles.submitButtonActive
                    : styles.submitButtonInactive,
                ]}
                >
                <Text style={styles.submitButtonText}>Submit issue</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalView: {
      margin: 10,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 20,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      width: "80%",
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
      fontSize: 20,
    },
    scrollViewContent: {
      paddingBottom: 20,
    },
    backButton: {
      position: "absolute",
      top: 55,
      left: 15,
      padding: 10,
      zIndex: 10,
    },
    dividingLine: {
      marginTop: 40,
      borderBottomColor: "#B0B0B0",
      borderBottomWidth: 1,
      width: "100%",
    },
    container: {
      flex: 1,
      padding: 20,
      paddingTop: 50,
      justifyContent: "flex-start",
    },
    inputContainer: {
      marginBottom: 20,
      marginTop: 20,
    },
    solidText: {
      fontSize: 16,
      color: "#3b3b3b",
      marginLeft: 25,
      marginBottom: 5,
    },
    spaceText: {
      fontSize: 10,
    },
    superSpaceText: {
      fontSize: 2,
    },
    textInput: {
      borderBottomWidth: 1,
      borderColor: "#ccc",
      padding: 5,
      marginBottom: 10,
      width: "90%",
      alignSelf: "center",
      fontSize: 16,
      color: "#000",
    },
    submitButton: {
      padding: 15,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5,
      width: "90%",
      alignSelf: "center",
    },
    submitButtonInactive: {
      backgroundColor: "#B0B0B0",
    },
    submitButtonActive: {
      backgroundColor: "#000",
    },
    submitButtonText: {
      color: "white",
      fontSize: 16,
    },
    pickerContainer: {
      borderBottomWidth: 1,
      borderColor: "#ccc",
      paddingBottom: 5,
      marginBottom: 10,
      width: "90%",
      alignSelf: "center",
    },
    inputIOS: {
      fontSize: 16,
      color: "black",
      paddingLeft: 5,
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      color: "black",
      paddingRight: 30,
      marginBottom: 10,
    },
});