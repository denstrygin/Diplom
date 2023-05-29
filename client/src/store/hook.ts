import {AppDispatch, RootState} from './store'
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux'

export function useAppDispatch() {
    return useDispatch<AppDispatch>()
}
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;