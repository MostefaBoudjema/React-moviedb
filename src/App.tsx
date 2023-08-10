import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';
import { Navbar } from './components/Navbar';
import { RootLayout } from './layouts/RootLayout';
import { Footer } from './components/Footer';

function App() {
    return (
        <div className="App"> 
            <Navbar />
            <RootLayout />
            <Footer/>
        </div>
    );
}

export default App;
