"use client";

import { useEffect, useState } from "react";

type NotesProps = {
  noteKey: string;
};

export default function Notes({ noteKey }: NotesProps) {

  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedNote = localStorage.getItem(noteKey);

    if (savedNote) {
      setNote(savedNote);
    }
  }, [noteKey]);

  function saveNote() {
    localStorage.setItem(noteKey, note);

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
    }

  return (
    <div className="mt-6 rounded-lg bg-gray-50 p-4">
      <h3 className="text-lg font-semibold mb-3">
        Personal Notes
      </h3>

      <textarea
        rows={4}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write your notes here..."
        className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      />

      <br />

      <button
        onClick={saveNote}
        className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
      >
        Save Note
      </button>

      {saved && (
        <p className="mt-2 text-sm text-green-600">
          ✓ Note saved
        </p>
      )}
    </div>
  );
}