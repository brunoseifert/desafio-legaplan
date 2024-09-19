"use client";

import { useState, useEffect } from "react";
import "../styles/global.scss";
import Image from "next/image";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      const newTaskObj: Task = {
        id: Date.now(),
        text: newTask,
        completed: false,
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask("");
      setShowModal(false);
    }
  };

  const toggleCompleteTask = (taskId: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const confirmDeleteTask = (taskId: number) => {
    setShowDeleteModal(true);
    setTaskToDelete(taskId);
  };

  const deleteTask = () => {
    if (taskToDelete !== null) {
      const updatedTasks = tasks.filter((task) => task.id !== taskToDelete);
      setTasks(updatedTasks);
      setShowDeleteModal(false);
      setTaskToDelete(null);
    }
  };

  return (
    <div className="layout">
      <main className="container">
        {tasks.length === 0 ? (
          <h2>Não há tarefas no momento.</h2>
        ) : (
          <>
            <h2>Suas tarefas de hoje</h2>
            <ul className="task-list">
              {tasks
                .filter((task) => !task.completed)
                .map((task) => (
                  <li key={task.id}>
                    <label className="checkbox-wrapper">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleCompleteTask(task.id)}
                      />
                      <span className="checkbox-custom"></span>
                      <span>{task.text}</span>
                    </label>
                    <span
                      onClick={() => confirmDeleteTask(task.id)}
                      className="trash"
                    >
                      <Image
                        src="/assets/trash.svg"
                        alt="Excluir"
                        width={24}
                        height={24}
                      />
                    </span>
                  </li>
                ))}
            </ul>

            <h2>Tarefas finalizadas</h2>
            <ul className="task-list completed-tasks">
              {tasks
                .filter((task) => task.completed)
                .map((task) => (
                  <li key={task.id}>
                    <label className="checkbox-wrapper">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleCompleteTask(task.id)}
                      />
                      <span className="checkbox-custom"></span>
                      <p>{task.text}</p>
                    </label>
                    <span
                      onClick={() => confirmDeleteTask(task.id)}
                      className="trash"
                    >
                      <Image
                        src="/assets/trash.svg"
                        alt="Excluir"
                        width={24}
                        height={24}
                      />
                    </span>
                  </li>
                ))}
            </ul>
          </>
        )}

        {/* Modal de nova tarefa */}
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Nova Tarefa</h2>
              <p>Titulo</p>
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Digite"
              />
              <div className="button">
                <button onClick={() => setShowModal(false)}>Cancelar</button>
                <button onClick={addTask}>Adicionar</button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de exclusão */}
        {showDeleteModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Deletar Tarefa</h2>
              <p className="P-Delete">
                Tem certeza que deseja deletar essa tarefa?
              </p>
              <div className="button">
                <button onClick={() => setShowDeleteModal(false)}>
                  Cancelar
                </button>
                <button onClick={deleteTask} className="delete-button">
                  Excluir
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <button onClick={() => setShowModal(true)} className="new-task-button">
        Adicionar nova tarefa
      </button>
    </div>
  );
}
