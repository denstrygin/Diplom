import { useAppSelector, useAppDispatch } from './store/hook';
import SemanticComponent from './SemanticComponent'
import {dragEventSlice} from './store/dragEventReducer';
import {Link} from 'react-router-dom';
import './scrollbar.css';

function ImagesPage() {
    const {imagesMasksSemantics, isLoading, error, nameFiles} = useAppSelector(state => state.dragEventSlice)
    const dispatch = useAppDispatch()
    const {clearState} = dragEventSlice.actions

    return (
        <div className='flex flex-col h-[90%] w-full items-center bg-gray-light overflow-y-auto scrollbar'>
            {isLoading
                ? <div className="w-full h-full flex justify-center items-center"><img src={require('./img/loading.gif')} alt="загрузка..." /></div>
                : !error 
                    ? <div className='grid grid-cols-1 gap-2.5 w-[70%] my-2.5 justify-items-center'>
                        {imagesMasksSemantics.map((item, index) => <SemanticComponent key={index} image={item.image} nameFile={nameFiles[index]} image_masks={item.image_masks} list_of_symbols={item.list_of_symbols} />)}
                        <Link to='/'>
                            <button onClick={_ => dispatch(clearState)} className='font-bold bg-white min-w-[300px] min-h-[40px] rounded-xl border-black border-[1px] shadow-lg'>Вернуться к выбору направления</button>
                        </Link>
                    </div>
                    : <div className="w-full h-full flex justify-center items-center"><span className='text-red font-bold text-2xl'>{error}</span></div>
            }   
        </div>
    );
}

export default ImagesPage;