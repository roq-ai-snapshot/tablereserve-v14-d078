import { TableAvailabilityInterface } from 'interfaces/table-availability';
import { WaiterInterface } from 'interfaces/waiter';
import { OrganizationInterface } from 'interfaces/organization';

export interface RestaurantInterface {
  id?: string;
  name: string;
  organization_id: string;
  created_at?: Date;
  updated_at?: Date;
  table_availability?: TableAvailabilityInterface[];
  waiter?: WaiterInterface[];
  organization?: OrganizationInterface;
  _count?: {
    table_availability?: number;
    waiter?: number;
  };
}
