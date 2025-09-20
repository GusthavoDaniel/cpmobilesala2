import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import I18n from '../services/i18n';
import { loginEmail, signupEmail } from '../services/auth';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../services/firebase';

WebBrowser.maybeCompleteAuthSession();

const ANDROID_CLIENT_ID = "SEU_ANDROID_CLIENT_ID.apps.googleusercontent.com";
const IOS_CLIENT_ID = "SEU_IOS_CLIENT_ID.apps.googleusercontent.com";
const WEB_CLIENT_ID = "SEU_WEB_CLIENT_ID.apps.googleusercontent.com"; 


export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    webClientId: WEB_CLIENT_ID,
    expoClientId: WEB_CLIENT_ID, 
    scopes: ['profile', 'email']
  });

  useEffect(() => {
    const handle = async () => {
      if (response?.type === 'success') {
        const idToken = response.authentication?.idToken;
        if (!idToken) return;
        const cred = GoogleAuthProvider.credential(idToken);
        await signInWithCredential(auth, cred);
      } else if (response?.type === 'error') {
        setErr('Google login falhou');
      }
    };
    handle();
  }, [response]);

  const doLogin = async () => {
    setBusy(true); setErr('');
    try { await loginEmail(email, pass); } catch (e) { setErr(e.message); }
    setBusy(false);
  };
  const doSignup = async () => {
    setBusy(true); setErr('');
    try { await signupEmail(email, pass); } catch (e) { setErr(e.message); }
    setBusy(false);
  };

  return (
    <View style={{ padding:16, gap:12 }}>
      <Text variant="headlineSmall">{I18n.t('login')}</Text>
      <TextInput label={I18n.t('email')} value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput label={I18n.t('password')} value={pass} onChangeText={setPass} secureTextEntry />
      {!!err && <Text style={{ color:'red' }}>{err}</Text>}
      <Button mode="contained" onPress={doLogin} loading={busy}>{I18n.t('login')}</Button>
      <Button onPress={doSignup}>Criar conta</Button>
      <Button
        icon="google"
        mode="outlined"
        disabled={!request}
        onPress={() => promptAsync()}
      >
        Entrar com Google
      </Button>
    </View>
  );
}
