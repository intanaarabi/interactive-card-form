import useStore from "../stores/formStore";
import ExpiryInput from "./Inputs/ExpiryInput";
import Input from "./Inputs/Input";
import { useForm } from 'react-hook-form';

function CardForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const setFormData = useStore((state) => state.setFormData);

  const onSubmit = (data) => {
    console.log('test')
    setFormData(data);
  };

  return (
      <form  className="flex flex-col gap-8 w-[400px]" onSubmit={handleSubmit(onSubmit)}>
        <Input 
          label="Cardholder Name" 
          placeholder="e.g. Jane Appleseed" 
          type="text" 
          errors={errors}
          name="name"
          {...register('name', { required: "Can't be blank." })}
          />
        <Input 
          label="Card Number" 
          placeholder="e.g. 1234 5678 9123 0000" 
          type="text"
          name="ccalias"
          {...register('ccalias',{ required: "Can't be blank." })} 

          errors={errors}
        />
        <div className="flex flex-row gap-4">
        <ExpiryInput {...register('mmalias',{ required: "Can't be blank." })} {...register('yyalias',{ required: "Can't be blank." })} errors={errors} />
            <Input 
                label="CVC" 
                placeholder="e.g. 123" 
                type="text" 
                name="cvc"
                {...register('cvc',{ required: "Can't be blank." })}
                errors={errors}
            />
        </div>
        <button type="submit">Confirm</button>
      </form>
  );
}

export default CardForm;
