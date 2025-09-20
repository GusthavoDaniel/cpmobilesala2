import React, { useState } from 'react';
import { View, Platform } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createTask, updateTask } from '../services/tasks';
import { scheduleTaskNotification } from '../services/notifications';
import I18n from '../services/i18n';

export default function TaskFormScreen({ route, navigation }) {
  const editing = route.params?.task;

  const [title, setTitle] = useState(editing?.title || '');
  const [description, setDescription] = useState(editing?.description || '');
  const [dueDate, setDueDate] = useState(editing?.dueDate ? new Date(editing.dueDate) : null);
  const [notifyAt, setNotifyAt] = useState(editing?.notifyAt ? new Date(editing.notifyAt) : null);

  const [showDue, setShowDue] = useState(false);
  const [showDueTime, setShowDueTime] = useState(false);
  const [showNotify, setShowNotify] = useState(false);
  const [showNotifyTime, setShowNotifyTime] = useState(false);

  const openDate = (setterFlag) => setterFlag(true);

  const onChangeDate = (setterDate, setterFlag) => (_, d) => {
    setterFlag(false);
    if (d) setterDate(prev => {
   
      const base = prev || new Date();
      const nd = new Date(d);
      nd.setHours(base.getHours(), base.getMinutes(), 0, 0);
      return nd;
    });
  };
  const onChangeTime = (setterDate, setterFlag) => (_, t) => {
    setterFlag(false);
    if (t) setterDate(prev => {
      const base = prev || new Date();
      const nd = new Date(base);
      nd.setHours(t.getHours(), t.getMinutes(), 0, 0);
      return nd;
    });
  };

  const fmt = (d) => (d ? d.toLocaleString() : '');

  const save = async () => {
    const data = {
      title,
      description,
      dueDate: dueDate ? dueDate.toISOString() : null,
      notifyAt: notifyAt ? notifyAt.toISOString() : null
    };
    if (editing) {
      await updateTask(editing.id, data);
    } else {
      await createTask(data);
    }
    if (notifyAt) {
      await scheduleTaskNotification({ id: 't', title, when: notifyAt });
    }
    navigation.goBack();
  };

  return (
    <View style={{ padding:16, gap:12 }}>
      <TextInput label={I18n.t('title')} value={title} onChangeText={setTitle}/>
      <TextInput label={I18n.t('description')} value={description} onChangeText={setDescription} multiline/>

      {/* Prazo */}
      <TextInput
        label={I18n.t('dueDate')}
        value={fmt(dueDate)}
        editable={false}
        right={<TextInput.Icon icon="calendar" onPress={() => openDate(setShowDue)} />}
      />
      <Button mode="text" onPress={() => openDate(setShowDueTime)}>Definir hora do prazo</Button>

      {/* Notificação */}
      <TextInput
        label="Notificar em"
        value={fmt(notifyAt)}
        editable={false}
        right={<TextInput.Icon icon="bell" onPress={() => openDate(setShowNotify)} />}
      />
      <Button mode="text" onPress={() => openDate(setShowNotifyTime)}>Definir hora da notificação</Button>

      <Button mode="contained" onPress={save}>{I18n.t('save')}</Button>

      {/* Pickers */}
      {showDue && (
        <DateTimePicker
          value={dueDate || new Date()}
          mode="date"
          onChange={onChangeDate(setDueDate, setShowDue)}
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
        />
      )}
      {showDueTime && (
        <DateTimePicker
          value={dueDate || new Date()}
          mode="time"
          onChange={onChangeTime(setDueDate, setShowDueTime)}
          display="default"
        />
      )}
      {showNotify && (
        <DateTimePicker
          value={notifyAt || new Date()}
          mode="date"
          onChange={onChangeDate(setNotifyAt, setShowNotify)}
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
        />
      )}
      {showNotifyTime && (
        <DateTimePicker
          value={notifyAt || new Date()}
          mode="time"
          onChange={onChangeTime(setNotifyAt, setShowNotifyTime)}
          display="default"
        />
      )}
    </View>
  );
}
