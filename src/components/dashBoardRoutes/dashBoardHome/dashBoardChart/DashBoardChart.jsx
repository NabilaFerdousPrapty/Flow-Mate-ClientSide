import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);
const DashBoardChart = () => {
  const data = {
    labels: ['High Priority', 'Medium Priority', 'Low Priority', 'No Priority'],
    datasets: [
      {
        label: 'Team Collaboration Priority',
        data: [40, 30, 20, 10], // Sample data, customize as per your need
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',  // High Priority
          'rgba(54, 162, 235, 0.6)',  // Medium Priority
          'rgba(255, 206, 86, 0.6)',  // Low Priority
          'rgba(255, 99, 132, 0.6)',  // No Priority
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom', // Position the legend at the bottom
      },
    },
  };
  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Team Collaboration Priorities</h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default DashBoardChart;