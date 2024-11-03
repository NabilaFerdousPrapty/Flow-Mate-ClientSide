import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const data = [
  { name: 'Jan', LoyalMembers: 400, NewMembers: 240, UniqueMembers: 200 },
  { name: 'Feb', LoyalMembers: 300, NewMembers: 139, UniqueMembers: 221 },
  { name: 'Mar', LoyalMembers: 200, NewMembers: 980, UniqueMembers: 229 },
  { name: 'Apr', LoyalMembers: 278, NewMembers: 390, UniqueMembers: 200 },
  { name: 'May', LoyalMembers: 189, NewMembers: 480, UniqueMembers: 218 },
  { name: 'Jun', LoyalMembers: 239, NewMembers: 380, UniqueMembers: 250 },
  { name: 'Jul', LoyalMembers: 349, NewMembers: 430, UniqueMembers: 210 },
  { name: 'Aug', LoyalMembers: 200, NewMembers: 300, UniqueMembers: 240 },
  { name: 'Sep', LoyalMembers: 278, NewMembers: 390, UniqueMembers: 220 },
  { name: 'Oct', LoyalMembers: 200, NewMembers: 300, UniqueMembers: 250 },
  { name: 'Nov', LoyalMembers: 239, NewMembers: 380, UniqueMembers: 210 },
  { name: 'Dec', LoyalMembers: 349, NewMembers: 430, UniqueMembers: 220 }
];

const VisitorInsightsChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="LoyalMembers" stroke="#9b51e0" />
        <Line type="monotone" dataKey="NewMembers" stroke="#e63946" />
        <Line type="monotone" dataKey="UniqueMembers" stroke="#4caf50" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default VisitorInsightsChart;