import { Oval } from 'react-loader-spinner';


export const Loader = () => {
    return (
    <div className='Loader-wrapper'>
        <Oval
            visible={true}
            height="80"
            width="80"
            radius="9"
            color="black"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""   
            />
    </div>
    )

};