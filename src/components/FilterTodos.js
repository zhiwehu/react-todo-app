import { RadioGroup, Radio, Stack, Badge } from "@chakra-ui/react";

const FilterTodos = ({ todoTypeFilter, onTodoTypeFilterChange }) => {
  return (
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
  );
};

export default FilterTodos;
