import UniversalModel from './UniversalModel';
import Control from './Control';
import SpecialModel from './SpecialModel';
import SymbolWindow from './SymbolWindow';

function Body() {
    return (
        <div className='overflow-hidden flex bg-gray-light relative'>
            <Control />
            <div className='w-full flex flex-col items-center font-serif relative'>
                <UniversalModel />
                <SpecialModel />
                <SymbolWindow />
            </div>
        </div>
    );
}

export default Body;