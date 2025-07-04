import { useEffect, useState } from 'react';
import API from '../utils/api';

const History = () => {
  const [entries, setEntries] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    mood: '',
    sleepHours: '',
    exercised: false,
    symptoms: '',
    notes: '',
  });

  const fetchEntries = async () => {
    try {
      const res = await API.get('/journal');
      setEntries(res.data);
    } catch {
      alert('Failed to fetch entries');
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const startEdit = (entry) => {
    setEditingId(entry._id);
    setEditForm({
      mood: entry.mood,
      sleepHours: entry.sleepHours,
      exercised: entry.exercised,
      symptoms: entry.symptoms,
      notes: entry.notes,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm({ ...editForm, [name]: type === 'checkbox' ? checked : value });
  };

  const submitEdit = async () => {
    try {
      await API.put(`/journal/${editingId}`, editForm);
      alert('Entry updated');
      fetchEntries();
      cancelEdit();
    } catch {
      alert('Update failed');
    }
  };

  const deleteEntry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return;
    try {
      await API.delete(`/journal/${id}`);
      fetchEntries();
    } catch {
      alert('Delete failed');
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Journal History</h2>
      {entries.length === 0 ? (
        <p className="text-gray-600">No entries yet.</p>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => (
            <div key={entry._id} className="bg-white p-4 rounded shadow-md">
              {editingId === entry._id ? (
                <>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold mb-1">Mood</label>
                      <select
                        name="mood"
                        value={editForm.mood}
                        onChange={handleEditChange}
                        className="w-full border p-2 rounded"
                      >
                        <option value="">Select</option>
                        <option value="Great">Great</option>
                        <option value="Good">Good</option>
                        <option value="Okay">Okay</option>
                        <option value="Bad">Bad</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Sleep Hours</label>
                      <input
                        type="number"
                        name="sleepHours"
                        value={editForm.sleepHours}
                        onChange={handleEditChange}
                        className="w-full border p-2 rounded"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Symptoms</label>
                      <input
                        type="text"
                        name="symptoms"
                        value={editForm.symptoms}
                        onChange={handleEditChange}
                        className="w-full border p-2 rounded"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Notes</label>
                      <textarea
                        name="notes"
                        value={editForm.notes}
                        onChange={handleEditChange}
                        className="w-full border p-2 rounded"
                      />
                    </div>
                    <div className="flex items-center space-x-2 col-span-full">
                      <input
                        type="checkbox"
                        name="exercised"
                        checked={editForm.exercised}
                        onChange={handleEditChange}
                      />
                      <label>Exercised</label>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={submitEdit}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p><strong>Date:</strong> {new Date(entry.date).toLocaleDateString()}</p>
                  <p><strong>Mood:</strong> {entry.mood}</p>
                  <p><strong>Sleep:</strong> {entry.sleepHours} hours</p>
                  <p><strong>Exercised:</strong> {entry.exercised ? 'Yes' : 'No'}</p>
                  <p><strong>Symptoms:</strong> {entry.symptoms || 'None'}</p>
                  <p><strong>Notes:</strong> {entry.notes || 'None'}</p>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => startEdit(entry)}
                      className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteEntry(entry._id)}
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
