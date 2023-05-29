import InputText from './InputFile';
import { fetchData } from './store/fetching';
import {useAppDispatch, useAppSelector} from './store/hook';
import {questionEventSlice} from './store/questionEventReducer';

function DropBoxModel({idKey, header, imgUrl, altImg}: {idKey: number, header: string, imgUrl: string, altImg: string}) {
    const {setVisible} = questionEventSlice.actions;
    const dispatch = useAppDispatch()
    const {visible, id} = useAppSelector(state => state.questionEventSlice)
    function fetchOrVisible() {
        if (visible === true) {
            dispatch(setVisible(false))
        } else if (visible === false && idKey === id) {
            dispatch(setVisible(true))
        } else {
            dispatch(fetchData(idKey))
        }
    }

    return (
        <div className="flex flex-col items-center w-[30%] bg-white rounded shadow-lg p-4">
            <div className='flex items-baseline'>
                <span className="font-bold text-2xl">{header}</span>
                <img className='ml-[10px] w-[20px] h-[20px] cursor-pointer' onClick={e => fetchOrVisible()} src={require('./img/question.png')} alt="?" />
            </div>
            <InputText idKey={idKey} />
            <span className='font-bold'>Пример тематического изображения</span>
            <img className="max-w-[95%] max-h-[200px]" src={require(`${imgUrl}`)}
                alt={altImg}
            />
        </div>
    );
}

export default DropBoxModel;