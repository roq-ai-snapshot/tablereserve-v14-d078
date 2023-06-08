import * as yup from 'yup';

export const reservationValidationSchema = yup.object().shape({
  preferences: yup.string(),
  customer_id: yup.string().nullable().required(),
  table_availability_id: yup.string().nullable().required(),
});
