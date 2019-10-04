// @flow
import React, { Component } from "react";
import { Stage, Layer, Text, Image, Transformer } from "react-konva";
import useImage from "use-image";

const ShapeElement = ({ shapeProps, isSelected, onSelect, onChange, url }) => {
	const shapeRef = React.useRef();
	const trRef = React.useRef();
	const [image] = useImage(url);

	React.useEffect(() => {
		shapeRef.current.setZIndex(2);
		if (isSelected) {
			// we need to attach transformer manually
			trRef.current.setNode(shapeRef.current);
			//trRef.current.setZIndex(2);
			trRef.current.getLayer().batchDraw();
		}
	}, [isSelected]);

	return (
		<React.Fragment>
			<Image
				onClick={onSelect}
				ref={shapeRef}
				{...shapeProps}
				x={100}
				y={100}
				draggable
				image={image}
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
				opacity={0.3}
			/>
			{isSelected && <Transformer ref={trRef} />}
		</React.Fragment>
	);
};

export default ShapeElement;
