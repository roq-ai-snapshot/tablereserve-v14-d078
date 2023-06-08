import { UserInterface } from 'interfaces/user';
import { TableAvailabilityInterface } from 'interfaces/table-availability';

export interface ReservationInterface {
  id?: string;
  customer_id: string;
  table_availability_id: string;
  preferences?: string;
  created_at?: Date;
  updated_at?: Date;

  user?: UserInterface;
  table_availability?: TableAvailabilityInterface;
  _count?: {};
}
