// "use client";
// import { useState } from "react";

// export default function CtaForm() {
//   const [text, setText] = useState("");
//   const [actionType, setActionType] = useState("text");
//   const [actionValue, setActionValue] = useState("");
//   const [msg, setMsg] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const res = await fetch("/api/cta/create", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ text, actionType, actionValue }),
//     });

//     const data = await res.json();
//     setMsg(data.message);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4 border rounded">
//       <h2 className="text-xl font-bold">Create CTA</h2>

//       <label>CTA Text</label>
//       <input value={text} onChange={(e) => setText(e.target.value)} className="border p-1 w-full" required />

//       <label>Action Type</label>
//       <select value={actionType} onChange={(e) => setActionType(e.target.value)} className="border p-1 w-full">
//         <option value="text">Text</option>
//         <option value="url">URL</option>
//       </select>

//       <label>Action Value</label>
//       <input value={actionValue} onChange={(e) => setActionValue(e.target.value)} className="border p-1 w-full" required />

//       <button className="bg-blue-600 text-white px-3 py-1 mt-3 rounded">Submit</button>

//       {msg && <p className="mt-2 text-green-600">{msg}</p>}
//     </form>
//   );
// }


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
    setMsg(data.message || "CTA Created");
    setText("");
    setActionValue("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-5"
      >
        {/* HEADER */}
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Create CTA
        </h2>

        {/* CTA TEXT */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CTA Button Text
          </label>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Eg: Get Free Quote"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 
                       focus:ring-2 focus:ring-purple-600 focus:outline-none"
            required
          />
        </div>

        {/* ACTION TYPE */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Action Type
          </label>
          <select
            value={actionType}
            onChange={(e) => setActionType(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 
                       bg-white focus:ring-2 focus:ring-purple-600 focus:outline-none"
          >
            <option value="text">Show Message</option>
            <option value="url">Open URL</option>
          </select>
        </div>

        {/* ACTION VALUE */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {actionType === "url" ? "Redirect URL" : "Popup Message"}
          </label>
          <input
            value={actionValue}
            onChange={(e) => setActionValue(e.target.value)}
            placeholder={
              actionType === "url"
                ? "https://example.com"
                : "Thank you for contacting us"
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-2 
                       focus:ring-2 focus:ring-purple-600 focus:outline-none"
            required
          />
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 
                     text-white py-3 rounded-xl font-semibold transition"
        >
          Save CTA
        </button>

        {/* MESSAGE */}
        {msg && (
          <p className="text-center text-sm text-green-600 font-medium">
            {msg}
          </p>
        )}
      </form>
    </div>
  );
}
