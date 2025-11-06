import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { auth } from "../firebaseConfig";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";

declare global {
  interface Window {
    recaptchaVerifier: any;
  }
}

export default function PhoneAuth() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const sendVerificationCode = async () => {
    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
          size: "invisible",
        });
      }
      const confirmation = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
      setVerificationId(confirmation.verificationId);
      setMessage("OTP sent successfully!");
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  const confirmCode = async () => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId!, otp);
      await signInWithCredential(auth, credential);
      setMessage("Phone authentication successful!");
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  return (
    <View>
      <Text style={styles.title}>Phone Authentication</Text>
      <View id="recaptcha-container"></View>

      <TextInput
        placeholder="+91XXXXXXXXXX"
        style={styles.input}
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <TouchableOpacity style={styles.button} onPress={sendVerificationCode}>
        <Text style={styles.buttonText}>SEND OTP</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Enter OTP"
        style={styles.input}
        keyboardType="numeric"
        value={otp}
        onChangeText={setOtp}
      />

      <TouchableOpacity style={[styles.button, styles.verifyButton]} onPress={confirmCode}>
        <Text style={styles.buttonText}>VERIFY OTP</Text>
      </TouchableOpacity>

      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    marginBottom: 12,
    backgroundColor: "#fafafa",
  },
  button: {
    backgroundColor: "#198754",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  verifyButton: {
    backgroundColor: "#157347",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
  message: {
    marginTop: 10,
    color: "#0f5132",
    fontSize: 13,
  },
});
