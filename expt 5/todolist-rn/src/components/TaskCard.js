import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const TaskCard = ({ task, onToggle, onDelete }) => {
  const scale = new Animated.Value(1);

  const pressIn = () => Animated.spring(scale, { toValue: 0.98, useNativeDriver: true }).start();
  const pressOut = () => Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();

  return (
    <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onToggle}
        onPressIn={pressIn}
        onPressOut={pressOut}
        style={styles.row}
      >
        <View style={[styles.dot, task.done && styles.dotDone]} />
        <Text style={[styles.title, task.done && styles.doneText]}>{task.title}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onDelete} style={styles.delete}>
        <Text style={{ color: '#9b7bff' }}>🗑</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2
  },
  row: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  dot: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: '#cfcfe8', marginRight: 12 },
  dotDone: { backgroundColor: '#9b7bff', borderColor: '#9b7bff' },
  title: { color: '#444', fontSize: 16, flexShrink: 1 },
  doneText: { textDecorationLine: 'line-through', color: '#9b9bb0' },
  delete: { padding: 8 }
});

export default TaskCard;
