import loadingGif from '../assets/loading.gif'; // Import the GIF image

const LoadingSpinner = () => {
  const spinnerContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100px',
    padding: '7rem'
  };

  return (
    <div style={spinnerContainerStyle} >
      <img src={loadingGif} alt="Loading..." />
    </div>
  );
};

export default LoadingSpinner;
