import { useEffect, useState } from 'react';



import './App.css';
import TeamForm from './Containers/TeamForm/TeamForm' 

function App() {

  const [loaded, setLoaded] = useState(false)


  return (
  <div className={`App`}>
      <TeamForm />
    </div>
  );
}

export default App;
