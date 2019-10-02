import React, { Component } from "react";
import Konva from "konva";
import { render } from "react-dom";
import { Stage, Layer, Rect, Image } from "react-konva";
import useImage from "use-image";

const URL = "images/WhiteSocks.png";

// example of functional component
export const Socks = (blue, red, green) => {
	const [image] = useImage(URL, "Anonimus");
	const imageRef = React.useRef();

	// when image is loaded we need to cache the shape
	React.useEffect(() => {
		if (image) {
			// you many need to reapply cache on some props changes like shadow, stroke, etc.
			imageRef.current.cache();
			// since this update is not handled by "react-konva" and we are using Konva methods directly
			// we have to redraw layer manually
			imageRef.current.getLayer().batchDraw();
			console.log(imageRef.current);
		}
	}, [image]);

	return (
		<Image
			ref={imageRef}
			height={800}
			width={800}
			image={image}
			filters={[Konva.Filters.RGB]}
			blue={blue}
			red={red}
			green={green}
		/>
	);
};
