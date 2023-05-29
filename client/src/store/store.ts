import {combineReducers, configureStore} from '@reduxjs/toolkit';
import mouseEventSlice from "./mouseEventReducer";
import questionEventSlice from './questionEventReducer';
import dragEventSlice from './dragEventReducer';

const rootReducer = combineReducers({
    mouseEventSlice,
    questionEventSlice,
    dragEventSlice,
})

export function setupStore() {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']