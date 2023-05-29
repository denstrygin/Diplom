import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface Semantic {
    key: string
    value: string
    color: string
}

interface DragEventState {
    isLoading: boolean
    error: string
    nameFiles: string[]
    imagesMasksSemantics: {image: any, image_masks: any, list_of_symbols: any, color: any}[]
    image: string[]
}

const initialDragEvent: DragEventState = {
    isLoading: false,
    error: '',
    nameFiles: [],
    imagesMasksSemantics: [],
    image: [],
}

export const dragEventSlice = createSlice({
    name: 'dragEvent',
    initialState: initialDragEvent,
    reducers: {
        semanticFetching(state, action: PayloadAction<string[]>) {
            state.isLoading = true
            state.nameFiles = action.payload
        },
        semanticFetchingSuccess(state, action: PayloadAction<any>) {
            state.isLoading = false
            state.error = ''
            state.imagesMasksSemantics = action.payload
        },
        semanticFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        },
        clearState(state) {
            state.imagesMasksSemantics = []
            state.error = ''
        }
    }
})

export default dragEventSlice.reducer;