import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const DATA = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };
    if (tasks.find((e) => e.title == DATA.title)) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
    } else {
      setTasks((oldState) => [...oldState, DATA]);
    }
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map((task) => ({ ...task }));

    const results = updatedTasks.find((e) => e.id == id);

    if (results) {
      results.done = !results.done;
      setTasks(updatedTasks);
    }
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => {
            setTasks(tasks.filter((item) => item.id !== id));
          },
          style: "cancel",
        },
      ]
    );
  }

  function handleEditTask({ taskId, taskNewTitle }: any) {
    const updatedTasks = tasks.map((task) => ({ ...task }));

    const results = updatedTasks.find(
      (element) => element.id == taskId || element.title == taskNewTitle
    );
    if (results) {
      results.title = taskNewTitle;
      setTasks(updatedTasks);
    }
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        editTask={handleEditTask}
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
