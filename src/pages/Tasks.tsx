import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTasks } from '../contexts/TaskContext';
import { TaskItem } from '../components';
import '../styles/tasks.scss';

export const Tasks: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  
  const { user, logout } = useAuth();
  const { tasks, loading, addTask, updateTask, deleteTask, toggleTask } = useTasks();
  const navigate = useNavigate();

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      try {
        await addTask(title, description);
        setTitle('');
        setDescription('');
      } catch (err) {
        console.error('Error adding task:', err);
      }
    }
  };

  const handleEditStart = (taskId: string, taskTitle: string, taskDescription: string) => {
    setEditingId(taskId);
    setEditTitle(taskTitle);
    setEditDescription(taskDescription);
  };

  const handleEditSave = async (taskId: string) => {
    try {
      await updateTask(taskId, { title: editTitle, description: editDescription });
      setEditingId(null);
      setEditTitle('');
      setEditDescription('');
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  return (
    <div className="tasks-container">
      <div className="header">
        <h1>My Tasks App</h1>
        <div className="user-info">
          <span>{user?.email}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>

      <div className="tasks-content">
        <div className="add-task-section">
          <h2>Add New Task</h2>
          <form onSubmit={handleAddTask}>
            <input
              type="text"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Task description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
            <button type="submit">Add Task</button>
          </form>
        </div>

        <div className="tasks-list">
          <h2>Your Tasks ({tasks.length})</h2>
          {loading ? (
            <p className="loading">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="no-tasks">No tasks yet. Create your first task above!</p>
          ) : (
            <ul>
              {tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  isEditing={editingId === task.id}
                  editTitle={editTitle}
                  editDescription={editDescription}
                  onEditStart={() => handleEditStart(task.id, task.title, task.description)}
                  onEditSave={() => handleEditSave(task.id)}
                  onEditCancel={() => setEditingId(null)}
                  onEditTitleChange={setEditTitle}
                  onEditDescriptionChange={setEditDescription}
                  onToggle={() => toggleTask(task.id, task.done)}
                  onDelete={() => deleteTask(task.id)}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
