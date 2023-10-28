import { useEffect, useState } from "react";
import useStore from "../stores/formStore";
import { useForm } from 'react-hook-form';
import CardConfirmation from "./CardConfirmation";

function CardForm() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    setError,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm();

  const setFormData = useStore((state) => state.setFormData);
  const resetFormData = useStore((state) => state.resetFormData);
  const [showSuccess, setShowSuccess] = useState(false);

  const watchedFormValues = watch(); // This will watch for changes in form values
  const cc_num = watch('ccalias');

  //Reformating credit card number
  useEffect(() => {
    if (cc_num) {
        // Step 1: Remove all non-numeric characters
        let cleanedValue = cc_num.replace(/\D/g, '');
        // Check for non-numeric characters
        if (cleanedValue.length !== cc_num.replace(/\s+/g, '').length) {
            return;
        } 
        // Step 2: Insert spaces after every 4 digits
        let formattedValue = cleanedValue.replace(/(\d{4})(?=\d)/g, '$1 ');
        // Step 3: Use the formatted string if it's different from the original
        if (formattedValue !== cc_num) {
            setValue('ccalias', formattedValue);
        }
    }
}, [cc_num, setValue, setError, clearErrors]);

//Form validation for credit card number
  const validateCCAlias = (value) => {
    const onlyNums = value.replace(/ /g, '');
    if (/[^0-9]/.test(onlyNums)) {
        return 'Wrong format, numbers only.';
    }

    if (onlyNums.length !== 16) {
        return 'The card number should be exactly 16 digits.';
    }

    return true;
  };

//Form validation for mm/yy expiration
  const validateExpiryDate = () => {
    const currentYear = new Date().getFullYear();
    const lastTwoDigitsCurrentYear = currentYear % 100;

    const mmValue = getValues('mmalias');
    const yyValue = getValues('yyalias');

    const enteredYear = parseInt(yyValue, 10);
    if (isNaN(enteredYear) || enteredYear < lastTwoDigitsCurrentYear || (enteredYear === lastTwoDigitsCurrentYear && parseInt(mmValue, 10) < new Date().getMonth() + 1)) {
        return 'Expiration is in the past.';
    } else if (enteredYear > lastTwoDigitsCurrentYear + 20) { // Assuming 20 years is our max
        return 'Too far in the future.';
    }
      return true;
  }


  useEffect(() => {
    setFormData(watchedFormValues); 
  }, [watchedFormValues, setFormData]);  

  useEffect(() => {
    if (!showSuccess) {
      reset();
      resetFormData();
    }
  }, [showSuccess,reset,resetFormData])

  const onSubmit = () => {
    setShowSuccess(true);
  };

  //Styling
  function getInputClassName(fieldName) {
    let baseClasses = "placeholder-gray-300 transition-border duration-200 border rounded-lg px-3 py-2 font-semibold text-dark-violet focus:outline-none focus:border-focus focus:ring-1 focus:ring-focus ";
    let errorClass = errors[fieldName] ? "border-error" : "";
    return `${baseClasses} ${errorClass}`;
}

const getLabelClassName = "uppercase font-bold text-xs tracking-wide mb-2 text-dark-violet"
const getErrorClassName = "text-xs text-red-500 font-bold pt-2"
 
  return (
    <>
    { showSuccess ? (
      <div className=""><CardConfirmation continueHandler={setShowSuccess}/></div>
    ) : (
      <form  className="flex flex-col gap-6 w-[400px]" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
         <label className={getLabelClassName}>Cardholder Name</label>
         <input
           name="name"
           className={getInputClassName("name")} 
           autoComplete="cc-csc" 
           type="text"
           maxLength="21"
           placeholder="e.g Jane Appleseed"
           {...register('name',{
             required: "Can't be blank",
           })}
         />
         {errors.name && <span className={getErrorClassName} >{errors.name.message}</span>}

     </div>
     <div className="flex flex-col">
         <label  className={getLabelClassName}>Card Number</label>
         <input
           name="ccalias"
           className={getInputClassName("ccalias")} 
           autoComplete="cc-csc" 
           type="text"
           maxLength="19"
           placeholder="e.g 1234 5678 9000 1234"
           {...register('ccalias',{
             required: "Can't be blank",
             validate: validateCCAlias
           })}
         />
         {errors.ccalias && <span  className={getErrorClassName}>{errors.ccalias.message}</span>}
     </div>
     <div className="flex flex-row gap-4">
     <div className="flex flex-col">
       <label htmlFor="month" className={getLabelClassName}>Exp. date (MM/YY)</label>
       <div className="flex gap-2">
         <div className="flex flex-col">
           <input 
             type="text" 
             id="mmalias" 
             name="mmalias" 
             placeholder="MM"
             maxLength="2" 
             className={`${getInputClassName("mmalias")} w-20`} 
             autoComplete="cc-csc"
             {...register('mmalias',{
               required: "Can't be blank",
               pattern: {
                 value: /^(0[1-9]|1[0-2])$/,
                 message: 'MM should be between 01-12.'
               }
             })}
             
           />
           {errors.mmalias && <span className={getErrorClassName}>{errors.mmalias.message}</span>}
         </div>
         <div className="flex flex-col">
         <input 
           id="yyalias" 
           type="text" 
           name="yyalias"  
           placeholder="YY"
           maxLength="2" 
           className={`${getInputClassName("yyalias")} w-20`} 
           autoComplete="cc-csc"
           {...register('yyalias',{
             required: "Can't be blank",
             pattern: {
               value: /^\d{2}$/,
               message: 'YY should be two numeric digits.'
             },
             validate: validateExpiryDate
           })}
         />
         {errors.yyalias && <span className={getErrorClassName}>{errors.yyalias.message}</span>}
         </div>

       </div>
     </div>
     <div className="flex flex-col">
         <label  className={getLabelClassName}>cvc</label>
         <input
           name="cvc"
           className={getInputClassName("cvc")} 
           autoComplete="cc-csc" 
           type="text"
           maxLength="3"
           placeholder="e.g 123"
           {...register('cvc', {
             required: "Can't be blank",
             pattern: {
               value: /^\d{3}$/,
               message: 'CVC should be a 3-digit format.'
           }
           })}
         />
         {errors.cvc && <span className={getErrorClassName}>{errors.cvc.message}</span>}

     </div>
     </div>
     
     <button type="submit" className="transition-text duration-200 bg-dark-violet text-light-gray-violet font-semibold p-3 mt-3 rounded-md hover:text-white">Confirm</button>
    </form>
    )}
    </>
)}

export default CardForm
