import React, { useState } from "react";

const Trial = ({onValue}) => {
  console.log({onValue});
  const [click, setClicked] = useState(0);

    if(onValue!==undefined){
        onValue("1000")
    }

  const clicked = () => {
    console.log(setClicked(1));
  };

  return <button onClick={() => clicked()}>Click button {click}</button>;
};

export default Trial;
