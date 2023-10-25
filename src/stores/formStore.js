import create from 'zustand';

const useStore = create((set) => ({
  formData: {},
  setFormData: (data) => set({ formData: data }),
}));

export default useStore;