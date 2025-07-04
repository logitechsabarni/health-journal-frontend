import { useState } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form);
      navigate('/login');
    } catch {
      alert('Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-6 text-center">Register</h2>
        <input
          className="w-full p-2 mb-4 border rounded"
          placeholder="Name"
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="w-full p-2 mb-4 border rounded"
          placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="w-full p-2 mb-4 border rounded"
          type="password"
          placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Register</button>
        <p className="mt-4 text-sm text-center">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
