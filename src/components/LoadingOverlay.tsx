import Spinner from '../assets/spinner.svg';

const LoadingOverlay = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full rounded-lg flex justify-center items-center backdrop-blur-sm z-10">
      <img className="mx-auto" src={Spinner} alt="spinner" />
    </div>
  );
};

export default LoadingOverlay;
