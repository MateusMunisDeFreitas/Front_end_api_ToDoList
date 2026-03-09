import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tarefasAPI } from '../services/api';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import '../styles/Home.css';

export default function Home() {
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const navigate = useNavigate();

  const userName = localStorage.getItem('userName') || 'User';
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    
    loadTarefas();
  }, [token, navigate]);

  const loadTarefas = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await tarefasAPI.getTarefas();
      setTarefas(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
      if (err.message.includes('401') || err.message.includes('Token')) {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddTarefa = async (descricao) => {
    if (!descricao.trim()) {
      setError('Task description cannot be empty');
      return;
    }

    try {
      setError('');
      setLoading(true);
      
      // Nota: A API aceita user_id. Você pode precisar ajustar isso
      // dependendo de como a API retorna o user_id
      const newTarefa = await tarefasAPI.createTarefa(descricao, 1);
      
      setTarefas([...tarefas, newTarefa]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTarefa = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      setError('');
      setLoading(true);
      
      await tarefasAPI.deleteTarefa(id);
      setTarefas(tarefas.filter(t => t.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStartEdit = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  const handleSaveEdit = async (id) => {
    if (!editingText.trim()) {
      setError('Task description cannot be empty');
      return;
    }

    try {
      setError('');
      setLoading(true);
      
      await tarefasAPI.updateTarefa(id, editingText, 1);
      setTarefas(tarefas.map(t => 
        t.id === id ? { ...t, descricao: editingText } : t
      ));
      setEditingId(null);
      setEditingText('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-content">
          <h1>My Todo List</h1>
          <p className="user-info">Welcome, <strong>{userName}</strong></p>
        </div>
        <button onClick={handleLogout} className="btn-logout">Logout</button>
      </header>

      <main className="home-main">
        {error && <div className="error-message">{error}</div>}

        <TaskForm 
          onAddTarefa={handleAddTarefa}
          disabled={loading}
        />

        {loading ? (
          <div className="loading">Loading tasks...</div>
        ) : (
          <TaskList 
            tarefas={tarefas}
            onDeleteTarefa={handleDeleteTarefa}
            onStartEdit={handleStartEdit}
            onSaveEdit={handleSaveEdit}
            onCancelEdit={handleCancelEdit}
            editingId={editingId}
            editingText={editingText}
            setEditingText={setEditingText}
          />
        )}
      </main>
    </div>
  );
}
