import React, { useEffect, useRef } from 'react';

//[to do] refactor when will decide on libraries for canvas;
const canvasStyle = {
  backgroundColor: '#eeee',
  borderRadius: '5px',
  border: '1px solid gray',
};

const ResLayout: React.FC<{ draw: Function }> = (props) => {
  const { draw } = props;
  const canvasRef = useRef(null);

  useEffect(
    () => {
      const canvas: any = canvasRef.current;
      const context = canvas.getContext('2d');
      draw(context);
    },
    [ draw ],
  );

  return (
    <div>
      <p className="">In Restaurant Layout Component</p>

      <canvas ref={canvasRef} style={canvasStyle} />
    </div>
  );
};

export default ResLayout;
