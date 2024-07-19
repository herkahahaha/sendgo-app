"use client";
import { PrimaryButton } from "@/components/button";
import { Input } from "@/components/input";
import { useState } from "react";
import { ServiceCost } from "./lib/actions";
import { useFormState, useFormStatus } from "react-dom";
import { Card } from "@/components/card";
import { BookingProps, CityProps, servicesProps } from "@/@types/booking";

const initialState = {
  result: null,
};

export const Booking: React.FC<BookingProps> = ({
  list_province,
  cityByProv,
}) => {
  const [origin_province_state, setProvince] = useState<string>("1");
  const [origin_city_state, setCity] = useState<string>("1");
  const [destination_province_state, setProvinceDes] = useState<string>("1");
  const [destination_city_state, setCityDes] = useState<string>("1");
  const [, setCourier] = useState<string>("");
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(ServiceCost, initialState);

  //   console.log("asal", origin_city_state, "tujuan", destination_city_state);
  //   console.log("aha", state)

  //   origin
  const handleOnChangeProv = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProvince(e.target.value);
  };
  const handleOnChangeCity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCity((prev) => prev + e.target.value);
  };
  //   destination
  const handleOnChangeProvDes = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProvinceDes(e.target.value);
  };
  const handleOnChangeCityDes = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCityDes((prev) => prev + e.target.value);
  };
  // Courier
  const handleOnChangeCourier = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCourier(e.target.value);
  };
  //   console.log(cityByProv[province_id])

  const filteredCity = cityByProv?.filter(
    (val: CityProps) => origin_province_state == val.province_id
  );

  const filteredCityDes = cityByProv?.filter(
    (val: CityProps) => destination_province_state == val.province_id
  );

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-x-8 border-2 p-8 border-slate-50 rounded-md max-w-screen-md">
      <form action={formAction} className="space-y-4">
        <div className="">
          <Input
            title="Provinsi Asal"
            description="Pilih provinsi asal pengirian yang anda inginkan"
            name="origin_province"
            onchange={handleOnChangeProv}
          >
            {list_province?.map((value: any) => (
              <option key={`${value.province_id}`} value={value.province_id}>
                {" "}
                {value.province}
              </option>
            ))}
          </Input>

          <Input
            title="Kota Asal"
            description="Pilih kota asal pengirian yang anda inginkan"
            name="origin_city"
            onchange={handleOnChangeCity}
          >
            {filteredCity?.map((value: any) => (
              <option key={`${value.city_id}`} value={value.city_id}>
                {" "}
                {value.city_name}
              </option>
            ))}
          </Input>
        </div>
        {/* Destination */}
        <div className="">
          <Input
            title="Provinsi Tujuan"
            description="Pilih provinsi tujuan pengirian yang anda inginkan"
            name="destination_province"
            onchange={handleOnChangeProvDes}
          >
            {list_province?.map((value: any) => (
              <option key={`${value.province_id}`} value={value.province_id}>
                {" "}
                {value.province}
              </option>
            ))}
          </Input>

          <Input
            title="Kota Tujuan"
            description="Pilih kota tujuan pengirian yang anda inginkan"
            name="destination_city"
            onchange={handleOnChangeCityDes}
          >
            {filteredCityDes?.map((value: any) => (
              <option key={`${value.city_id}`} value={value.city_id}>
                {" "}
                {value.city_name}
              </option>
            ))}
          </Input>

          <Input
            title="Kurir"
            description="Pilih layanan pengiriman"
            name="courier"
            onchange={handleOnChangeCourier}
          >
            <option key="tiki" value="tiki">
              Tiki
            </option>
            <option key="jne" value="jne">
              Jne
            </option>
            <option key="pos" value="pos">
              Pos
            </option>
          </Input>
        </div>
        <div className="m-4 flex justify-end">
          <PrimaryButton
            type="submit"
            label="Cek Harga Pengiriman"
            disabled={pending}
          />
        </div>
      </form>

      <div className="">
        {origin_city_state === "0" && destination_city_state === "0" ? (
          <p>Pilih kota asal dan tujuan anda</p>
        ) : (
          <div className="space-y-4">
            <div className="">
              <h2>{`Kota Asal : ${
                state?.rajaongkir?.origin_details.city_name ?? ""
              }`}</h2>
              <h2>{`Kota Tujuan : ${
                state?.rajaongkir?.destination_details.city_name ?? ""
              }`}</h2>
              <p>
                Berat : {state?.rajaongkir?.query.weight ?? ""}{" "}
                <span className="text-xs">gram</span>
              </p>
            </div>
            {state?.rajaongkir?.results[0].costs.map(
              (val: servicesProps, index: number) => (
                <Card
                  key={`${index}`}
                  names={val.service}
                  description={val.description}
                  etd={val.cost[0].etd}
                  price={val.cost[0].value}
                />
              )
            ) ?? []}
          </div>
        )}
      </div>
    </section>
  );
};
