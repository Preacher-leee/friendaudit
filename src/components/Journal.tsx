import React, { useState } from 'react';
import { Button } from './ui/Button';

export const Journal = () => {
  const [mood, setMood] = useState('');
  const [energyLevel, setEnergyLevel] = useState(5);
  const [entry, setEntry] = useState('');
  const [entries, setEntries] = useState([]);

  const handleSave = () => {
    if (!entry.trim()) return;

    const newEntry = {
      id: Date.now(),
      mood,
      energyLevel,
      entry,
      date: new Date().toLocaleString(),
    };

    setEntries([newEntry, ...entries]);
    setMood('');
    setEnergyLevel(5);
    setEntry('');
  };

  return (
    <div className="bg-black text-white rounded-xl border border-purple-500/20 p-6 md:p-10 shadow-lg">
      <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-300">
        Friendventory Journal
      </h2>

      <div className="grid gap-6 mb-8">
        {/* Mood Input */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">Mood</label>
          <input
            type="text"
            placeholder="e.g. reflective, drained, grateful"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full bg-gray-900 text-white p-3 rounded-lg border border-purple-500/20 focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Energy Level Slider */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Energy Level (after social interaction)
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={energyLevel}
            onChange={(e) => setEnergyLevel(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-sm text-gray-400 mt-1">Level: {energyLevel}</p>
        </div>

        {/* Journal Entry */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">Journal Entry</label>
          <textarea
            rows={5}
            placeholder="What happened today with your friend? How did it make you feel?"
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            className="w-full bg-gray-900 text-white p-3 rounded-lg border border-purple-500/20 focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Save Button */}
        <div className="text-right">
          <Button onClick={handleSave}>Save Entry</Button>
        </div>
      </div>

      {/* Past Entries */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4 text-purple-400">Past Entries</h3>
        {entries.length === 0 ? (
          <p className="text-gray-500">No entries yet. Start tracking your vibe.</p>
        ) : (
          <ul className="space-y-4">
            {entries.map(({ id, mood, energyLevel, entry, date }) => (
              <li key={id} className="p-4 rounded-lg bg-gray-900 border border-purple-500/10">
                <div className="text-sm text-gray-500 mb-1">{date}</div>
                <div className="text-purple-300 mb-1"><strong>Mood:</strong> {mood || 'N/A'}</div>
                <div className="text-cyan-300 mb-1"><strong>Energy Level:</strong> {energyLevel}</div>
                <div className="text-gray-300 whitespace-pre-wrap">{entry}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
