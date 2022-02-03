import React from 'react';
import './App.css';
import ResLayout from './components/RestaurantLayout/ResLayout';
import { Rectangle } from './utils/classes/Rectangle';

const App: React.FC = () => {
  const rect = new Rectangle(300, 100, 10, 10, '#000');
  const rect2 = new Rectangle(250, 180, 10, 10, '#000');

  const draw = (ctx: any) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = '#000000';
    ctx.fillRect(20, 0, 30, 60);

    ctx.fillStyle = '#000000';
    ctx.fillRect(80, 0, 30, 60);

    ctx.fillStyle = '#000000';
    ctx.fillRect(140, 0, 30, 60);

    ctx.fillStyle = '#000000';
    ctx.fillRect(90, 100, 30, 30);

    ctx.fillStyle = '#000000';
    ctx.fillRect(150, 100, 30, 30);

    ctx.fillStyle = 'rgb(200,200,200)';
    ctx.fillRect(210, 0, 90, 90);

    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(40, 110, 22, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();

    rect.draw(ctx);
    rect2.draw(ctx);
  };

  return (
    <div className="App">
      {/* [to do] add style to header*/}
      {/* [to do] header should contain: date, hour, table number, reserve button, firebase - login component*/}
      <header>some Header data</header>
      <ResLayout draw={draw} rect={rect} />
    </div>
  );
};

export default App;
