import React from 'react';
import { Box, Button, Heading, Input, Stack } from '@chakra-ui/react';

export default function Login() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Heading>Login</Heading>
      <Stack spacing={3} marginTop={3}>
        <Input placeholder="Email" />
        <Input placeholder="Password" />
      </Stack>
      <Button marginTop={3}>Login</Button>
    </Box>
  );
}
