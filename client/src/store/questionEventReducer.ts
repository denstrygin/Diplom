import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface QuestionEventState {
    visible: boolean
    id: number | null
    data: {name: string, symbols: string[]}[]
    isLoading: boolean
    error: string
}

const initialQuestionEvent: QuestionEventState = {
    visible: false,
    id: null,
    data: [],
    isLoading: false,
    error: ''
}

export const questionEventSlice = createSlice({
    name: 'questionEvent',
    initialState: initialQuestionEvent,
    reducers: {
        setVisibleSegmentFetching(state, action: PayloadAction<number>) {
            state.visible = true
            state.id = action.payload
            state.isLoading = true
        },
        segmentFetchingSuccess(state, action: PayloadAction<{name: string, symbols: string[]}[]>) {
            state.isLoading = false
            state.error = ''
            state.data = action.payload
        },
        segmentFetchingError(state, actoin: PayloadAction<string>) {
            state.isLoading = false
            state.error = actoin.payload
        },
        setVisible(state, action: PayloadAction<boolean>) {
            state.visible = action.payload
        },
    }
})

export default questionEventSlice.reducer;