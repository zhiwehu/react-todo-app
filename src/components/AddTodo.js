import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  VStack,
  Input,
  Select,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const AddTodo = ({
  drawerOpen,
  todoTitleIsInvalid,
  addTodo,
  setTodoTitle,
  setTodoType,
  setDrawerOpen,
}) => {
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

  return (
    <>
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
    </>
  );
};

export default AddTodo;
