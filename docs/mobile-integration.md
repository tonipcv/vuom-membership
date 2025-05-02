# Guia de Integração Mobile

Este guia explica como integrar seu aplicativo React Native com a API Vuom.

## Endpoints de Autenticação

### Login

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

### Exemplo de Implementação em React Native

```javascript
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://app.vuom.live/api';

// Configure o cliente Axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
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
  await AsyncStorage.removeItem('authToken');
  await AsyncStorage.removeItem('userData');
};
```

## Solução de Problemas Comuns

### Erro de CORS

Se você estiver recebendo erros de CORS:

1. Verifique se está usando o endpoint correto (note o prefixo `/mobile/` para APIs específicas para dispositivos móveis)
2. Entre em contato com o administrador do sistema

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