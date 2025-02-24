import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function App() {
  const [question, setQuestion] = useState('');
  const [responses, setResponses] = useState({});
  const [copied, setCopied] = useState(false);
  const beliefSystems = [
    'Agnosticism',
    'Atheism',
    'Bahá\'í Faith',
    'Buddhism',
    'Christianity',
    'Hinduism',
    'Islam',
    'Jainism',
    'Judaism',
    'Secularism',
    'Shinto',
    'Sikhism'
  ];

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async () => {
    if (!question.trim()) return;

    const newResponses = {};
    for (const belief of beliefSystems) {
      // Placeholder for fetching from GPT API
      newResponses[belief] = `Response from ${belief} for question: "${question}"`;
    }
    setResponses(newResponses);
  };

  const handleEdit = (newQuestion) => {
    setQuestion(newQuestion);
    setResponses({});
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Multi-Faith GPT Platform</h1>

      {/* Question Input */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Ask your question..."
          value={question}
          onChange={handleQuestionChange}
          className="border border-gray-300 rounded-lg p-2 w-1/2"
        />
        <button
          onClick={handleSubmit}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Submit
        </button>
      </div>

      {/* Responses */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.keys(responses).map((belief) => (
          <div key={belief} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">{belief}</h2>
            <p>{responses[belief]}</p>

            {/* Actions */}
            <div className="mt-2 flex gap-2">
              <CopyToClipboard
                text={responses[belief]}
                onCopy={() => setCopied(true)}
              >
                <button className="text-sm bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">
                  Copy
                </button>
              </CopyToClipboard>
              <button className="text-sm bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">
                Edit
              </button>
              <button className="text-sm bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                Save
              </button>
            </div>

            {copied && <p className="text-green-600 text-xs mt-1">Copied!</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
