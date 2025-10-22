import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Authentic", value: 70 },
  { name: "Manipulated", value: 30 },
];
const COLORS = ["#f97316", "#1E1E1E"];

export default function Results() {
  return (
    <div className="h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6">Detected Image: Verified</h1>
      <PieChart width={300} height={300}>
        <Pie data={data} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value">
          {data.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
        </Pie>
      </PieChart>
    </div>
  );
}
