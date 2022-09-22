import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { PlusCircle } from "phosphor-react";
import { v4 as uuidv4 } from "uuid";

import { Header } from "./components/Header";
import { Counter } from "./components/Counter";
import { Task } from "./components/Task";

import imgClipboard from './assets/clipboard.svg';
  
import "./global.css";
import styles from "./App.module.css";

interface Task {
  id: string;
  content: string;
  completed: boolean;
}

export function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  function handleCreateTask(event: FormEvent) {
    event.preventDefault();

    setTasks((state) => [
      { id: uuidv4(), content: newTask, completed: false },
      ...state,
    ]);
    setNewTask("");
  }

  function newTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");

    setNewTask(event.target.value);
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório!");
  }

  function toggleTask(taskIdToToggle: string) {
    const taskToggled = tasks.map((task) => {
      if (task.id === taskIdToToggle) {
        task.completed = !task.completed;
      }
      return task;
    });

    taskToggled.sort((a) => (a.completed === true ? 1 : -1));

    setTasks(taskToggled);
  }

  function deleteTask(taskIdToDelete: string) {
    const tasksWithoutDeletedOne = tasks.filter((task) => {
      return task.id !== taskIdToDelete;
    });

    setTasks(tasksWithoutDeletedOne);
  }

  return (
    <div>
      <Header />

      <div className={styles.container}>
        <form onSubmit={handleCreateTask} className={styles.create}>
          <input
            type="text"
            value={newTask}
            required
            onChange={newTaskChange}
            onInvalid={handleNewTaskInvalid}
            placeholder="Adicione uma nova tarefa"
          />

          <button type="submit">
            <span>Criar</span>
            <PlusCircle size={16} className={styles.icon} />
          </button>
        </form>

        <div className={styles.content}>
          <div className={styles.contentHeader}>
            <Counter
              variant="created"
              text="Tarefas Criadas"
              itemsQuantity={tasks.length}
            />

            <Counter
              variant="concluded"
              text="Concluídas"
              completedItemsQuantity={tasks.filter((task) => task.completed === true).length}
              itemsQuantity={tasks.length}
            />
          </div>

          {tasks.length > 0 ? (
            <div className={styles.tasks}>
              {tasks.map((task) => {
                return (
                  <Task
                    key={task.id}
                    taskId={task.id}
                    content={task.content}
                    completed={task.completed}
                    onToggleTask={toggleTask}
                    onDeleteTask={deleteTask}
                  />
                );
              })}
            </div>
          ) : (
            <div className={styles.withoutTasks}>
                <img src={imgClipboard} />
                <p>Você ainda não tem tarefas cadastradas</p>
                <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
