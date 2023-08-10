import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Select,
  Button,
  Textarea,
  Flex,
  ChakraProvider,
  useColorMode,
  Icon,
  Center
} from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import {SunIcon,MoonIcon } from '@chakra-ui/icons'// Import sun and moon icons
import axios from 'axios';

const customIcons = {
  light: {
    iconColor: '#333',
  },
  dark: {
    iconColor: '#fff',
  },
};

// Custom theme with light and dark mode colors
const customTheme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    light: {
      bg: '#f5f5f5',
      text: '#333',
    },
    dark: {
      bg: '#222',
      text: '#fff',
    },
  },
});

function App() {
  const [inputCode, setInputCode] = useState('');
  const [selectedFromLanguage, setSelectedFromLanguage] = useState('JavaScript');
  const [selectedToLanguage, setSelectedToLanguage] = useState('Python');
  const [convertedCode, setConvertedCode] = useState('');
  const [debuggedCode, setDebuggedCode] = useState('');
  const { colorMode, toggleColorMode } = useColorMode();

  const handleConvert = async () => {
    try {
      const response = await axios.post(
        'https://convertercode.onrender.com/code/convert',
        {
          code: inputCode,
          fromLanguage: selectedFromLanguage,
          toLanguage: selectedToLanguage,
        }
      );

      setConvertedCode(response.data.msg);
      setDebuggedCode(''); // Clear debuggedCode if any
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  const handleDebug = async () => {
    try {
      const response = await axios.post(
        'https://convertercode.onrender.com/code/debug',
        {
          code: inputCode,
          language: selectedFromLanguage,
        }
      );

      setDebuggedCode(response.data.msg);
      setConvertedCode(''); // Clear convertedCode if any
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  return (
    <ChakraProvider theme={customTheme}>
      {/* <CSSReset /> */}
      <Box mt={10} w={'full'} h={'90vh'}> {/* Box with shadow */}
        <Container maxW="container.xl"  h={'full'} boxShadow="lg" >
          {/* <Flex align="center" justify="space-around" mb="4"> */}
            <Box>
              <Heading size="xl" mb="2">
               <Center 
                  bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text'
                  fontSize='5xl'
                  fontWeight='extrabold'
                > Code Converter & Debugger App</Center>
              </Heading>
              <Center fontSize="2xl" fontWeight={'bold'}>Convert your code from one language to another</Center>
            </Box>
            <Button onClick={toggleColorMode} ml="95%" mb={10}> {/* Toggling logo at top-right corner */}
              <Icon 
              as={colorMode === 'light' ? MoonIcon : SunIcon} 
              color={customIcons[colorMode].iconColor}
              />
            </Button>
          {/* </Flex> */}
          <Flex flexDirection={{ base: 'column', md: 'row' }} gap="4"  h={'fit-content'}>
            <Box flex="1">
              <Select
                value={selectedFromLanguage}
                onChange={(e) => setSelectedFromLanguage(e.target.value)}
                mb="4"
              >
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="C++">C++</option>
                <option value="C">C</option>
                {/* Add more language options here */}
              </Select>
              <Textarea
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="Enter your code here..."
                size="lg"
                resize="vertical"
                bg={colorMode === 'light' ? 'white' : 'gray.800'}
                color={colorMode === 'light' ? 'black' : 'white'}
              />
            </Box>
            <Box flex="1">
              {/* <Box> */}
              {/* <VStack spacing="4"> */}
                
                <Select
                  value={selectedToLanguage}
                  onChange={(e) => setSelectedToLanguage(e.target.value)}
                >
                  <option value="Python">Python</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Java">Java</option>
                  <option value="C++">C++</option>
                  <option value="C">C</option>
                  {/* Add more language options here */}
                </Select>
                <Button colorScheme="twitter" w={'50%'} onClick={handleConvert} display={'block'} m={'auto'} mt={5} mb={5}>
                  Convert
                </Button>

                <Textarea
                  value={convertedCode}
                  isReadOnly
                  placeholder="Converted code will appear here..."
                  size="lg"
                  resize="vertical"
                  bg={colorMode === 'light' ? 'white' : 'gray.800'}
                  color={colorMode === 'light' ? 'black' : 'white'}
                />
                </Box>
                <Box flex="1">
                <Button colorScheme="twitter" w={'50%'} onClick={handleDebug} display={'block'} m={'auto'}  mb={5}>
                  Debug
                </Button>
                <Textarea
                  value={debuggedCode}
                  isReadOnly
                  placeholder="Debugged code will appear here..."
                  size="lg"
                  resize="vertical"
                  bg={colorMode === 'light' ? 'white' : 'gray.800'}
                  color={colorMode === 'light' ? 'black' : 'white'}
                />
              {/* </VStack> */}
              </Box>
            
          </Flex>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;

