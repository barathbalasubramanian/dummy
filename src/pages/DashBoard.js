import Styles from "./auth.module.css";
import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function DashBoard() {
  const data = [
    {
      name: "Jan",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Feb",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Mar",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Apr",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "May",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "June",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "July",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <div>
      <header className={Styles.header}>User Dashboard</header>
      <div className={Styles.BarChart}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="none" />{" "}
          {/* Removed X and Y axis lines */}
          <XAxis dataKey="name" hide={true} /> {/* Hide X Axis */}
          <YAxis hide={true} /> {/* Hide Y Axis */}
          <Tooltip />
          <Legend iconSize={10} /> {/* Changed the UI of the legend */}
          <Bar
            dataKey="pv"
            fill="black"
            activeBar={<Rectangle fill="Red" stroke="blue" />}
          />
          <Bar
            dataKey="uv"
            fill="blue"
            activeBar={<Rectangle fill="green" stroke="white" />}
          />
        </BarChart>
      </div>
    </div>
  );
}

export default DashBoard;
