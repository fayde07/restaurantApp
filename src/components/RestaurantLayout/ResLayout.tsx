import React, { useEffect, useRef } from 'react';
import { Rectangle } from '../../utils/classes/Rectangle';

//[to do] refactor when will decide on libraries for canvas;
const canvasStyle = {
  backgroundColor: '#eeee',
  borderRadius: '5px',
  border: '1px solid gray',
};

const ResLayout: React.FC<{ draw: Function,rect:Rectangle }> = (props) => {
  const { draw,rect } = props;
  
  const canvasRef= useRef<HTMLCanvasElement>(null);
  

  useEffect(
    () => {
      const canvas: any = canvasRef.current;
      const context = canvas.getContext('2d');
      draw(context);
    },
    [ draw ],
  );

  const handlsmth = (e:any):void => { 
    let rect2:any = canvasRef?.current?.getBoundingClientRect();
    let op:boolean|undefined = rect.clickRectangle(e.clientX-rect2.left, e.clientY-rect2.top)!
    console.log(op);
    
    if(op){
      rect.changeColor("red")
      //question here, about how to get the context & generalization 
      //rect to be array of new Rect; and loop over them and get the draw and context?
      rect.draw(canvasRef.current?.getContext('2d'))
    }else{
      rect.changeColor("#000")
      rect.draw(canvasRef.current?.getContext('2d'))
    }
     
  }
  

  return (
    <div>
      <p> In Restaurant Layout Component</p>
      <canvas
        ref={canvasRef}
        style={canvasStyle}
        onClick={handlsmth}
        height={200} width={400}
      />
    </div>
  );
};

export default ResLayout;
