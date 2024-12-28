import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const VERSION_STORAGE = 1;

// BASE STORE
type StoreState = {
  theme: 'light' | 'dark';
};

type Action = {
  setTheme: (theme: StoreState['theme']) => void;
};

const initialState: StoreState = {
  theme: 'light',
};

export const useAppStore = create(
  persist<StoreState & Action>(
    (set) => ({
      ...initialState,
      setTheme: (theme) =>
        set(() => {
          localStorage.setItem('theme', theme);

          if (theme === 'dark') {
            document.body.classList.add('cd-dark');
          } else {
            document.body.classList.remove('cd-dark');
          }

          return { theme };
        }),
    }),
    {
      name: `storage-base-${VERSION_STORAGE}`,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
