import { useEffect } from "react";
import useStore from "../stores/formStore";
import ExpiryInput from "./Inputs/ExpiryInput";
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
        <ExpiryInput {...register('mmalias',{ required: "Can't be blank." })} {...register('yyalias',{ required: "Can't be blank." })} errors={errors} />
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
