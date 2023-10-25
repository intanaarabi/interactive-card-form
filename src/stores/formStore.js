// store.js
import create from 'zustand';

const useFormDetailsStore = create((set) => ({
  formDetails: {
    name: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvc: '',
  },
  setFormDetails: (details) =>
    set((state) => ({
      formDetails: {
        ...state.formDetails,
        ...details,
      },
    })),
}));

export default useFormDetailsStore;