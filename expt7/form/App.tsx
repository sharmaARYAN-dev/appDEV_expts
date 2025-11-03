import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Platform,
  ScrollView,
  Text,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import {
  Provider as PaperProvider,
  TextInput,
  Button,
  RadioButton,
  Checkbox,
  Appbar,
  Card,
  Title,
  Caption,
  useTheme,
} from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Slider from '@react-native-community/slider';

export default function App() {
  const theme = useTheme();

  // form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [course, setCourse] = useState('BSc');
  const [dob, setDob] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [score, setScore] = useState(75); // slider value 0-100
  const [agreed, setAgreed] = useState(false);

  const onChangeDate = (event: any, selected?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selected) setDob(selected);
  };

  const handleSubmit = () => {
    // basic validation
    if (!name.trim()) {
      Alert.alert('Validation', 'Please enter student name.');
      return;
    }
    if (!email.trim()) {
      Alert.alert('Validation', 'Please enter email.');
      return;
    }
    if (!agreed) {
      Alert.alert('Validation', 'You must agree to the terms.');
      return;
    }
    const payload = {
      name,
      email,
      phone,
      gender,
      course,
      dob: dob ? dob.toISOString().split('T')[0] : null,
      score: Math.round(score),
      agreed,
    };
    Alert.alert('Submitted', JSON.stringify(payload, null, 2));
  };

  return (
    <PaperProvider>
      <SafeAreaView style={styles.safe}>
        <Appbar.Header elevated>
          <Appbar.Content title="Student Registration" />
        </Appbar.Header>

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <Card style={styles.card} elevation={2}>
              <Card.Content>
                <Title style={styles.cardTitle}>Create student profile</Title>
                <Caption style={styles.caption}>Fill in the details below</Caption>

                <TextInput
                  label="Full name"
                  value={name}
                  onChangeText={setName}
                  mode="outlined"
                  style={styles.input}
                  placeholder="Jane Doe"
                />

                <TextInput
                  label="Email"
                  value={email}
                  onChangeText={setEmail}
                  mode="outlined"
                  keyboardType="email-address"
                  style={styles.input}
                  placeholder="jane@example.com"
                />

                <TextInput
                  label="Phone"
                  value={phone}
                  onChangeText={setPhone}
                  mode="outlined"
                  keyboardType="phone-pad"
                  style={styles.input}
                  placeholder="+91 98765 43210"
                />

                <View style={styles.fieldRow}>
                  <Caption style={styles.fieldLabel}>Gender</Caption>
                  <RadioButton.Group onValueChange={(val) => setGender(val as any)} value={gender}>
                    <View style={styles.radioRow}>
                      <RadioButton.Item label="Male" value="male" />
                      <RadioButton.Item label="Female" value="female" />
                      <RadioButton.Item label="Other" value="other" />
                    </View>
                  </RadioButton.Group>
                </View>

                <View style={styles.fieldRow}>
                  <Caption style={styles.fieldLabel}>Course</Caption>
                  <View style={styles.pickerWrapper}>
                    <Picker
                      selectedValue={course}
                      onValueChange={(v) => setCourse(v)}
                      style={styles.picker}
                    >
                      <Picker.Item label="BSc" value="BSc" />
                      <Picker.Item label="BA" value="BA" />
                      <Picker.Item label="BCom" value="BCom" />
                      <Picker.Item label="BTech" value="BTech" />
                    </Picker>
                  </View>
                </View>

                <View style={styles.fieldRow}>
                  <Caption style={styles.fieldLabel}>Date of birth</Caption>
                  <Button mode="outlined" onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
                    {dob ? dob.toDateString() : 'Select date'}
                  </Button>
                  {showDatePicker && (
                    <DateTimePicker
                      value={dob || new Date(2000, 0, 1)}
                      mode="date"
                      display="default"
                      maximumDate={new Date()}
                      onChange={onChangeDate}
                    />
                  )}
                </View>

                <View style={styles.fieldRow}>
                  <Caption style={styles.fieldLabel}>Entrance score: {Math.round(score)}%</Caption>
                  <Slider
                    style={{ width: '100%', height: 40 }}
                    minimumValue={0}
                    maximumValue={100}
                    step={1}
                    value={score}
                    onValueChange={setScore}
                    minimumTrackTintColor={theme.colors.primary}
                    maximumTrackTintColor="#d0d0d0"
                  />
                </View>

                <View style={styles.agreeRow}>
                  <Checkbox status={agreed ? 'checked' : 'unchecked'} onPress={() => setAgreed(!agreed)} />
                  <Text style={styles.agreeText}>I agree to the terms and conditions</Text>
                </View>

                <Button mode="contained" onPress={handleSubmit} style={styles.submitButton} contentStyle={styles.submitContent}>
                  Submit
                </Button>
              </Card.Content>
            </Card>
            <Text style={styles.footer}>Minimal • Modern • Professional</Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f7f8fb' },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    borderRadius: 12,
    paddingVertical: 6,
  },
  cardTitle: {
    marginBottom: 4,
  },
  caption: {
    marginBottom: 12,
    color: '#6b6f76',
  },
  input: {
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  fieldRow: {
    marginBottom: 12,
  },
  fieldLabel: {
    marginBottom: 6,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#e6e8ee',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  picker: {
    height: 44,
    width: '100%',
  },
  radioRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateButton: {
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  agreeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  agreeText: {
    marginLeft: 8,
    color: '#333',
  },
  submitButton: {
    marginTop: 8,
    borderRadius: 8,
  },
  submitContent: {
    paddingVertical: 6,
  },
  footer: {
    marginTop: 16,
    textAlign: 'center',
    color: '#9aa0a6',
  },
});