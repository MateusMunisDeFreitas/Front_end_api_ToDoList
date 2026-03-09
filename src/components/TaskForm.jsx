import { useState } from 'react';
import '../styles/TaskForm.css';

export default function TaskForm({ onAddTarefa, disabled }) {
  const [descricao, setDescricao] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (descricao.trim()) {
      onAddTarefa(descricao);
      setDescricao('');
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Add a new task..."
          disabled={disabled}
          className="task-input"
        />
        <button 
          type="submit" 
          disabled={disabled || !descricao.trim()}
          className="btn-add"
        >
          Add Task
        </button>
      </div>
    </form>
  );
}
