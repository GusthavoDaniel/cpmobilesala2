import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { Appbar, Checkbox, FAB, IconButton, List, Text } from 'react-native-paper';
import { listenTasks, updateTask, deleteTask } from '../services/tasks';
import { logout } from '../services/auth';
import I18n from '../services/i18n';
import { useQuery } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';

// Exemplo TanStack Query: frase motivacional
async function fetchQuote() {
  const res = await fetch('https://api.quotable.io/random');
  return res.json();
}

export default function TaskListScreen() {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState([]);
  useEffect(() => listenTasks(setTasks), []);

  const { data: quote } = useQuery({ queryKey:['quote'], queryFn: fetchQuote });

  const toggleDone = useCallback((t) => updateTask(t.id, { done: !t.done }), []);
  const del = useCallback((t) => deleteTask(t.id), []);

  return (
    <View style={{ flex:1 }}>

      <FlatList
        data={tasks}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <List.Item
            title={item.title}
            description={item.description}
            left={() => (
              <Checkbox status={item.done ? 'checked' : 'unchecked'} onPress={() => toggleDone(item)} />
            )}
            right={() => <IconButton icon="delete" onPress={() => del(item)} />}
            onPress={() => navigation.navigate('TaskForm', { task: item })}
          />
        )}
      />

      <FAB style={{ position:'absolute', right:16, bottom:16 }}
           icon="plus"
           onPress={() => navigation.navigate('TaskForm')} />
    </View>
  );
}


