// Import necessary libraries and components
import React, { useState } from 'react';
import BeliefSystemSelector from './components/BeliefSystemSelector';
import MultiFaithGPT from './components/MultiFaithGPT';

const App = () => {
  const [selectedBeliefSystem, setSelectedBeliefSystem] = useState('');
  const [question, setQuestion] = useState('');
  const [responses, setResponses] = useState({});
  const [savedResponses, setSavedResponses] = useState({});

  // Mock function to get a response from different belief systems
  const fetchResponse = (beliefSystem) => {
    return `Sample response from ${beliefSystem} for question: "${question}"`;
  };

  // Handle asking a question
  const handleAskQuestion = () => {
    if (selectedBeliefSystem === 'All') {
      const allResponses = beliefSystems.reduce((acc, belief) => {
        acc[belief] = fetchResponse(belief);
        return acc;
      }, {});
      setResponses(allResponses);
    } else {
      setResponses({
        [selectedBeliefSystem]: fetchResponse(selectedBeliefSystem),
      });
    }
  };

  // Handle saving responses
  const handleSaveResponse = (beliefSystem, response) => {
    setSavedResponses((prev) => ({
      ...prev,
      [beliefSystem]: [...(prev[beliefSystem] || []), response],
    }));
  };

  // Handle copying response
  const handleCopyResponse = (response) => {
    navigator.clipboard.writeText(response);
  };

  // Handle playing response audio
  const handlePlayResponse = (response) => {
    const utterance = new SpeechSynthesisUtterance(response);
    speechSynthesis.speak(utterance);
  };

  const beliefSystems = [
    'Agnosticism', 'Atheism', 'Bahá’í Faith', 'Buddhism', 'Christianity',
    'Hinduism', 'Islam', 'Jainism', 'Judaism', 'Secularism', 'Shinto', 'Sikhism'
  ];

  return (
    <div>
      <h1>Multi-Faith GPT Platform</h1>
      <BeliefSystemSelector
        selectedBeliefSystem={selectedBeliefSystem}
        setSelectedBeliefSystem={setSelectedBeliefSystem}
        beliefSystems={beliefSystems}
      />
      <textarea
        placeholder="Type your question here..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button onClick={handleAskQuestion}>Ask</button>
      <MultiFaithGPT
        responses={responses}
        handleCopyResponse={handleCopyResponse}
        handlePlayResponse={handlePlayResponse}
        handleSaveResponse={handleSaveResponse}
      />
    </div>
  );
};

export default App;
