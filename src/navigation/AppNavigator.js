// src/navigation/AppNavigator.js
import React from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TaskListScreen from '../screens/TaskListScreen';
import TaskFormScreen from '../screens/TaskFormScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tasks"
        component={TaskListScreen}
        options={({ navigation }) => ({
          title: 'Tarefas',
          headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
              <IconButton
                icon="cog"
                onPress={() => navigation.navigate('Settings')}
              />
              <IconButton
                icon="export-variant"
                onPress={() => navigation.navigate('TaskForm')}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen name="TaskForm" component={TaskFormScreen} options={{ title: 'Tarefa' }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Configurações' }} />
    </Stack.Navigator>
  );
}
