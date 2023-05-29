import axios from "axios";
import { dragEventSlice } from "./dragEventReducer";
import { questionEventSlice } from "./questionEventReducer";
import { AppDispatch } from "./store";

export const fetchData = (id: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(questionEventSlice.actions.setVisibleSegmentFetching(id))
        const response = await axios.get<{name: string, symbols: string[]}[]>(`http://127.0.0.1:5000/list_of_segments?id=${id}`)
        dispatch(questionEventSlice.actions.segmentFetchingSuccess(response.data))
    } catch (error: any) {
        dispatch(questionEventSlice.actions.segmentFetchingError(error.message))    
    }
}

export const fetchImg = (props: {id: number, image: File[]}) => async (dispatch: AppDispatch) => {
    try {
        const formData: FormData = new FormData()
        const nameFiles: string[] = []
        props.image.forEach((file, index) => {
            formData.append(`file${index}`, file)
            nameFiles.push(file.name.split('.')[0])
        })
        dispatch(dragEventSlice.actions.semanticFetching(nameFiles))
        const response = await axios.post(`http://127.0.0.1:5000/list_of_symbols?id=${props.id}`, formData)
        dispatch(dragEventSlice.actions.semanticFetchingSuccess(response.data))
    } catch (error: any) {
        dispatch(dragEventSlice.actions.semanticFetchingError(error.message))
    }
}