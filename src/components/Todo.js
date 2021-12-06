import {
  Box,
  Flex,
  Checkbox,
  Text,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

const Todo = ({ todo, toggleTodoFinished, deleteTodo }) => {
  const { colorMode } = useColorMode();
  let bg;
  if (todo.type === 1) {
    bg = "green";
  } else if (todo.type === 2) {
    bg = "blue";
  } else if (todo.type === 3) {
    bg = "yellow";
  } else if (todo.type === 4) {
    bg = "pink";
  }
  if (colorMode === "light") {
    bg = bg + ".200";
  } else if (colorMode === "dark") {
    bg = bg + ".500";
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
