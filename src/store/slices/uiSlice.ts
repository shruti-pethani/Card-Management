import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface UiState {
  activeTab: 'saved-cards' | 'cd-cards';
  sidebarOpen: boolean;
  activeMenuItem: string;
}

const initialState: UiState = {
  activeTab: 'saved-cards',
  sidebarOpen: true,
  activeMenuItem: 'cards',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<'saved-cards' | 'cd-cards'>) => {
      state.activeTab = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setActiveMenuItem: (state, action: PayloadAction<string>) => {
      state.activeMenuItem = action.payload;
    },
  },
});

export const { setActiveTab, toggleSidebar, setActiveMenuItem } = uiSlice.actions;
export default uiSlice.reducer;