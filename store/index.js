import { create } from 'zustand';

const useStore = create((set) => ({
  cart: [],
  designs: [],
  addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
  addDesign: (design) => set((state) => ({ designs: [...state.designs, design] })),
  removeFromCart: (index) => set((state) => ({ 
    cart: state.cart.filter((_, i) => i !== index) 
  })),
  clearCart: () => set({ cart: [] }),
}));

export default useStore;
