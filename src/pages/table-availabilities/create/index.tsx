import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { createTableAvailability } from 'apiSdk/table-availabilities';
import { Error } from 'components/error';
import { tableAvailabilityValidationSchema } from 'validationSchema/table-availabilities';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { RestaurantInterface } from 'interfaces/restaurant';
import { getUsers } from 'apiSdk/users';
import { UserInterface } from 'interfaces/user';
import { getRestaurants } from 'apiSdk/restaurants';
import { TableAvailabilityInterface } from 'interfaces/table-availability';

function TableAvailabilityCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: TableAvailabilityInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createTableAvailability(values);
      resetForm();
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<TableAvailabilityInterface>({
    initialValues: {
      capacity: 0,
      available_from: new Date(new Date().toDateString()),
      available_to: new Date(new Date().toDateString()),
      restaurant_id: (router.query.restaurant_id as string) ?? null,
      reservation: [],
    },
    validationSchema: tableAvailabilityValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Table Availability
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="capacity" mb="4" isInvalid={!!formik.errors?.capacity}>
            <FormLabel>Capacity</FormLabel>
            <NumberInput
              name="capacity"
              value={formik.values?.capacity}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('capacity', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.capacity && <FormErrorMessage>{formik.errors?.capacity}</FormErrorMessage>}
          </FormControl>
          <FormControl id="available_from" mb="4">
            <FormLabel>Available From</FormLabel>
            <DatePicker
              dateFormat={'dd/MM/yyyy'}
              selected={formik.values?.available_from}
              onChange={(value: Date) => formik.setFieldValue('available_from', value)}
            />
          </FormControl>
          <FormControl id="available_to" mb="4">
            <FormLabel>Available To</FormLabel>
            <DatePicker
              dateFormat={'dd/MM/yyyy'}
              selected={formik.values?.available_to}
              onChange={(value: Date) => formik.setFieldValue('available_to', value)}
            />
          </FormControl>
          <AsyncSelect<RestaurantInterface>
            formik={formik}
            name={'restaurant_id'}
            label={'Select Restaurant'}
            placeholder={'Select Restaurant'}
            fetcher={getRestaurants}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'table_availability',
  operation: AccessOperationEnum.CREATE,
})(TableAvailabilityCreatePage);
