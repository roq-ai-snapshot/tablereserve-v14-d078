import * as yup from 'yup';
import { tableAvailabilityValidationSchema } from 'validationSchema/table-availabilities';
import { waiterValidationSchema } from 'validationSchema/waiters';

export const restaurantValidationSchema = yup.object().shape({
  name: yup.string().required(),
  organization_id: yup.string().nullable().required(),
  table_availability: yup.array().of(tableAvailabilityValidationSchema),
  waiter: yup.array().of(waiterValidationSchema),
});
