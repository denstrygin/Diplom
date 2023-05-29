import InputText from "./InputFile";
import { useAppDispatch, useAppSelector } from "./store/hook";
import { questionEventSlice } from "./store/questionEventReducer";
import './animation.css';
import './scrollbar.css';
import { fetchData } from "./store/fetching";

function UniversalModel() {
    const imgs: {url: string, alt: string}[] = [
        {
            url: "./img/flower.jpg",
            alt: "цветочный натюрморт",
        },
        {
            url: "./img/skeleton.webp",
            alt: "ученый натюрморт",
        },
        {
            url: "./img/table.jpg",
            alt: "натюрморт затсолья",
        },
        {
            url: "./img/flower2.jpg",
            alt: "цветочный натюрморт",
        },
        {
            url: "./img/skeleton2.jpg",
            alt: "ученый натюрморт",
        },
        {
            url: "./img/table2.jpg",
            alt: "натюрморт затсолья",
        },
    ]
    const {bool} = useAppSelector(state => state.mouseEventSlice)
    const {visible, id} = useAppSelector(state => state.questionEventSlice)
    const {setVisible} = questionEventSlice.actions;
    const dispatch = useAppDispatch()
    const topMargin: string = bool ? " unModel" : ""
    function fetchOrVisible() {
        if (visible === true) {
            dispatch(setVisible(false))
        } else if (visible === false && -1 === id) {
            dispatch(setVisible(true))
        } else {
            dispatch(fetchData(-1))
        }
    }

    return (
        <div className={"flex flex-col font-serif items-center w-[96%] bg-white rounded shadow-lg h-[580px] p-4 absolute transAddition top-[32px]" + topMargin}>
            <div className='flex items-baseline'>
                <span className="font-bold text-2xl">Поиск символов на голландском натюрморте по трём направлениям</span>
                <img onClick={e => fetchOrVisible()} className='ml-[10px] w-[20px] h-[20px] cursor-pointer' src={require('./img/question.png')} alt="?" />
            </div>
            <InputText idKey={-1} />
            <span className='font-bold'>Пример тематических изображений</span>
            <div className='flex justify-center max-w-[90%] h-[34%] overflow-x-auto scrollbar'>
                {imgs.map((img, index) => <img 
                    key={index}
                    src={require(`${img.url}`)}
                    alt={img.alt}
                />)}
            </div>
        </div>
    );
}

export default UniversalModel;