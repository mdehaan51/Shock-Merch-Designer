import React from "react";
import * as Sentry from "@sentry/browser";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import * as serviceWorker from "./components/serviceWorker";

function noop() {}

if (process.env.NODE_ENV !== "development") {
	Sentry.init({
		dsn: "https://85ecf62311df4fc5979357b701caf672@sentry.io/1811803"
	});

	console.log = noop;
	console.error = noop;
	console.warn = noop;
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
