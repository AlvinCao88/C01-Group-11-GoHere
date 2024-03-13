import React, {useState} from 'react';
import { View, Text, Button, TextInput, Alert } from 'react-native';
import { useStripe } from "@stripe/stripe-react-native";

const Checkout = () => {
    const [amount, setAmount] = useState("1");
    const stripe = useStripe();

    const donate = async () => {
        try {
            const finalAmount = parseFloat(amount).toFixed(2); //limit to 2 decimal places
            if (finalAmount <= 0) {
                return Alert.alert("You cannot donate 0 or negative dollars.");
            }

            const response = await fetch(`http://10.0.0.245:8000/donate`, { //TODO: change URL
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
                merchantDisplayName: "GoHere donation" //this is a piece of required info for initPayment
                                                       //TODO: may need to change this
            });

            if (initSheet.error) {
                return Alert.alert(initSheet.error.message);
            }

            const presentSheet = await stripe.presentPaymentSheet({
                clientSecret: data.clientSecret,
            });

            if (presentSheet.error) {
                console.error(presentSheet.error);
                return Alert.alert(presentSheet.error.message);
            }

            // letting the user know it was successful
            Alert.alert("Thank you for the donation.");

        } catch (err) {
            console.error(err);
            Alert.alert("Payment failed.");
        }
    };
    
    return (
        <View>
            <Text>Enter donation amount below</Text>
            <TextInput
                textAlign='center'
                placeholder="Amount"
                keyboardType="decimal-pad"
                style={{ padding: 10, borderColor: "black", borderWidth: 1 }}
                value={amount}
                onChangeText={(e) => setAmount(e)}
            />
            <Button title="Donate" onPress={donate} color='#e84338' />
        </View>
    )
}

export default Checkout;
