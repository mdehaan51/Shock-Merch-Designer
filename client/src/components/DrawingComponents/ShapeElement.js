// @flow
import React, { useEffect } from "react";
import { Image, Transformer } from "react-konva";
import Konva from "konva";
import useImage from "use-image";

const ShapeElement = ({
	shapeProps,
	isSelected,
	onSelect,
	onChange,
	url,
	hex,
	blue,
	red,
	green,
	x,
	y
}) => {
	const shapeRef = React.useRef();
	const trRef = React.useRef();
	const [image] = useImage(url);


	useEffect(() => {
		if (hex) {
			shapeRef.current.cache();
			// since this update is not handled by "react-konva" and we are using Konva methods directly
			// we have to redraw layer manually
			shapeRef.current.getLayer().batchDraw();
		}
	});

	useEffect(() => {
		if (isSelected) {
			// we need to attach transformer manually

			trRef.current.setNode(shapeRef.current);

			trRef.current.getLayer().batchDraw();
		}
	}, [isSelected]);

	return (
		<React.Fragment>
			<Image
				onClick={onSelect}
				onTap={onSelect}
				ref={shapeRef}
				{...shapeProps}
				x={x}
				y={y}
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
				opacity={0.8}
				filters={[Konva.Filters.RGB]}
				blue={blue}
				red={red}
				green={green}
			/>
			{isSelected && <Transformer ref={trRef} />}
		</React.Fragment>
	);
};

export default ShapeElement;
