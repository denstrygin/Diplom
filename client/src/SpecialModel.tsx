import DropBoxModel from './DropBoxModel';
import {useAppSelector} from './store/hook';

interface ModelComponent {
    header: string
    imgUrl: string
    altImg: string
  }
  
const listOfModels: ModelComponent[] = [
  {
    header: 'Натюрморты застолья',
    imgUrl: './img/table3.jpg',
    altImg: 'натюрморт застолья',
  },
  {
    header: 'Цветочные натюрморты',
    imgUrl: './img/flower3.jpg',
    altImg: 'цветочный натюрморт',
  },
  {
    header: 'Ученые натюрморты',
    imgUrl: './img/skeleton3.jpg',
    altImg: 'суета сует',
  },
]

function SpecialModel() {
    const {bool} = useAppSelector(state => state.mouseEventSlice)
    const topMargin: string = bool ? "": " spModel"
    
    return (
        <div className={'flex flex-col w-[96%] absolute top-[32px] transAddition' + topMargin}>
            <div className='rounded bg-white w-full shadow-lg mb-4 text-center font-serif font-bold text-2xl p-4'>Поиск символов по направлениям</div>
            <div className='flex justify-between'>
                {listOfModels.map((item, index) => <DropBoxModel key={index} idKey={index} header={item.header} imgUrl={item.imgUrl} altImg={item.altImg} />)}
            </div>
        </div>
    );
}

export default SpecialModel;