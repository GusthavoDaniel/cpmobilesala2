INTEGRANTES

RM554681 - GUSTHAVO DANIEL DE SOUZA

RM555873 - Guilherme Damaiso Roselli

RM555161 - Lucas Miranda Leite




# Lista Tarefas Plus


Este projeto é um esqueleto de aplicativo móvel desenvolvido com React Native e Expo, baseado nos requisitos do CheckPoint 4 da disciplina de Mobile Application Development. Ele inclui a estrutura básica de pastas e as dependências recomendadas para facilitar o desenvolvimento das funcionalidades propostas.

## Funcionalidades Obrigatórias

As seguintes funcionalidades são esperadas para o aplicativo:

1.  **Autenticação:** Login com Google e provedor E-mail/Senha (via Firebase).
2.  **Login Persistente:** Manutenção da sessão do usuário (auto-login).
3.  **Armazenamento de Tarefas:** Tarefas armazenadas no Firestore, específicas por usuário.
4.  **Lista de Tarefas:** Sincronização em tempo real das tarefas.
5.  **Tema:** Suporte a tema claro/escuro com persistência.
6.  **Internacionalização (i18n):** Suporte a PT/EN com troca dinâmica de idioma.
7.  **Notificações Locais:** Agendamento de notificações associadas a tarefas.
8.  **API Externa:** Uso de TanStack Query para consumir dados de uma API externa (ex: motivacional, clima).

**Observação:** Cada usuário deve ter sua própria coleção de tarefas no Firestore.

## Ferramentas e Bibliotecas Recomendadas (já instaladas)

As seguintes bibliotecas foram instaladas neste projeto:

*   `@react-native-firebase/app`
*   `@react-native-firebase/auth`
*   `@react-native-firebase/firestore`
*   `@react-navigation/native`
*   `react-native-paper` (para componentes de UI)
*   `i18n-js` (para internacionalização)
*   `expo-notifications` (para notificações locais)
*   `@tanstack/react-query` (para consumo de API externa)

## Estrutura do Projeto

O projeto segue uma estrutura de pastas organizada para facilitar o desenvolvimento:

```
ListaTarefasPlus/
├── node_modules/
├── src/
│   ├── components/    # Componentes reutilizáveis da UI
│   ├── navigation/    # Configurações de navegação (React Navigation)
│   ├── screens/       # Telas principais do aplicativo
│   └── services/      # Serviços e lógicas de negócio (ex: Firebase, API)
├── App.js             # Ponto de entrada principal do aplicativo
├── app.json           # Configurações do Expo
├── babel.config.js    # Configuração do Babel
├── package.json       # Dependências e scripts do projeto
└── README.md          # Este arquivo
```

## Como Rodar o Projeto

Para configurar e executar este projeto em seu ambiente local:

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd ListaTarefasPlus
    ```

2.  **Instale as dependências:**
    As dependências já foram instaladas. Caso precise reinstalar ou adicionar novas:
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Inicie o servidor de desenvolvimento do Expo:**
    ```bash
    npx expo start
    ```

4.  **Abra no Expo Go:**
    *   No seu celular, baixe o aplicativo **Expo Go** (disponível para Android e iOS).
    *   Com o servidor de desenvolvimento rodando, escaneie o código QR exibido no terminal ou no navegador.
    *   O aplicativo será carregado no seu dispositivo.

## Próximos Passos

Este projeto fornece a base. Você precisará:

*   Configurar o Firebase para seu projeto (criar um projeto no console do Firebase, adicionar as configurações ao seu aplicativo).
*   Implementar a lógica de autenticação e armazenamento de dados no Firestore.
*   Desenvolver as telas e componentes da interface do usuário.
*   Integrar a API externa usando TanStack Query.
*   Implementar a internacionalização e as notificações locais.

Boa sorte com o desenvolvimento!

