import { getDataProvince, getDataCity } from "./actions";
import { Booking } from "./booking";
import { LogoutButton } from "@/components/logout-btn";

export default async function Home() {
  const dataProvince = await getDataProvince();
  const dataCity = await getDataCity();
  const [province, city] = await Promise.all([dataProvince, dataCity]);
  // console.log(city.rajaongkir.results)
  return (
    <main className="flex flex-col items-center justify-between my-8 space-y-8">
      <div className="space-y-4">
        <h1 className="text-center">Booking Details</h1>
        <LogoutButton />
        <Booking
          list_province={province.rajaongkir.results}
          cityByProv={city.rajaongkir.results}
        />
      </div>
    </main>
  );
}
