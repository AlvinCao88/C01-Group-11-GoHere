import React, {useState} from 'react';
import { View, Text, Button, TextInput, Alert } from 'react-native';
import { useStripe } from "@stripe/stripe-react-native";

const API_URL = "http://localhost:8000";

const Checkout = () => {
    //const [name, setName] = useState("");
    const [amount, setAmount] = useState("1");
    const stripe = useStripe();

    const donate = async () => {
        try {
            const finalAmount = parseInt(amount);
            if (finalAmount < 1) {
                return Alert.alert("You cannot donate below 1 CAD");
            }
            console.log("a");
            //the response below is failing, likely because my phone isn't hosting it...
            //TODO: test the donate button to see how it works.
            const response = await fetch(`${API_URL}/donate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount: finalAmount}),
            });

            const data = await response.json();
            if (!response.ok) {
                return Alert.alert(data.message);
            }

            // PaymentSheet will handle the process of entering card details and such
            const initSheet = await stripe.initPaymentSheet({
                paymentIntentClientSecret: data.clientSecret,
            });

            if (initSheet.error) {
                console.error(initSheet.error);
                return Alert.alert(initSheet.error.message);
            }

            const presentSheet = await stripe.presentPaymentSheet({
                clientSecret: data.clientSecret,
            });

            if (presentSheet.error) {
                console.error(presentSheet.error);
                return Alert.alert(presentSheet.error.message);
            }

            Alert.alert("Donated successfully! Thank you for the donation.");

        } catch (err) {
            console.error(err);
            Alert.alert("Payment failed!");
        }
    };
    
    return (
        <View>
            <Text>Enter donation amount below</Text>
            <TextInput
                textAlign='center'
                placeholder="Amount"
                keyboardType="numeric"
                style={{ padding: 10, borderColor: "black", borderWidth: 1 }}
                value={amount}
                onChangeText={(e) => setAmount(e)}
            />
            <Button title="Donate" onPress={donate} />
        </View>
    )
}

export default Checkout;