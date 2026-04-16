import React from 'react';
import type { Task } from '../hooks/useFirebaseTasks';

interface TaskItemProps {
  task: Task;
  isEditing: boolean;
  editTitle: string;
  editDescription: string;
  onEditStart: () => void;
  onEditSave: () => void;
  onEditCancel: () => void;
  onEditTitleChange: (value: string) => void;
  onEditDescriptionChange: (value: string) => void;
  onToggle: () => void;
  onDelete: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  isEditing,
  editTitle,
  editDescription,
  onEditStart,
  onEditSave,
  onEditCancel,
  onEditTitleChange,
  onEditDescriptionChange,
  onToggle,
  onDelete,
}) => {
  if (isEditing) {
    return (
      <li className="task-item editing">
        <div className="edit-form">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => onEditTitleChange(e.target.value)}
            placeholder="Task title"
          />
          <textarea
            value={editDescription}
            onChange={(e) => onEditDescriptionChange(e.target.value)}
            placeholder="Task description"
            rows={2}
          />
          <div className="edit-actions">
            <button onClick={onEditSave} className="save-btn">Save</button>
            <button onClick={onEditCancel} className="cancel-btn">Cancel</button>
          </div>
        </div>
      </li>
    );
  }

  return (
    <li className={`task-item ${task.done ? 'done' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.done}
          onChange={onToggle}
          className="task-checkbox"
        />
        <div className="task-text">
          <h3>{task.title}</h3>
          {task.description && <p>{task.description}</p>}
        </div>
      </div>
      <div className="task-actions">
        <button onClick={onEditStart} className="edit-btn">Edit</button>
        <button onClick={onDelete} className="delete-btn">Delete</button>
      </div>
    </li>
  );
};

export default TaskItem;
