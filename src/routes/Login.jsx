import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  Stack,
  Text,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { gql, useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const jwtQuery = gql`
  query GetJwt($email: String!, $password: String!) {
    login(email: $email, rawPassword: $password) {
      jwt
      uuid
    }
  }
`;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [getJwt, { data }] = useLazyQuery(jwtQuery);
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      if (data.login.jwt) {
        navigate("/home", {
          state: { uuid: data.login.uuid, jwt: data.login.jwt },
        });
      } else {
        setLoginError(true);
      }
    }
  }, [data]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Heading>Login</Heading>
      <Stack spacing={3} marginTop={3}>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Stack>
      <Button
        marginTop={3}
        onClick={() => getJwt({ variables: { email, password } })}
      >
        Login
      </Button>
      {loginError ? (
        <Alert status="error" width={["100%", 300]} mt="1rem">
          <AlertIcon />
          Login error
        </Alert>
      ) : (
        <div />
      )}
    </Box>
  );
}
