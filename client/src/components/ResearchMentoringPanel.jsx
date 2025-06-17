import React from 'react';

const ResearchMentoringPanel = ({ onNavigate }) => (
  <div style={{ color: 'white', background: '#1e293b', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Research Mentoring Panel</h1>
    <button
      style={{ padding: '0.5rem 1.5rem', background: '#2563eb', color: 'white', borderRadius: '0.5rem', border: 'none' }}
      onClick={() => onNavigate('home')}
    >
      Back to Home
    </button>
  </div>
);

export default ResearchMentoringPanel;