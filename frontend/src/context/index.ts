import React, { createContext } from 'react';
import MyContextData from '@/interfaces/MyContextData.interface';

export const AppContext = createContext<MyContextData>({} as MyContextData);

