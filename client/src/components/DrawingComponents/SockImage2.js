import React, { Component } from "react";
import Konva from "konva";
import { render } from "react-dom";
import { Stage, Layer, Rect, Image } from "react-konva";
import useImage from "use-image";

const URL = "images/WhiteSocks.png";

const SockImage2 = ({ width, height, red, blue, green, src, x }) => {
	const [image] = useImage(src, "Anonimus");
	const imageRef = React.useRef();

	React.useEffect(() => {
		if (image) {
			// you many need to reapply cache on some props changes like shadow, stroke, etc.
			imageRef.current.cache();
			// since this update is not handled by "react-konva" and we are using Konva methods directly
			// we have to redraw layer manually
			imageRef.current.getLayer().batchDraw();
		}
	}, [image]);

	return (
		<Image
			filters={[Konva.Filters.RGB]}
			x={x}
			y={10}
			width={width}
			height={height}
			image={image}
			blue={blue}
			red={red}
			green={green}
			ref={imageRef}
		/>
	);
};

export default SockImage2;
