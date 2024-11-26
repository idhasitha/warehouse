import React, { FC, useEffect } from "react";
import { Rect, Text, Transformer } from "react-konva";

interface RectangleProps {
  shapeProps: any;
  isSelected?: boolean;
  onSelect: () => void;
  onChange: (newAttrs: any) => void;
}

const Rectangle: FC<RectangleProps> = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
}: any) => {
  const shapeRef = React.useRef<any>();
  const trRef = React.useRef<any>();

  const [resizeFactor, setResizeFactor] = React.useState(1);

  React.useEffect(() => {
    if (isSelected && trRef.current) {
      // Check if trRef.current is defined
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  useEffect(() => {
    const stage = shapeRef.current;

    // Function to handle mousemove event
    const handleMouseMove = (e: any) => {
      // Calculate the resize factor based on mouse movement
      const newResizeFactor = 1 + e.evt.movementX / 100;
      setResizeFactor(newResizeFactor);
    };

    // Add mousemove event listener to the stage
    stage.on("mousemove", handleMouseMove);

    // Cleanup function to remove the event listener
    return () => {
      stage.off("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div>
      <Rect
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            opacity: Number(shapeProps.opacity),
            width: Math.round(shapeProps.width / 20),
            height: Math.round(shapeProps.height / 20),
            x: Math.round(e.target.x() / 20),
            y: Math.round(e.target.y() / 20),
          });
        }}
        onDragMove={(e) => {
          e.target.x(Math.round(e.target.x() / 20) * 20);
          e.target.y(Math.round(e.target.y() / 20) * 20);
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);

          onChange({
            ...shapeProps,
            opacity: Number(shapeProps.opacity),
            x: Math.round(node.x() / 20),
            y: Math.round(node.y() / 20),
            // set minimal value
            width: Math.max(Math.round(node.width() / 20) * scaleX),
            height: Math.max(Math.round(node.height() / 20) * scaleY),
          });
        }}
      ></Rect>
      {shapeProps.name && (
        <Text
          text={`${shapeProps.name} ${Math.round(
            shapeProps.width / 20
          )}m x ${Math.round(shapeProps.height / 20)}m`}
          fontSize={15}
          align="center"
          fontFamily="Roboto"
          fill="gray"
          verticalAlign="middle"
          x={shapeProps.x + 10}
          y={shapeProps.y + 5}
          z={-1}
        />
      )}

      {isSelected && (
        <Transformer
          ref={trRef}
          flipEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            const newX = Math.round(newBox.x / 20) * 20;
            const newY = Math.round(newBox.y / 20) * 20;

            const dx = newX - newBox.x;
            const dy = newY - newBox.y;

            newBox.x = newX;
            newBox.y = newY;

            newBox.width = Math.round((newBox.width - dx) / 20) * 20;
            newBox.height = Math.round((newBox.height - dy) / 20) * 20;
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }

            return newBox;
          }}
        />
      )}
    </div>
  );
};

export default Rectangle;
