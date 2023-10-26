import create from 'zustand';

const useStore = create((set) => ({
  formData: {
  },
  setFormData: (data) => set({ formData: data }),
  resetFormData: () => set({})
}));

export default useStore;