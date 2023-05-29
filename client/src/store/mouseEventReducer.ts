import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface MouseEventState {
    bool: boolean
}

const initialMouseEvent: MouseEventState = {
    bool: false
}

export const mouseEventSlice = createSlice({
    name: 'mouseEvent',
    initialState: initialMouseEvent,
    reducers: {
        setBool(state, action: PayloadAction<boolean>) {
            state.bool = action.payload
        }
    }
})

export default mouseEventSlice.reducer;