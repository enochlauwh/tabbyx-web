// Base component template from https://chakra-templates.dev/

import {
  Box,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Select,
} from '@chakra-ui/react';
import { useState } from 'react';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar } from 'react-modern-calendar-datepicker';

const BookingPage = () => {
  const [selectedDay, setSelectedDay] = useState(null);

  return (
    <Box position={'relative'}>
      <Container
        as={SimpleGrid}
        maxW={'7xl'}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 2 }}
        py={{ base: 2, sm: 5, lg: 8 }}
      >
        <Stack maxW={'md'} alignItems="center">
          <Calendar
            style={'responsive-calendar'}
            value={selectedDay}
            // @ts-ignore
            onChange={setSelectedDay}
            shouldHighlightWeekends
          />
        </Stack>
        <Stack
          bg={'gray.50'}
          rounded={'xl'}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: '2xlg' }}
        >
          <Stack spacing={4}>
            <Heading
              color={'gray.800'}
              lineHeight={1.1}
              fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
            >
              Pick a date
              <Text
                as={'span'}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              >
                !
              </Text>
            </Heading>
            <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
              We're happy to meet you when any of our in-house designers are
              available! Select a date to check which slots are available.
            </Text>
            <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
              Appointments are only available on weekdays, 9am-6pm. You'll need
              to book at least 2 business days in advance. and not more than 3
              weeks in advance.
            </Text>
          </Stack>
          <Box as={'form'} mt={10}>
            <Stack spacing={4}>
              <Input
                placeholder="Name"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
                isRequired={true}
              />
              <Input
                placeholder="Email address"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
                isRequired={true}
              />
              <Input
                placeholder="Phone number"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
                isRequired={true}
              />
              <Select
                placeholder="Select a time slot"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
                isRequired={true}
              >
                <option value="option1">Option 1</option>
                <option value="option1">Option 2</option>
                <option value="option1">Option 3</option>
              </Select>
            </Stack>
            <Button
              fontFamily={'heading'}
              mt={8}
              w={'full'}
              bgGradient="linear(to-r, red.400,pink.400)"
              color={'white'}
              _hover={{
                bgGradient: 'linear(to-r, red.400,pink.400)',
                boxShadow: 'xl',
              }}
            >
              Book Now
            </Button>
          </Box>
          form
        </Stack>
      </Container>
    </Box>
  );
};

export default BookingPage;
