import { Navbar } from './components/Navbar';
import { RootLayout } from './layouts/RootLayout';
import { Footer } from './components/Footer';

function App() {
    return (
        <>
            <Navbar />
            <div className="App">
                <RootLayout />
            </div>

            <Footer />
        </>
    );
}

export default App;
