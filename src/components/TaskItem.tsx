import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import trashIcon from "../assets/icons/trash/trash.png";
import editIcon from "../assets/icons/edit/edit.png";
import { Task } from "./TasksList";

interface TasksListProps2 {
  tasks: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (taskId: any, taskNewTitle: any) => void;
}

export function TaskItem({
  editTask,
  toggleTaskDone,
  removeTask,
  tasks,
}: TasksListProps2) {
  const [edited, setEdited] = useState<boolean>(false);
  const [taskTitle, setTaskTitle] = useState<string>(tasks.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setEdited(true);
  }
  function handleCancelEditing() {
    setTaskTitle(tasks.title);
    setEdited(false);
  }
  function handleSubmitEditing() {
    editTask({ taskId: tasks.id }, { taskNewTitle: taskTitle });
    setEdited(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (edited) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [edited]);

  return (
    <>
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(tasks.id)}
        >
          <View
            style={
              tasks.done == true ? styles.taskMarkerDone : styles.taskMarker
            }
          >
            {tasks.done && <Icon name="check" size={12} color="#FFF" />}
          </View>
          <TextInput
            value={taskTitle}
            onChangeText={setTaskTitle}
            editable={edited}
            onSubmitEditing={handleSubmitEditing}
            style={tasks.done ? styles.taskTextDone : styles.taskText}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row" }}>
        {edited == true ? (
          <>
            <TouchableOpacity onPress={handleCancelEditing}>
              <Icon name="x" size={24} />
            </TouchableOpacity>
            <View style={{ paddingHorizontal: 36 }} />
          </>
        ) : (
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity onPress={handleStartEditing}>
              <Image style={{ height: 24, width: 24 }} source={editIcon} />
            </TouchableOpacity>
            <View
              style={{
                height: 24,
                width: 1,
                backgroundColor: "rgba(196, 196, 196, .27)",
                position: "absolute",
                left: 34,
              }}
            />
            <TouchableOpacity
              style={{ paddingHorizontal: 24 }}
              onPress={() => removeTask(tasks.id)}
            >
              <Image source={trashIcon} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  divider: {
    height: 24,
    width: 1,
    backgroundColor: "rgba(196, 196, 196, 0.24)",
  },
});
