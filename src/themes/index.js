import { obsidian } from './obsidian';
import { solstice } from './solstice';
import { voltage } from './voltage';
import { meridian } from './meridian';
import { aura } from './aura';
import { bevel } from './bevel';
import { oura } from './oura';
import { hybrid } from './hybrid';
import { createContext, useContext } from 'react';

export const themes = [obsidian, solstice, voltage, meridian, aura, bevel, oura, hybrid];

export const ThemeContext = createContext(obsidian);

export function useTheme() {
  return useContext(ThemeContext);
}

export { obsidian, solstice, voltage, meridian, aura, bevel, oura, hybrid };
