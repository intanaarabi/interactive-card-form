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

  useEffect(() => {
    if (cc_num) {
        // Step 1: Remove all non-numeric characters
        let cleanedValue = cc_num.replace(/\D/g, '');

        // Check for non-numeric characters
        if (cleanedValue.length !== cc_num.replace(/\s+/g, '').length) {
            setError('ccalias', {
                type: 'manual',
                message: 'Credit card number should only contain numeric characters.'
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
}, [cc_num, setValue, setError]);

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
                pattern: {
                  value: /^(\d{4} ){3}\d{4}$/,
                  message: 'Invalid card number.'
                }
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
                id="month" 
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
              type="number" 
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
              {...register('cvc',{
                required: 'This is required.',
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
