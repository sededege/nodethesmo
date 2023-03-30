import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";

function valuetext(value) {
  return `${value}°C`;
}

const minDistance = 10;

export default function MinimumDistanceSlider({categorias, data}) {
  const [value1, setValue1] = React.useState([0, 1200]);
  const [{ products }, dispatch] = useStateValue();
  const [products2, setProducts2] = React.useState();


  React.useEffect(() => {
    if (categorias === 'todos'){
        fetchData()
    } else if (categorias !== 'todos'){
        setProducts2(data)
    }
  }, [categorias,data]);

  const fetchData = React.useCallback(() => {
    fetch("https://mysterious-caverns-45525.herokuapp.com/api/products?populate=*")
      .then((response) => response.json())
      .then((data) => {
        console.log('asd',data.data)
       setProducts2(data.data)
      });
  }, []);

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }

    const filtro1 = products2.filter((a) => (a.attributes.price*a.attributes.qty) > value1[0]);
    const filtro2 = filtro1.filter((a) =>  (a.attributes.price*a.attributes.qty) < value1[1]);

    dispatch({
      type: actionType.SET_PRODUCTS,
      products: filtro2,
    });
  };

  return (
    <Box className="p-6 ">
      <Slider
        getAriaLabel={() => "Minimum distance"}
        value={value1}
        onChange={handleChange1}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
        min={10}
        max={1200}
      />
      <div className="flex justify-between">
        <p>{value1[0]}</p>
        <p>{value1[1]}</p>
      </div>
    </Box>
  );
}
