import { useEffect } from "react";
import useStore from "../stores/formStore";
import { useForm } from 'react-hook-form';

function CardForm() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const setFormData = useStore((state) => state.setFormData);
  const resetFormData = useStore((state) => state.resetFormData);

  const watchedFormValues = watch(); // This will watch for changes in form values
  const cc_num = watch('ccalias');
  const cvc_num = watch('cvc')

  //Form validation for card number 
  useEffect(() => {
    if (cc_num) {
        // Step 1: Remove all non-numeric characters
        let cleanedValue = cc_num.replace(/\D/g, '');

        // Check for non-numeric characters
        if (cleanedValue.length !== cc_num.replace(/\s+/g, '').length) {
            setError('ccalias', {
                type: 'manual',
                message: 'Wrong format, numbers only.'
            });
            return;
        } else {
          clearErrors()
        }

        // Step 2: Insert spaces after every 4 digits
        let formattedValue = cleanedValue.replace(/(\d{4})(?=\d)/g, '$1 ');

        // Step 3: Use the formatted string if it's different from the original
        if (formattedValue !== cc_num) {
            setValue('ccalias', formattedValue);
        }
    }
}, [cc_num, setValue, setError, clearErrors]);

  //Form validation for cvc number
  useEffect(() => {
    // Check if the value is not numeric or exceeds three characters
    if (!/^[0-9]*$/.test(cvc_num)) {
        setError('cvc', {
            type: 'manual',
            message: 'Wrong format, numbers only.'
          });
    } else {
        clearErrors('cvc');
    }
}, [cvc_num, setError, clearErrors]);

  //Form validation for mm/yy expiration
    const mmValue = watch('mmalias');
    const yyValue = watch('yyalias');
    const currentYear = new Date().getFullYear();
    const lastTwoDigitsCurrentYear = currentYear % 100;

    useEffect(() => {

      if (mmValue?.length === 2 && !/^(0[1-9]|1[0-2])$/.test(mmValue)) {
          setError('mmalias', {
              type: 'manual',
              message: 'Please enter a valid month.'
          });
      } else {
          clearErrors('mmalias');
      }
  
      const enteredYear = parseInt(yyValue, 10);

      if (yyValue?.length === 2) {
        if (!/^[0-9]{2}$/.test(yyValue)) {
          setError('yyalias', {
              type: 'manual',
              message: 'Please enter a valid year.'
          });
      } else if (isNaN(enteredYear) || enteredYear < lastTwoDigitsCurrentYear || (enteredYear === lastTwoDigitsCurrentYear && parseInt(mmValue, 10) < new Date().getMonth() + 1)) {
          setError('yyalias', {
              type: 'manual',
              message: 'Expiration is in the past.'
          });
      } else if (enteredYear > lastTwoDigitsCurrentYear + 20) { // Assuming 20 years is our max
          setError('yyalias', {
              type: 'manual',
              message: 'Too far in the future.'
          });
      } else {
          clearErrors('yyalias');
      }
    }
  }, [mmValue, yyValue, setError, clearErrors, lastTwoDigitsCurrentYear]);
  

  useEffect(() => {
    setFormData(watchedFormValues); 
  }, [watchedFormValues, setFormData]);  

  const onSubmit = () => {
    reset();
    resetFormData()
  };


  return (
      <form  className="flex flex-col gap-6 w-[400px]" onSubmit={handleSubmit(onSubmit)}>
         <div className="flex flex-col">
            <label className="uppercase font-medium text-sm tracking-wide mb-2">Name</label>
            <input
              name="name"
              className={`border rounded p-2 ${ errors["name"] ? 'border-red-500' : ''}`} 
              autoComplete="cc-csc" 
              type="text"
              maxLength="21"
              placeholder="e.g Jane Appleseed"
              {...register('name',{
                required: 'This is required.',
              })}
            />
            {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}

        </div>
        <div className="flex flex-col">
            <label className="uppercase font-medium text-sm tracking-wide mb-2">Card Number</label>
            <input
              name="ccalias"
              className={`border rounded p-2 ${ errors["ccalias"] ? 'border-red-500' : ''}`} 
              autoComplete="cc-csc" 
              type="text"
              maxLength="19"
              placeholder="e.g 1234 5678 9000 1234"
              {...register('ccalias',{
                required: 'This is required.',
              })}
            />
            {errors.ccalias && <span  className="text-xs text-red-500">{errors.ccalias.message}</span>}
        </div>
        <div className="flex flex-row gap-4">
        <div className="flex flex-col">
          <label htmlFor="month" className="uppercase font-medium text-sm tracking-wide mb-2">Expiry Date (MM/YY)</label>
          <div className="flex gap-2">
            <div className="flex flex-col">
              <input 
                type="text" 
                id="mmalias" 
                name="mmalias" 
                placeholder="MM"
                maxLength="2" 
                className={`border rounded w-20 p-2 ${errors["mmalias"] ? 'border-red-500' : ''}`} 
                autoComplete="cc-csc"
                {...register('mmalias',{
                  required: 'This is required.',
                })}
                
              />
              {errors.mmalias && <span className="text-xs text-red-500">{errors.mmalias.message}</span>}
            </div>
            <div className="flex flex-col">
            <input 
              id="yyalias" 
              type="text" 
              name="yyalias"  
              placeholder="YY"
              maxLength="2" 
              className={`border rounded w-20 p-2 ${errors["yyalias"] ? 'border-red-500' : ''}`} 
              autoComplete="cc-csc"
              {...register('yyalias',{
                required: 'This is required.',
              })}
            />
            {errors.yyalias && <span className="text-xs text-red-500">{errors.yyalias.message}</span>}
            </div>

          </div>
        </div>
        <div className="flex flex-col">
            <label className="uppercase font-medium text-sm tracking-wide mb-2">cvc</label>
            <input
              name="cvc"
              className={`border rounded p-2 ${ errors["cvc"] ? 'border-red-500' : ''}`} 
              autoComplete="cc-csc" 
              type="text"
              maxLength="3"
              placeholder="e.g 123"
              {...register('cvc', {
                required: 'This is required.'
              })}
            />
            {errors.cvc && <span className="text-xs text-red-500">{errors.cvc.message}</span>}

        </div>
        </div>
        
        <button type="submit">Confirm</button>
      </form>
  );
}

export default CardForm;
