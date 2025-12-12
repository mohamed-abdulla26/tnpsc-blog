"use client";
import { useState } from "react";

export default function CtaForm() {
  const [text, setText] = useState("");
  const [actionType, setActionType] = useState("text");
  const [actionValue, setActionValue] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/cta/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, actionType, actionValue }),
    });

    const data = await res.json();
    setMsg(data.message);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <h2 className="text-xl font-bold">Create CTA</h2>

      <label>CTA Text</label>
      <input value={text} onChange={(e) => setText(e.target.value)} className="border p-1 w-full" required />

      <label>Action Type</label>
      <select value={actionType} onChange={(e) => setActionType(e.target.value)} className="border p-1 w-full">
        <option value="text">Text</option>
        <option value="url">URL</option>
      </select>

      <label>Action Value</label>
      <input value={actionValue} onChange={(e) => setActionValue(e.target.value)} className="border p-1 w-full" required />

      <button className="bg-blue-600 text-white px-3 py-1 mt-3 rounded">Submit</button>

      {msg && <p className="mt-2 text-green-600">{msg}</p>}
    </form>
  );
}
