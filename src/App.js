import { useState, useEffect } from "react";
import { v4 as uuid4 } from "uuid";
import { Flex, Heading, Text } from "@chakra-ui/react";

import AddTodo from "./components/AddTodo";
import FilterTodos from "./components/FilterTodos";
import TodoList from "./components/TodoList";

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

  const [todoTypeFilter, setTodoTypeFilter] = useState("0");
  const [todoTitle, setTodoTitle] = useState("");
  const [todoType, setTodoType] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [todoTitleIsInvalid, setTodoTitleIsInvalid] = useState(false);
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
    <Flex direction="column" minH="100vh" justifyContent="space-between">
      <Flex
        w="full"
        bg="white"
        direction="column"
        zIndex={100}
        position="fixed"
        as="header"
        align="center"
        justifyContent="center"
        boxShadow="lg"
      >
        <Flex
          justify="center"
          p={4}
          w="full"
          bgGradient="linear(to-r, cyan.200, purple.500)"
        >
          <Heading color="white" as="h1">
            Another Todo App
          </Heading>
        </Flex>

        <AddTodo
          drawerOpen={drawerOpen}
          todoTitleIsInvalid={todoTitleIsInvalid}
          addTodo={addTodo}
          setTodoTitle={setTodoTitle}
          setTodoType={setTodoType}
          setDrawerOpen={setDrawerOpen}
        />

        <FilterTodos
          todoTypeFilter={todoTypeFilter}
          onTodoTypeFilterChange={onTodoTypeFilterChange}
        />
      </Flex>

      <Flex
        mt={{ base: "400px", md: "220px" }}
        w="full"
        direction="column"
        as="main"
        flexGrow={1}
        overflow="auto"
        p={4}
      >
        <TodoList
          todosFiltered={todosFiltered}
          toggleTodoFinished={toggleTodoFinished}
          deleteTodo={deleteTodo}
        />
      </Flex>

      <Flex
        as="footer"
        bg="cyan.100"
        justifyContent="center"
        align="center"
        p={4}
      >
        <Text>Made by React. Copyright &copy; 2021</Text>
      </Flex>
    </Flex>
  );
};

export default App;
