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
import { gql, useQuery, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Calendar, Day } from '@hassanmojab/react-modern-calendar-datepicker';
import Joi from 'joi';

import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';

import {
  getCalendarAvailableRange,
  getCalendarDisabledDays,
} from '@utils/date';
import {
  AvailableHoursQuery,
  AvailableHoursQueryVariables,
  MakeBookingMutation,
  MakeBookingMutationVariables,
} from 'generated/graphql-types';
import dayjs from 'dayjs';
import { showError } from '@components/Toast';
import { useNavigate } from 'react-router-dom';

type FormData = {
  name: string;
  email: string;
  hour: string;
};

const BookingPage = () => {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState<Day | null>(null);
  const [availableHours, setAvailableHours] = useState<number[]>([]);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    hour: '',
  });

  const [formErrors, setFormErrors] = useState<string[]>([]);

  const availableDateRange = getCalendarAvailableRange();
  const disabledDays = getCalendarDisabledDays();

  const { data: hoursQueryData, refetch: refetchQuery } = useQuery<
    AvailableHoursQuery,
    AvailableHoursQueryVariables
  >(hoursQuery, {
    skip: !selectedDay,
    variables: {
      input: {
        year: selectedDay?.year || 0,
        month: selectedDay?.month || 0,
        day: selectedDay?.day || 0,
      },
    },
  });

  const [mutateMakeBooking, { loading: makeBookingLoading }] = useMutation<
    MakeBookingMutation,
    MakeBookingMutationVariables
  >(bookingMutation);

  useEffect(() => {
    setFormData({
      ...formData,
      hour: '',
    });
  }, [selectedDay]);

  useEffect(() => {
    if (hoursQueryData) {
      setAvailableHours(hoursQueryData.availableHours);
    }
  }, [hoursQueryData]);

  const getAvailableHoursOptions = () => {
    return availableHours.map((hour) => {
      const timeSlotStart = dayjs()
        .hour(hour)
        .minute(0)
        .second(0)
        .millisecond(0);
      const timeSlotEnd = timeSlotStart.add(1, 'hour');
      const timeSlot = `${timeSlotStart.format(
        'h:mm A',
      )} - ${timeSlotEnd.format('h:mm A')}`;

      return (
        <option key={`hour:${hour}`} value={hour}>
          {timeSlot}
        </option>
      );
    });
  };

  const isFormComplete = () => {
    return (
      formData.name.length > 0 &&
      formData.email.length > 0 &&
      formData.hour !== ''
    );
  };

  const isFormValid = () => {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email({ tlds: false }).required(),
      hour: Joi.number().required(),
    });
    const { error } = schema.validate(formData);
    if (error) {
      const errorTypes = error.details.map((detail) => detail.type);
      if (errorTypes.includes('string.email')) {
        showError('Please enter a valid email address');
        setFormErrors(['email']);
      }
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    setFormErrors([]);
    if (!isFormValid()) {
      return;
    }

    const { name, email, hour } = formData;
    const { year, month, day } = selectedDay || {};

    const bookingResult = await mutateMakeBooking({
      variables: {
        input: {
          name,
          email,
          hour: parseInt(hour),
          year: year || 0,
          month: month || 0,
          day: day || 0,
        },
      },
    });

    if (bookingResult.data?.makeBooking) {
      await refetchQuery();

      const { id, startDate } = bookingResult.data.makeBooking;
      navigate(`/complete?id=${id}&date=${startDate}`);
    }
  };

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
            minimumDate={availableDateRange.minimumDate}
            maximumDate={availableDateRange.maximumDate}
            disabledDays={disabledDays}
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
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
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
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                isRequired={true}
                isInvalid={formErrors.includes('email')}
              />
              <Input
                placeholder="Select a date"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
                value={
                  selectedDay
                    ? `${selectedDay.day}/${selectedDay.month}/${selectedDay.year}`
                    : 'Select a date'
                }
                disabled={true}
              />
              <Select
                placeholder="Select a time slot"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
                value={formData.hour}
                onChange={(e) =>
                  setFormData({ ...formData, hour: e.target.value })
                }
                isRequired={true}
              >
                {getAvailableHoursOptions()}
              </Select>
            </Stack>
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
              onClick={handleSubmit}
              disabled={!isFormComplete() || makeBookingLoading}
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
const hoursQuery = gql`
  query AvailableHours($input: AvailableHoursInput!) {
    availableHours(input: $input)
  }
`;

const bookingMutation = gql`
  mutation MakeBooking($input: MakeBookingInput!) {
    makeBooking(input: $input) {
      id
      startDate
      endDate
      createdBy {
        name
        email
      }
      createdAt
    }
  }
`;

export default BookingPage;
