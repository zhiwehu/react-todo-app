import { useState, useEffect } from "react";
import { v4 as uuid4 } from "uuid";
import {
  Flex,
  Box,
  Heading,
  Text,
  SimpleGrid,
  Button,
  VStack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerCloseButton,
  Input,
  Select,
  RadioGroup,
  Radio,
  Stack,
  Badge,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import Todo from "./components/Todo";

const App = () => {
  const initTodos = [
    {
      id: 1,
      title: "不重要的事情",
      type: 1,
      finished: false,
    },
    {
      id: 2,
      title: "重要的事情",
      type: 2,
      finished: false,
    },
    {
      id: 3,
      title: "紧急的事情",
      type: 3,
      finished: false,
    },
    {
      id: 4,
      title: "重要+紧急的事情",
      type: 4,
      finished: false,
    },
  ];

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [todoTitle, setTodoTitle] = useState("");
  const [todoTitleIsInvalid, setTodoTitleIsInvalid] = useState(false);
  const [todoType, setTodoType] = useState(1);
  const [todoTypeFilter, setTodoTypeFilter] = useState("0");

  const [todos, setTodos] = useState(() => {
    const localTodos = JSON.parse(localStorage.getItem("todos")) || initTodos;
    return localTodos;
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  let todosFiltered = todos;
  if (todoTypeFilter > 0) {
    todosFiltered = todos.filter(
      (todo) => todo.type === parseInt(todoTypeFilter)
    );
  }
  todosFiltered.sort((t1, t2) => t2.type - t1.type);

  const onDrawerClose = () => {
    setDrawerOpen(false);
  };

  const onDrawerOpen = () => {
    setDrawerOpen(true);
    setTodoTitle("");
    setTodoType(1);
  };

  const todoTitleOnChange = (e) => {
    setTodoTitle(e.target.value);
  };

  const todoTitleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const todoTypeOnChange = (e) => {
    setTodoType(parseInt(e.target.value));
  };

  const onTodoTypeFilterChange = (value) => {
    setTodoTypeFilter(value);
  };

  const addTodo = () => {
    if (todoTitle === "") {
      setTodoTitleIsInvalid(true);
    } else {
      const todo = {
        id: uuid4(),
        title: todoTitle,
        type: todoType,
        finished: false,
      };
      setTodos([...todos, todo]);
      setDrawerOpen(false);
    }
  };

  const toggleTodoFinished = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, finished: !todo.finished } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <Flex
      direction="column"
      h="100vh"
      justifyContent="space-between"
      overflow="hidden"
    >
      <Flex
        as="header"
        bg="cyan.100"
        align="center"
        justifyContent="center"
        p={4}
      >
        <Heading as="h1">Another Todo App</Heading>
      </Flex>

      <Flex
        w="full"
        direction="column"
        as="main"
        bg="gray.100"
        flexGrow={1}
        overflow="auto"
        p={4}
      >
        <Box p={4} w="full" textAlign="center">
          <Button
            size="lg"
            w={{ base: "100%", md: "auto" }}
            leftIcon={<AddIcon />}
            variant="solid"
            colorScheme="green"
            onClick={onDrawerOpen}
          >
            Add
          </Button>
        </Box>

        <Drawer placement="top" onClose={onDrawerClose} isOpen={drawerOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Add a todo</DrawerHeader>
            <DrawerBody>
              <VStack spacing={4}>
                <Input
                  size="lg"
                  required
                  isInvalid={todoTitleIsInvalid}
                  autoFocus
                  placeholder="Todo Title"
                  onKeyPress={todoTitleOnKeyPress}
                  onChange={todoTitleOnChange}
                />
                <Select size="lg" onChange={todoTypeOnChange}>
                  <option value="1">不重要不紧急</option>
                  <option value="2">重要</option>
                  <option value="3">紧急</option>
                  <option value="4">重要+紧急</option>
                </Select>
              </VStack>
            </DrawerBody>
            <DrawerFooter>
              <Button size="lg" colorScheme="green" onClick={addTodo}>
                Save
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        <RadioGroup value={todoTypeFilter} onChange={onTodoTypeFilterChange}>
          <Stack
            p={4}
            align="center"
            justifyContent="center"
            spacing={4}
            direction={{ base: "column", md: "row" }}
          >
            <Radio size="lg" value="0">
              <Badge fontSize="lg">全部</Badge>
            </Radio>
            <Radio size="lg" colorScheme="green" value="1">
              <Badge fontSize="lg" colorScheme="green">
                不重要不紧急
              </Badge>
            </Radio>
            <Radio size="lg" colorScheme="blue" value="2">
              <Badge fontSize="lg" colorScheme="blue">
                重要
              </Badge>
            </Radio>
            <Radio size="lg" colorScheme="yellow" value="3">
              <Badge fontSize="lg" colorScheme="yellow">
                紧急
              </Badge>
            </Radio>
            <Radio size="lg" colorScheme="red" value="4">
              <Badge fontSize="lg" colorScheme="red">
                重要+紧急
              </Badge>
            </Radio>
          </Stack>
        </RadioGroup>

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 4 }}
          spacing={4}
          width="full"
        >
          {todosFiltered.map((todo, index) => (
            <Todo
              key={index}
              todo={todo}
              toggleTodoFinished={toggleTodoFinished}
              deleteTodo={deleteTodo}
            />
          ))}
        </SimpleGrid>
      </Flex>

      <Flex
        as="footer"
        bg="cyan.100"
        justifyContent="center"
        align="center"
        p={4}
      >
        <Text>Copyright &copy; 2021</Text>
      </Flex>
    </Flex>
  );
};

export default App;
