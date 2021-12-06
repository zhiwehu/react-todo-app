import { Box, Flex, Checkbox, Text, IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

const Todo = ({ todo, toggleTodoFinished, deleteTodo }) => {
  let bg;
  if (todo.type === 1) {
    bg = "lightgreen";
  } else if (todo.type === 2) {
    bg = "lightblue";
  } else if (todo.type === 3) {
    bg = "lightyellow";
  } else if (todo.type === 4) {
    bg = "pink";
  }

  let textDecorationLine;
  if (todo.finished) {
    textDecorationLine = "line-through";
  } else {
    textDecorationLine = "none";
  }
  return (
    <Box
      borderRadius="lg"
      as={Flex}
      bg={bg}
      height="80px"
      p={4}
      align="center"
      justifyContent="space-between"
      boxShadow="lg"
    >
      <Checkbox
        defaultIsChecked={todo.finished}
        onChange={() => toggleTodoFinished(todo.id)}
      />
      <Text textDecorationLine={textDecorationLine} m={4} flexGrow={1}>
        {todo.title}
      </Text>
      <IconButton
        onClick={() => deleteTodo(todo.id)}
        variant="none"
        icon={<DeleteIcon />}
      />
    </Box>
  );
};

export default Todo;
