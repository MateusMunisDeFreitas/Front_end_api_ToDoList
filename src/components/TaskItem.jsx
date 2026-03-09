import '../styles/TaskItem.css';

export default function TaskItem({
  tarefa,
  onDeleteTarefa,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  isEditing,
  editingText,
  setEditingText,
}) {
  return (
    <div className="task-item">
      {isEditing ? (
        <div className="task-edit">
          <input
            type="text"
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
            className="task-edit-input"
            autoFocus
          />
          <div className="task-edit-actions">
            <button
              onClick={() => onSaveEdit(tarefa.id)}
              className="btn-save"
            >
              Save
            </button>
            <button
              onClick={onCancelEdit}
              className="btn-cancel"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <span className="task-text">{tarefa.descricao}</span>
          <div className="task-actions">
            <button
              onClick={() => onStartEdit(tarefa.id, tarefa.descricao)}
              className="btn-edit"
            >
              Edit
            </button>
            <button
              onClick={() => onDeleteTarefa(tarefa.id)}
              className="btn-delete"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
