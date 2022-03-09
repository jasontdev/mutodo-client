import React from "react";
import { gql, useMutation } from "@apollo/client";
import {
  Text,
  Heading,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

const tasklistMutation = gql`
  mutation CreateTasklist($users: [String]!, $title: String!) {
    createTaskList(users: $users, title: $title) {
      id
    }
  }
`;

export default function CreateTasklist() {
  // TODO get uuid in state from previous route
  const { register, handleSubmit } = useForm();
  const [createTasklist, { data }] = useMutation(tasklistMutation);
  const { uuid, jwt } = useLocation().state;

  const onSubmit = (formData) => {
    createTasklist({ variables: { users: [uuid], title: formData.title } });
  };

  return (
    <Box display="flex" justifyContent="center">
      <Box width={["100%", 650]}>
        <Heading>Create task list</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel htmlFor="title">Tasklist name</FormLabel>
            <Input {...register("title")} />
            <Button type="submit">Create</Button>
          </FormControl>
        </form>
      </Box>
    </Box>
  );
}
