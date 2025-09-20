
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const translations = {
  pt: {
    login: 'Entrar',
    email: 'E-mail',
    password: 'Senha',
    logout: 'Sair',
    tasks: 'Tarefas',
    newTask: 'Nova Tarefa',
    title: 'Título',
    description: 'Descrição',
    save: 'Salvar',
    settings: 'Configurações',
    theme: 'Tema',
    language: 'Idioma',
    dueDate: 'Prazo'
  },
  en: {
    login: 'Sign in',
    email: 'Email',
    password: 'Password',
    logout: 'Logout',
    tasks: 'Tasks',
    newTask: 'New Task',
    title: 'Title',
    description: 'Description',
    save: 'Save',
    settings: 'Settings',
    theme: 'Theme',
    language: 'Language',
    dueDate: 'Due date'
  }
};


const i18n = new I18n(translations);
i18n.enableFallback = true; 

export const loadLocale = async () => {
  const saved = await AsyncStorage.getItem('@locale');
  i18n.locale = saved || Localization.locale || 'pt-BR';
};

export const setLocale = async (locale) => {
  i18n.locale = locale;
  await AsyncStorage.setItem('@locale', locale);
};


loadLocale();

export default i18n;
