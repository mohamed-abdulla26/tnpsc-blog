

"use client";
import { useState, useEffect } from "react";
import Editor from "@/components/Editor";

export default function CtaForm() {
  const [text, setText] = useState("");
  const [actionType, setActionType] = useState("text");
  const [actionValue, setActionValue] = useState("");
  const [msg, setMsg] = useState("");


  useEffect(() => {
    setActionValue("");
  }, [actionType]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!text.trim()) {
      setMsg("CTA Button Text is required");
      return;
    }

    if (actionType === "text" && !actionValue.trim()) {
      setMsg("Please enter a message for the CTA");
      return;
    }

    if (actionType === "url" && !/^https?:\/\/.+/.test(actionValue)) {
      setMsg("Please enter a valid URL starting with http:// or https://");
      return;
    }

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
        {actionType === "text" && (
          <div>
            <label className="block mb-1 font-medium">
              CTA Message (Rich Text)
            </label>

            <Editor
              value={actionValue}
              onChange={setActionValue}
            />
          </div>
        )}

        {/* ACTION VALUE — URL */}
        {actionType === "url" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Redirect URL
            </label>
            <input
              type="url"
              value={actionValue}
              onChange={(e) => setActionValue(e.target.value)}
              placeholder="https://example.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 
                 focus:ring-2 focus:ring-purple-600 focus:outline-none"
              required
            />
          </div>
        )}

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
