import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Sidebar from 'components/stateful/sidebar/Sidebar';
import { TodoProvider } from './context/todo/Todo';
import AddUpdateTask from 'pages/task/addupdate/AddUpdateTask';
import DueToday from 'pages/task/duetoday/DueToday';

function App() {
    return (
        <TodoProvider>
            <div className="rootContainer">
                <BrowserRouter>
                    <Sidebar />
                    <Routes location="">
                        <Route element={<Home />} path=""></Route>
                        <Route element={<AddUpdateTask />} path="/task/:todoId?"></Route>
                        <Route element={<DueToday />} path="/task/list/due-today"></Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </TodoProvider>
    );
}

export default App;
