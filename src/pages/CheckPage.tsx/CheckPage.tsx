import {
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Text,
  Stack,
  useColorModeValue,
  ListItem,
  List,
  Box,
} from '@chakra-ui/react';
import { gql, useMutation, useLazyQuery } from '@apollo/client';
import { google } from 'calendar-link';
import { useEffect, useState } from 'react';

import {
  Booking,
  BookingsQuery,
  BookingsQueryVariables,
  CancelBookingMutation,
  CancelBookingMutationVariables,
} from 'generated/graphql-types';
import _ from 'lodash';
import dayjs from 'dayjs';
import { showSuccess } from '@components/Toast';

const CheckPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [getBookings, { data: bookingsQueryData, refetch: refetchBookings }] =
    useLazyQuery<BookingsQuery, BookingsQueryVariables>(checkQuery);

  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    if (bookingsQueryData) {
      setBookings(bookingsQueryData.bookings);
    }
  }, [bookingsQueryData]);

  const handleSearch = () => {
    if (!_.isEmpty(email)) {
      getBookings({ variables: { email } });
    }
  };

  return (
    <Flex
      minH={'100vh'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack
        spacing={4}
        w={'full'}
        maxW={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Check My Appointments
        </Heading>
        <Input
          placeholder="Email address"
          _placeholder={{ color: 'gray.500' }}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <Stack spacing={6}>
          <Button
            fontFamily={'heading'}
            mt={8}
            w={'full'}
            bg="orange.400"
            color={'white'}
            _hover={{
              bgGradient: 'linear(to-r, red.400,pink.400)',
              boxShadow: 'xl',
            }}
            onClick={handleSearch}
          >
            Check
          </Button>
        </Stack>
        {bookings.length > 0 &&
          bookings.map((booking) => (
            <BookingItem
              key={booking.id}
              booking={booking}
              refetch={refetchBookings}
            />
          ))}

        {bookings.length === 0 && !_.isEmpty(email) && (
          <Stack
            textAlign={'center'}
            align={'center'}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 5, md: 1 }}
          >
            <Text color={'gray.500'} maxW={'3xl'}>
              You don't have any appointments scheduled.
            </Text>
          </Stack>
        )}
      </Stack>
    </Flex>
  );
};

const BookingItem = ({
  booking,
  refetch,
}: {
  booking: Booking;
  refetch: () => void;
}) => {
  const [mutateCancelBooking, { loading: cancelLoading }] = useMutation<
    CancelBookingMutation,
    CancelBookingMutationVariables
  >(cancelBookingMutation);

  const startDate = dayjs(booking.startDate);
  const endDate = startDate.add(1, 'hour');

  const bookingString = `${startDate.format(
    'dddd D MMM, YYYY ',
  )} ${startDate.format('h:mm a')} - ${endDate.format('h:mm a')}`;

  // Set event as an object
  const event = {
    title: 'Appointment with TabbyX',
    description: `Booking id ${booking.id?.toUpperCase()}`,
    start: startDate.toISOString(),
    duration: [1, 'hour'],
  };

  // @ts-ignore
  const eventGoogleLink = google(event);

  const handleCancel = async () => {
    const result = await mutateCancelBooking({
      variables: { id: booking.id || '' },
    });
    if (result.data?.cancelBooking) {
      showSuccess(`Your appointment on ${bookingString} has been cancelled`);
      refetch && refetch();
    }
  };

  return (
    <>
      <hr />
      <Container maxW={'5xl'} py={{ base: 2, sm: 5, lg: 8 }}>
        <Stack>
          <Box>
            <List spacing={2}>
              <ListItem>
                <Text as={'span'} fontWeight={'bold'}>
                  Appointment Id:
                </Text>{' '}
                {booking.id?.toUpperCase()}
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
          <Stack spacing={6} direction={'column'}>
            <Button
              rounded={'full'}
              px={6}
              colorScheme={'orange'}
              bg={'orange.400'}
              _hover={{ bg: 'orange.500' }}
              onClick={() => window.open(eventGoogleLink)}
            >
              Add To Google Calendar
            </Button>
            <Button
              rounded={'full'}
              px={6}
              colorScheme={'red'}
              bg={'red.400'}
              _hover={{ bg: 'orange.500' }}
              onClick={handleCancel}
              isDisabled={cancelLoading}
            >
              Cancel Appointment
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

const checkQuery = gql`
  query Bookings($email: String!) {
    bookings(email: $email) {
      id
      createdBy {
        name
        email
      }
      startDate
      endDate
      createdAt
      cancelledAt
    }
  }
`;

const cancelBookingMutation = gql`
  mutation CancelBooking($id: ID!) {
    cancelBooking(id: $id)
  }
`;

export default CheckPage;
