import './ErrorMessageFromForm.css';

function ErrorMessageFromForm({ errorMessage }) {
   return (
      <div className='errormessagefromform'>
         <p className='errormessagefromform__message'>{errorMessage}</p>
      </div>
   )
}

export default ErrorMessageFromForm;
