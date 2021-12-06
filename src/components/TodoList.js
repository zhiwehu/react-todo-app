import { SimpleGrid } from "@chakra-ui/react";

import Todo from "./Todo";

const TodoList = ({ todosFiltered, toggleTodoFinished, deleteTodo }) => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4} width="full">
      {todosFiltered.map((todo, index) => (
        <Todo
          key={index}
          todo={todo}
          toggleTodoFinished={toggleTodoFinished}
          deleteTodo={deleteTodo}
        />
      ))}
    </SimpleGrid>
  );
};

export default TodoList;
