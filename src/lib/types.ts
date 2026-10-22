export type Vehicle = {
  id: number;
  slug: string;
  name: string;
  category: string;
  description: string;
  image: string;
  price: number | null;
  year: number | null;
  mileage: number | null;
  fuel: string;
  transmission: string;
  status: string;
  featured: boolean;
};
export type Enquiry = {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  vehicle_id: number | null;
  created_at: string;
  status: string;
};
