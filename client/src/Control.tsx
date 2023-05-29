import {useAppDispatch, useAppSelector} from './store/hook'; 
import {mouseEventSlice} from './store/mouseEventReducer';
import { questionEventSlice } from './store/questionEventReducer';

function Control() {
    const {bool} = useAppSelector(state => state.mouseEventSlice)
    const {setBool} = mouseEventSlice.actions;
    const {setVisible} = questionEventSlice.actions;
    const dispatch = useAppDispatch()

    return(
        <div className="flex h-[90vh] items-center">
            <div className="h-[200px] w-[100px] flex justify-center items-center shadow-lg bg-white rounded-tr-[100%] rounded-br-[100%]">
                <div className="h-[60px] flex">
                    {bool
                        ? (<>
                        <button disabled className="border-gray-dark border-2 rounded w-[40px] h-[40px] text-2xl self-end">&#8595;</button>
                        <button onClick={() => {dispatch(setBool(false)); dispatch(setVisible(false))}} className="hover:bg-gray-light border-gray-dark border-2 rounded w-[40px] h-[40px] text-2xl">&#8593;</button>
                        </>)
                        : (<>
                        <button onClick={() => {dispatch(setBool(true)); dispatch(setVisible(false))}} className="hover:bg-gray-light border-gray-dark border-2 rounded w-[40px] h-[40px] text-2xl self-end">&#8595;</button>
                        <button disabled className="border-gray-dark border-2 rounded w-[40px] h-[40px] text-2xl">&#8593;</button>
                        </>)
                    }
                    </div>
            </div>
        </div>
    );
}

export default Control;