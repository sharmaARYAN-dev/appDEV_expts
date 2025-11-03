import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import Header from '../components/Header';
import TaskCard from '../components/TaskCard';
import NewTaskInput from '../components/NewTaskInput';
import { loadTasks, saveTasks } from '../utils/storage';

const Home = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    (async () => {
      const t = await loadTasks();
      setTasks(t || []);
    })();
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (title) => {
    const newTask = { id: Date.now().toString(), title, done: false };
    setTasks((s) => [newTask, ...s]);
  };

  const toggleDone = (id) => {
    setTasks((s) => s.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const removeTask = (id) => {
    setTasks((s) => s.filter(t => t.id !== id));
  };

  return (
    <View style={styles.container}>
      <Header title="Website todo" />

      <View style={styles.content}>
        <FlatList
          data={tasks}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <TaskCard task={item} onToggle={() => toggleDone(item.id)} onDelete={() => removeTask(item.id)} />
          )}
          ListEmptyComponent={<Text style={styles.empty}>No tasks yet — add something ✨</Text>}
        />
      </View>

      <NewTaskInput onAdd={addTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eef2ff' },
  content: { flex: 1, padding: 20 },
  empty: { textAlign: 'center', marginTop: 30, color: '#7b7f9a' },
});

export default Home;
