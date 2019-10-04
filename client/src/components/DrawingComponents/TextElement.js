import React, { Component } from "react";
import { render } from "react-dom";
import { Stage, Layer, Rect, Transformer } from "react-konva";

const SquareElement = ({ shapeProps, isSelected, onSelect, onChange }) => {
	const shapeRef = React.useRef();
	const trRef = React.useRef();

	React.useEffect(() => {
		if (isSelected) {
			// we need to attach transformer manually
			trRef.current.setNode(shapeRef.current);
			trRef.current.getLayer().batchDraw();
		}
	}, [isSelected]);
	console.log({ ...shapeProps });
	return (
		<React.Fragment>
			<Rect
				onClick={onSelect}
				ref={shapeRef}
				{...shapeProps}
				draggable
				onDragEnd={e => {
					onChange({
						...shapeProps,
						x: e.target.x(),
						y: e.target.y()
					});
				}}
				onTransformEnd={e => {
					// transformer is changing scale
					const node = shapeRef.current;
					const scaleX = node.scaleX();
					const scaleY = node.scaleY();

					// we will reset it back
					node.scaleX(1);
					node.scaleY(1);
					onChange({
						...shapeProps,
						x: node.x(),
						y: node.y(),
						width: node.width() * scaleX,
						height: node.height() * scaleY
					});
				}}
				shadowBlur={1}
				opacity={0.5}
				fillLinearGradientStartPoint={{ x: -50, y: -50 }}
				fillLinearGradientEndPoint={{ x: 50, y: 50 }}
				fillLinearGradientColorStops={[0, "gray", 1, "darkgray"]}
			/>
			{isSelected && <Transformer ref={trRef} />}
		</React.Fragment>
	);
};

export default SquareElement;
