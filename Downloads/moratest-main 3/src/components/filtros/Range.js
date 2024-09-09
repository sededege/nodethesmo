import React from 'react';
import { useStateValue } from '.././context/StateProvider'
import { actionType } from '.././context/reducer'

const Range = () => {

    const [{ products }, dispatch] = useStateValue();
    const [filtro, setFiltro] = React.useState(products)
    // Our States
    const [value, setValue] = React.useState([0, 2000]);
    const [products2, setProducts2] = React.useState([])


    React.useEffect(() => {
        setProducts2(products)
    }, [products2]) 
    // Changing State when volume increases/decreases
    const rangeSelector = (event, newValue) => {
        setValue(newValue);
      
        dispatch({
            type: actionType.SET_PRODUCTS,
            products: products2.filter(a => a.precio >= value[0] && a.precio <= value[1]),
        });
    };

    return (
        <div style={{
            margin: 'auto',
            display: 'block',

        }} className='w-full' >
{/* 
            <Slider
                value={value}
                onChange={rangeSelector}
                valueLabelDisplay="auto"
                min={0}
                max={2000}
                
            />
            <div className='flex justify-between items-center'>
                <p>{value[0]}</p>
                <p>{value[1]}</p>
            </div> */}
        </div>
    );
}

export default Range;