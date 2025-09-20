import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { Button, RadioButton, Text } from 'react-native-paper';
import { ThemeContext } from '../services/theme';
import I18n, { setLocale } from '../services/i18n';

export default function SettingsScreen() {
  const { themeName, toggleTheme } = useContext(ThemeContext);
  const [lang, setLang] = useState(I18n.locale.startsWith('pt') ? 'pt' : 'en');

  const changeLang = async (l) => {
    setLang(l);
    await setLocale(l);
  };

  return (
    <View style={{ padding:16, gap:16 }}>
      <Text variant="titleLarge">{I18n.t('settings')}</Text>

      <Text>{I18n.t('theme')}</Text>
      <Button mode="outlined" onPress={toggleTheme}>
        {themeName === 'light' ? 'Claro' : 'Escuro'}
      </Button>

      <Text>{I18n.t('language')}</Text>
      <RadioButton.Group onValueChange={changeLang} value={lang}>
        <RadioButton.Item label="Português" value="pt" />
        <RadioButton.Item label="English" value="en" />
      </RadioButton.Group>
    </View>
  );
}
