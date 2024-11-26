/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
import { FC } from "react";

interface LoadingProps {
  [x: string]: any;
}

const Loading: FC<LoadingProps> = ({}) => {
  return (
    <div className="scene">
      <div className="shadow"></div>
      <div className="jumper">
        <div className="spinner">
          <div className="scaler">
            <div className="loader">
              <div className="cuboid">
                <div className="cuboid__side"></div>
                <div className="cuboid__side"></div>
                <div className="cuboid__side"></div>
                <div className="cuboid__side"></div>
                <div className="cuboid__side"></div>
                <div className="cuboid__side"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
