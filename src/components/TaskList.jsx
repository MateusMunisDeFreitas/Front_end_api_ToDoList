import TaskItem from './TaskItem';
import '../styles/TaskList.css';

export default function TaskList({
  tarefas,
  onDeleteTarefa,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  editingId,
  editingText,
  setEditingText,
}) {
  if (tarefas.length === 0) {
    return (
      <div className="task-list-empty">
        <p>Ainda não há tarefas. Crie uma para começar!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tarefas.map((tarefa) => (
        <TaskItem
          key={tarefa.id}
          tarefa={tarefa}
          onDeleteTarefa={onDeleteTarefa}
          onStartEdit={onStartEdit}
          onSaveEdit={onSaveEdit}
          onCancelEdit={onCancelEdit}
          isEditing={editingId === tarefa.id}
          editingText={editingText}
          setEditingText={setEditingText}
        />
      ))}
    </div>
  );
}
