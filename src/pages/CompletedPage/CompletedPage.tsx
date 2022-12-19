import React from 'react';
import {
  Box,
  Stack,
  Heading,
  Text,
  Container,
  Button,
  ListItem,
  List,
} from '@chakra-ui/react';
import { google } from 'calendar-link';
import dayjs from 'dayjs';

const CompletedPage = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');
  const startDate = dayjs.tz(urlParams.get('date'), 'Asia/Kuala_Lumpur');
  const endDate = startDate.add(1, 'hour');

  const bookingString = `${startDate.format(
    'dddd D MMM, YYYY ',
  )} ${startDate.format('h:mm a')} - ${endDate.format('h:mm a')}`;

  // Set event as an object
  const event = {
    title: 'Appointment with TabbyX',
    description: `Booking id ${id?.toUpperCase()}`,
    start: startDate.toISOString(),
    duration: [1, 'hour'],
  };

  // @ts-ignore
  const eventGoogleLink = google(event);

  return (
    <Container maxW={'5xl'}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 5, md: 1 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}
        >
          Appointment has been{' '}
          <Text as={'span'} color={'orange.400'}>
            booked
          </Text>
        </Heading>
        <Text color={'gray.500'} maxW={'3xl'}>
          We look forward to meeting you! Here are your appointment details:
        </Text>
      </Stack>
      <Stack>
        <Box>
          <List spacing={2}>
            <ListItem>
              <Text as={'span'} fontWeight={'bold'}>
                Appointment Id:
              </Text>{' '}
              {id?.toUpperCase()}
            </ListItem>
            <ListItem>
              <Text as={'span'} fontWeight={'bold'}>
                Date:
              </Text>{' '}
              {bookingString}
            </ListItem>
          </List>
        </Box>
      </Stack>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 5, md: 1 }}
      >
        <Stack spacing={6} direction={'row'}>
          <Button
            rounded={'full'}
            px={6}
            colorScheme={'orange'}
            bg={'orange.400'}
            _hover={{ bg: 'orange.500' }}
            onClick={() => {
              window.open(eventGoogleLink, '_blank');
            }}
          >
            Add To Google Calendar
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default CompletedPage;
