import React from 'react';
import { Box, Button, Heading, Input, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react/cjs/react.development';
import { gql, useLazyQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const jwtQuery = gql`
  query GetJwt($email: String!, $password: String!) {
    login(email: $email, rawPassword: $password) {
      jwt
    }
  }
`;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [getJwt, { data }] = useLazyQuery(jwtQuery);
  const navigate = useNavigate();

  const handleData = () => {
    if (data) {
      if (data.login.jwt) {
        navigate('/home', { state: { jwt: data.login.jwt } });
      } else {
        return (
          <Text color="red" marginTop={3}>
            Login error. Are your email and password correct?
          </Text>
        );
      }
    }
    return <div />;
  };

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
      {handleData()}
    </Box>
  );
}
