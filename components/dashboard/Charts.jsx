"use client";

import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";

const COLORS = ["#0f766e", "#f5a524", "#0369a1", "#7c3aed", "#e11d48", "#65a30d"];
const axis = { fontSize: 12, fill: "currentColor", opacity: 0.7 };
const tooltipStyle = {
  borderRadius: 12, border: "1px solid var(--color-base-300)",
  background: "var(--color-base-100)", color: "var(--color-base-content)", boxShadow: "0 8px 24px rgba(0,0,0,.12)",
};

export function MonthlyArea({ data, dataKey, label, color = "#0f766e", money = false }) {
  const fmt = (v) => (money ? `$${Number(v).toLocaleString()}` : v);
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ left: -10, right: 8, top: 8 }}>
        <defs>
          <linearGradient id={`g-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.4} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.12} vertical={false} />
        <XAxis dataKey="month" tick={axis} axisLine={false} tickLine={false} />
        <YAxis tick={axis} axisLine={false} tickLine={false} tickFormatter={fmt} allowDecimals={false} />
        <Tooltip contentStyle={tooltipStyle} formatter={(v) => [fmt(v), label]} />
        <Area type="monotone" dataKey={dataKey} stroke={color} strokeWidth={3} fill={`url(#g-${dataKey})`} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function MonthlyBars({ data, dataKey, label, color = "#f5a524", money = false }) {
  const fmt = (v) => (money ? `$${Number(v).toLocaleString()}` : v);
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ left: -10, right: 8, top: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.12} vertical={false} />
        <XAxis dataKey="month" tick={axis} axisLine={false} tickLine={false} />
        <YAxis tick={axis} axisLine={false} tickLine={false} tickFormatter={fmt} allowDecimals={false} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "currentColor", opacity: 0.06 }} formatter={(v) => [fmt(v), label]} />
        <Bar dataKey={dataKey} fill={color} radius={[8, 8, 0, 0]} maxBarSize={44} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function Donut({ data }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={62} outerRadius={96} paddingAngle={3} stroke="none">
          {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function HorizontalBars({ data, dataKey = "earnings", money = true }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} layout="vertical" margin={{ left: 10, right: 16 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.12} horizontal={false} />
        <XAxis type="number" tick={axis} axisLine={false} tickLine={false} tickFormatter={(v) => (money ? `$${v}` : v)} />
        <YAxis type="category" dataKey="name" width={130} tick={axis} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={tooltipStyle} formatter={(v) => [money ? `$${Number(v).toLocaleString()}` : v, "Earnings"]} />
        <Bar dataKey={dataKey} fill="#0f766e" radius={[0, 8, 8, 0]} maxBarSize={26} />
      </BarChart>
    </ResponsiveContainer>
  );
}
