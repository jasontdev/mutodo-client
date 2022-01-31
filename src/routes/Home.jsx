import { Box } from '@chakra-ui/react';
import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Home() {
  const { jwt } = useLocation().state;

  return <Box display="flex" flexDirection="column" alignItems="center"></Box>;
}
