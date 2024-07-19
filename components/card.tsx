type CardProps = {
  names: string;
  description: string;
  etd: string;
  price: number;
};

export function Card({ names, description, etd, price }: CardProps) {
  const formattedIDR = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);

  return (
    <div className="w-full flex justify-between bg-slate-50 text-purple-950 p-4 rounded-xl">
      {/* service */}
      <div className="">
        <p className="font-semibold">{names}</p>
        <p className="text-sm">{description}</p>
      </div>
      {/* cost */}
      <div className="">
        <p>
          Estimasi: {etd} <span className="text-xs text-gray-700">hari</span>
        </p>
        <p>{formattedIDR}</p>
      </div>
    </div>
  );
}
