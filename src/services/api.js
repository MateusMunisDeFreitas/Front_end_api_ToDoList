const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Função auxiliar para fazer requisições
const makeRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  let headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.menssage || 'Erro na requisição');
  }

  return data;
};

// AUTENTICAÇÃO
export const authAPI = {
  // Sign Up - criar novo usuário 
  async signup(nome, senha) {
    return makeRequest('/singup', {
      method: 'POST',
      body: JSON.stringify({ nome, senha }),
    });
  },

  // Login - autenticar usuário e obter token
  async login(nome, senha) {
    return await makeRequest('/login', {
      method: 'POST',
      body: JSON.stringify({ nome, senha }),
    });
  },

  // Listar todos os usuários (rota de teste)
  async getAllUsers() {
    return makeRequest('/login/teste', {
      method: 'GET',
    });
  },
};

// TAREFAS
export const tarefasAPI = {
  // Listar todas as tarefas do usuário
  async getTarefas(id) {
    return makeRequest(`/home/tarefas?id=${id}`, {
      method: 'GET'
    });
  },

  // Criar nova tarefa
  async createTarefa(descricao, user_id) {
    return makeRequest('/home/tarefas', {
      method: 'POST',
      body: JSON.stringify({ descricao, user_id }),
    });
  },

  // Atualizar uma tarefa
  async updateTarefa(id, descricao, user_id) {
    return makeRequest(`/home/tarefas?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify({ descricao, user_id }),
    });
  },

  // Deletar uma tarefa
  async deleteTarefa(id) {
    return makeRequest(`/home/tarefas?id=${id}`, {
      method: 'DELETE',
    });
  },
};

export default {
  authAPI,
  tarefasAPI,
};
