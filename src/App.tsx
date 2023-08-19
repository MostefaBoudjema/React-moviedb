import { useLocation } from 'react-router-dom'; // Make sure to import useLocation
import { Navbar } from './components/Navbar';
import { RootLayout } from './layouts/RootLayout';
import { Footer } from './components/Footer';

function App() {
    const location = useLocation(); // Get the current location

    // Determine whether to show the Navbar based on the route path
    const shouldShowNavbar = location.pathname !== '/';
    return (
        <>
           {shouldShowNavbar && <Navbar />}
            <RootLayout />
            <Footer />
        </>
    );
}

export default App;
