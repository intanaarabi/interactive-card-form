import PropTypes from 'prop-types';

function CardConfirmation({ continueHandler }) {
    return (
        <div  className="flex flex-col gap-6 w-[300px] my-12 justify-center items-center text-center">
            <img 
                    src="./images/icon-complete.svg"
                    alt="Icon Complete" 
            />
            <p className="uppercase tracking-widest font-semibold text-4xl text-dark-violet mt-2">Thank you!</p>
            <p className="tracking-widest font-semibold text-lg text-dark-gray-violet">We&apos;ve added your card details</p>
            <button onClick={() => continueHandler(false)} className="w-full transition-text duration-200 bg-dark-violet text-light-gray-violet font-semibold p-3 mt-3 rounded-md hover:text-white">Continue</button>
        </div>
    )
}
CardConfirmation.propTypes = {
    continueHandler: PropTypes.func.isRequired,
};

export default CardConfirmation
