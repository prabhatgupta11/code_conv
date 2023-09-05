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
  Center,
  color
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
      <Box mt={10} w={'full'} h={'120vh'}> {/* Box with shadow */}
        <Container maxW="container.xl"  h={'full'} boxShadow="lg" style={{
        backgroundColor: '#C0DED0',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}>
          {/* <Flex align="center" justify="space-around" mb="4"> */}
            <Box style={{
        backgroundColor: '#076060',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}>
              <Heading size="xl" mb="2">
               <Center 
                  bgGradient='linear(to-l, #7928CA, #FF0)' bgClip='text'
                  fontSize='5xl'
                  fontWeight='extrabold'
                > Converter & Debugger </Center>
              </Heading>
              <Center fontSize="2xl" style={{color:"#FFFFFF"}} fontWeight={'bold'}>Convert your code </Center>
            </Box>
            <Button onClick={toggleColorMode} ml="95%" mb={10}> {/* Toggling logo at top-right corner */}
              <Icon 
              as={colorMode === 'light' ? MoonIcon : SunIcon} 
              color={customIcons[colorMode].iconColor}
              />
            </Button>
          {/* </Flex> */}
          <Flex flexDirection={{ base: 'column', md: 'row' }} gap="4"  h={'fit-content'}  style={{
        backgroundColor: '#076060',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }} >
            <Box flex="1" >
              <Select  color='white'
                value={selectedFromLanguage}
                onChange={(e) => setSelectedFromLanguage(e.target.value)}
                mb="4"
              >
            
                <option value="C++">C++</option>
                <option value="C">C</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                {/* Add more language options here */}
              </Select>
              <Textarea
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="Enter your code here..."
                size="lg"
                style={{ minHeight: '400px' , backgroundColor: '#C0DED0',
                padding: '20px',
                borderRadius: '5px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', }}
                resize="vertical"
                bg={colorMode === 'light' ? 'white' : 'gray.800'}
                color={colorMode === 'light' ? 'black' : 'white'}
             
              />
            </Box>
            <Box flex="1">
              {/* <Box> */}
              {/* <VStack spacing="4"> */}
                
                <Select color='white'
                  value={selectedToLanguage}
                  onChange={(e) => setSelectedToLanguage(e.target.value)}
                >
                
                  <option value="C++" >C++</option>
                  <option value="C">C</option>
                  <option value="Python">Python</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Java">Java</option>
                  {/* Add more language options here */}
                </Select>
              

                <Textarea
                  value={convertedCode}
                  isReadOnly
                  placeholder="Converted code will appear here..."
                  size="lg"
                  resize="vertical"
                  style={{ minHeight: '400px', backgroundColor: '#C0DED0' ,marginTop:"15px"}}
                  bg={colorMode === 'light' ? 'white' : 'gray.800'}
                  color={colorMode === 'light' ? 'black' : 'white'}
                />
                </Box>
                <Box flex="1">
            
                <Textarea
                  value={debuggedCode}
                  isReadOnly
                  placeholder="Debugged code will appear here..."
                  size="lg"
                  style={{ minHeight: '400px', backgroundColor: '#C0DED0' ,marginTop:"54px" }}
                  resize="vertical"
                  bg={colorMode === 'light' ? 'white' : 'gray.800'}
                  color={colorMode === 'light' ? 'black' : 'white'}
                />
                
                 <Flex  gap="10px">
                 <Button colorScheme="twitter" w={'50%'} onClick={handleConvert} display={'block'} m={'auto'} mt={5} mb={5}>
                  Convert
                </Button>
                <Button colorScheme="twitter" w={'50%'} onClick={handleDebug} display={'block'} m={'auto'}  mb={5}>
                  Debug
                </Button>
                 </Flex>

              {/* </VStack> */}
              </Box>
            
          </Flex>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;

