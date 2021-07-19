export interface Order {
  id?: number;
  campus_id: number;
  addr_id: number;
  owner_id: number;
  helper_id?: number;
  status: 1 | 2 | 3 | 4;
  delivery_code: string[] | string;
  // delivery_type: 1 | 2 | 3;
  delivery_type: number;
  price: number;
  owner_remark?: string;
  helper_remark?: string;
  finished_at?: Date;
  finished_photos?: string[];
  deleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}