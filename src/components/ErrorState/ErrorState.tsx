
import './ErrorState.scss'
import iconError from '../../design/images/icon-error.svg'
import iconRerty from '../../design/images/icon-retry.svg'

interface ErrorStateProps {
  onRetry: () => void;
}

export const ErrorState = ({ onRetry }: ErrorStateProps) => {
  return (
    <div className="containerErrors">
     
      <img src={iconError} className='iconTop' />
      
      <h1>
        Something went wrong
      </h1>
      
      <p>
        We couldn’t connect to the server (API error). Please try again in a few moments.
      </p>
      
      <button onClick={onRetry}>
        <img src={iconRerty} className='iconButton'/>Rerty
      </button>
    </div>
  );
};