import { onAuthStateChanged, User } from 'firebase/auth';
import React, { useContext, useEffect } from 'react';
import ResLayout from '../../components/RestaurantLayout/ResLayout';
import { UserAuthContext } from '../../contexts/UserContext';
import { Rectangle } from '../../utils/classes/Rectangle';
import { auth } from '../../utils/firebase';

interface HomesProps {}

const Home: React.FC<HomesProps> = ({}) => {
  const { signUserIn } = useContext(UserAuthContext);
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
    <div>
      <h2>in Home page</h2>
      {/* <header>some Header data in Home</header> */}
      <ResLayout draw={draw} rect={rect} />
    </div>
  );
};

export default Home;
