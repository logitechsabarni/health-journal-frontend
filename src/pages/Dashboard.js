import { useState } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    mood: '',
    sleepHours: '',
    exercised: false,
    symptoms: '',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/journal', form);
      alert('Entry saved!');
      navigate('/history');
    } catch {
      alert('Failed to save entry');
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Welcome, {user?.name || 'User'} 👋</h1>
      <p className="mb-6 text-gray-600">Take a moment to reflect on your day 🧠</p>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Mood</label>
          <select
            name="mood"
            value={form.mood}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select</option>
            <option value="Great">Great</option>
            <option value="Good">Good</option>
            <option value="Okay">Okay</option>
            <option value="Bad">Bad</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Sleep Hours</label>
          <input
            type="number"
            name="sleepHours"
            value={form.sleepHours}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            min="0"
            max="24"
            required
          />
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            name="exercised"
            checked={form.exercised}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="font-semibold">Exercised today</label>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Symptoms</label>
          <input
            type="text"
            name="symptoms"
            value={form.symptoms}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-semibold">Notes</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows="3"
          ></textarea>
        </div>

        <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 w-full">
          Save Entry
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
