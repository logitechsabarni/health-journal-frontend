import { useEffect, useState } from 'react';
import API from '../utils/api';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const Stats = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get('/journal');
        setEntries(res.data.reverse().slice(0, 7)); // last 7 entries
      } catch {
        alert('Failed to load stats');
      }
    };
    fetchData();
  }, []);

  const dates = entries.map((e) => new Date(e.date).toLocaleDateString());
  const sleepHours = entries.map((e) => e.sleepHours);
  const moodScores = entries.map((e) =>
    e.mood === 'Great' ? 4 : e.mood === 'Good' ? 3 : e.mood === 'Okay' ? 2 : 1
  );

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Sleep Hours',
        data: sleepHours,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.3)',
        tension: 0.3,
      },
      {
        label: 'Mood (1–4)',
        data: moodScores,
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.3)',
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Weekly Health Stats</h2>
      {entries.length < 2 ? (
        <p className="text-gray-600">Add more entries to view statistics 📊</p>
      ) : (
        <Line data={data} />
      )}
    </div>
  );
};

export default Stats;
