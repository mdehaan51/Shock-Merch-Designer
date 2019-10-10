import React, { Component } from "react";
import { render } from "react-dom";
import { Stage, Layer, Text, Transformer, Group } from "react-konva";

const TextElement = ({
	shapeProps,
	isSelected,
	onSelect,
	onChange,
	text,
	style,
	textProps,
	id,
	x,
	y,
	rotation
}) => {
	const shapeRef = React.useRef();
	const trRef = React.useRef();

	React.useEffect(() => {
		if (isSelected) {
			// we need to attach transformer manually
			trRef.current.setNode(shapeRef.current);
			trRef.current.getLayer().batchDraw();
		}
	}, [isSelected]);

	return (
		<React.Fragment>
			<Group
				key={id}
				rotation={rotation}
				onClick={onSelect}
				ref={shapeRef}
				x={x}
				y={y}
				draggable
				onDragEnd={e => {
					onChange({
						...textProps,
						x: e.target.x(),
						y: e.target.y()
					});
				}}
				onTransformEnd={e => {
					// transformer is changing scale
					const node = shapeRef.current;
					const scaleX = node.scaleX();
					const scaleY = node.scaleY();
					console.log(node);

					// we will reset it back
					node.scaleX(1);
					node.scaleY(1);
					onChange({
						...textProps,
						x: node.x(),
						y: node.y(),
						rotation: node.rotation(),
						width: node.width() * scaleX,
						height: node.height() * scaleY
					});
				}}
			>
				<Text
					text={text}
					{...textProps.style}
					//fontSize="12px"
					//fontWeight="200"
					//lineHeight="12px"
					//fontFamily="Anton"
				/>
			</Group>
			{isSelected && <Transformer ref={trRef} resizeEnabled={false} />}
		</React.Fragment>
	);
};

export default TextElement;
