import { HashRouter, Route, Routes } from 'react-router-dom';
import Main from 'src/pages/Main';
import User from 'src/pages/User';
import { TimerProvider } from './context/TimeContext';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <TimerProvider>
      <UserProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </HashRouter>
      </UserProvider>
    </TimerProvider>
  );
}

export default App;
