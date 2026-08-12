import { useState, useEffect } from 'react';
import { API_BASE } from './config';
import SubjectSelector from './SubjectSelector';
import StudyTimer from './StudyTimer';
import StatsCharts from './StatsCharts';
import SessionHistory from './SessionHistory';

function App() {
  const [subjects, setSubjects] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [activeSubject, setActiveSubject] = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/api/subjects`)
      .then((res) => res.json())
      .then((data) => {
        setSubjects(data);
        if (data.length > 0) setActiveSubject(data[0].name);
      });

    fetch(`${API_BASE}/api/sessions`)
      .then((res) => res.json())
      .then((data) => setSessions(data));
  }, []);

  const activeColor = subjects.find((s) => s.name === activeSubject)?.color || '#93AFA0';

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '48px 24px' }}>
      <SubjectSelector
        subjects={subjects}
        activeSubject={activeSubject}
        setActiveSubject={setActiveSubject}
        onSubjectAdded={(s) => setSubjects([...subjects, s])}
      />
      <StudyTimer
        activeSubject={activeSubject}
        activeColor={activeColor}
        onSessionSaved={(session) => setSessions([session, ...sessions])}
      />
      <StatsCharts sessions={sessions} subjects={subjects} />
      <SessionHistory sessions={sessions} subjects={subjects} />
    </div>
  );
}

export default App;