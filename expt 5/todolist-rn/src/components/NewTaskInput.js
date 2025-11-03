import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Animated, Keyboard } from 'react-native';

const NewTaskInput = ({ onAdd }) => {
  const [value, setValue] = useState('');
  const anim = useRef(new Animated.Value(0)).current;

  const open = () => {
    Animated.spring(anim, { toValue: 1, useNativeDriver: false }).start();
    Keyboard.dismiss();
  };

  const submit = () => {
    if (!value.trim()) return;
    onAdd(value.trim());
    setValue('');
  };

  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [0, -10] });

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
      <View style={styles.inputRow}>
        <TextInput
          placeholder="Add new task..."
          value={value}
          onChangeText={setValue}
          style={styles.input}
          onSubmitEditing={submit}
        />

        <TouchableOpacity style={styles.addBtn} onPress={submit} activeOpacity={0.8}>
          <Animated.Text style={styles.addText}>+ New task</Animated.Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'transparent'
  },
  inputRow: {
    backgroundColor: '#fff',
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 6,
    marginHorizontal: 20
  },
  input: { flex: 1, paddingHorizontal: 10, fontSize: 16 },
  addBtn: { backgroundColor: '#9b7bff', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 28 },
  addText: { color: '#fff', fontWeight: '700' }
});

export default NewTaskInput;
