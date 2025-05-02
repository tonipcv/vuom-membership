# Guia de Integração Mobile

Este guia explica como integrar seu aplicativo React Native com a API Vuom.

## Endpoints de Autenticação

### Login Mobile (Simplificado)

**Endpoint**: `https://app.vuom.live/api/auth/mobile/signin`
**Método**: POST
**Corpo**:
```json
{
  "email": "seu-email@exemplo.com",
  "password": "sua-senha"
}
```

**Resposta de Sucesso**:
```json
{
  "user": {
    "id": "user-id",
    "name": "Nome do Usuário",
    "email": "email@exemplo.com",
    "isPremium": false
  },
  "token": "jwt-token-para-autenticacao"
}
```

### Token CSRF

**Endpoint**: `https://app.vuom.live/api/auth/csrf`
**Método**: GET

**Resposta**:
```json
{
  "csrfToken": "token-csrf"
}
```

### Login com Credenciais

**Endpoint**: `https://app.vuom.live/api/auth/callback/credentials`
**Método**: POST
**Corpo**:
```json
{
  "email": "seu-email@exemplo.com",
  "password": "sua-senha",
  "csrfToken": "token-obtido-da-requisicao-csrf",
  "redirect": true,
  "callbackUrl": "/dashboard"
}
```

### Obter Sessão

**Endpoint**: `https://app.vuom.live/api/auth/session`
**Método**: GET

**Resposta**:
```json
{
  "user": {
    "id": "user-id",
    "name": "Nome do Usuário",
    "email": "email@exemplo.com",
    "isPremium": false
  }
}
```

### Logout

**Endpoint**: `https://app.vuom.live/api/auth/signout`
**Método**: POST
**Corpo**:
```json
{
  "callbackUrl": "/"
}
```

### Registro

**Endpoint**: `https://app.vuom.live/api/auth/register`
**Método**: POST
**Corpo**:
```json
{
  "name": "Nome Completo",
  "email": "seu-email@exemplo.com",
  "password": "sua-senha",
  "region": "BR"
}
```

**Resposta**:
```json
{
  "user": {
    "id": "user-id",
    "name": "Nome Completo",
    "email": "seu-email@exemplo.com",
    "region": "BR"
  }
}
```

### Recuperação de Senha

**Endpoint**: `https://app.vuom.live/api/auth/forgot-password`
**Método**: POST
**Corpo**:
```json
{
  "email": "seu-email@exemplo.com"
}
```

### Redefinir Senha

**Endpoint**: `https://app.vuom.live/api/auth/reset-password`
**Método**: POST
**Corpo**:
```json
{
  "token": "token-de-recuperacao",
  "password": "nova-senha"
}
```

### Verificar Email

**Endpoint**: `https://app.vuom.live/api/auth/verify-email?token=token-de-verificacao`
**Método**: GET

## Exemplo de Implementação em React Native

```javascript
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://app.vuom.live/api';

// Configure o cliente Axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Adicionar o token em todas as requisições
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Função de login
export const login = async (email, password) => {
  try {
    console.log('Configuração do axios:', JSON.stringify(api.defaults));
    
    const response = await api.post('/auth/mobile/signin', {
      email,
      password,
    });
    
    // Armazenar o token JWT
    await AsyncStorage.setItem('authToken', response.data.token);
    // Armazenar dados do usuário
    await AsyncStorage.setItem('userData', JSON.stringify(response.data.user));
    
    return response.data;
  } catch (error) {
    console.error('Erro no login:', error);
    throw error;
  }
};

// Função para verificar se o usuário está autenticado
export const checkAuth = async () => {
  const token = await AsyncStorage.getItem('authToken');
  const userData = await AsyncStorage.getItem('userData');
  
  if (token && userData) {
    return JSON.parse(userData);
  }
  return null;
};

// Função de logout
export const logout = async () => {
  try {
    // Opcional: notificar o servidor sobre o logout
    await api.post('/auth/signout');
  } catch (error) {
    console.error('Erro ao fazer logout no servidor:', error);
  } finally {
    // Mesmo se falhar no servidor, limpar dados locais
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('userData');
  }
};

// Função para registro
export const register = async (name, email, password, region = 'BR') => {
  try {
    const response = await api.post('/auth/register', {
      name,
      email,
      password,
      region,
    });
    return response.data;
  } catch (error) {
    console.error('Erro no registro:', error);
    throw error;
  }
};

// Função para recuperação de senha
export const forgotPassword = async (email) => {
  try {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  } catch (error) {
    console.error('Erro na recuperação de senha:', error);
    throw error;
  }
};

// Função para redefinir senha
export const resetPassword = async (token, newPassword) => {
  try {
    const response = await api.post('/auth/reset-password', {
      token,
      password: newPassword,
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao redefinir senha:', error);
    throw error;
  }
};
```

## Solução de Problemas Comuns

### Erro de CORS

Se você estiver recebendo erros de CORS:

1. Verifique se está usando HTTPS e não HTTP
2. Verifique se está usando o endpoint correto (note o prefixo `/auth/mobile/` para APIs específicas para dispositivos móveis)
3. Entre em contato com o administrador do sistema

### Erros de Rede

Se estiver recebendo erros de rede:

1. Verifique sua conexão com a internet
2. Certifique-se de que está usando HTTPS
3. Verifique se o certificado do servidor é válido
4. Em dispositivos Android, adicione a configuração de rede no AndroidManifest.xml:

```xml
<application
  ...
  android:usesCleartextTraffic="true">
```

5. Para iOS, adicione nas configurações de Info.plist:

```xml
<key>NSAppTransportSecurity</key>
<dict>
  <key>NSAllowsArbitraryLoads</key>
  <true/>
</dict>
``` 