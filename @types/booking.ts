export interface ProvinceProps {
  province_id: string;
  province: string;
}

export interface CityProps {
  city_id: string;
  province_id: string;
  province?: string;
  type?: string;
  city_name?: string;
  postal_code?: string;
}

export type BookingProps = {
  list_province: ProvinceProps[];
  cityByProv: CityProps[];
};

export type costProps = {
  value: number;
  etd: string;
};
export type servicesProps = {
  service: string;
  description: string;
  cost: costProps[];
};
