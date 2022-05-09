import React, { FunctionComponent } from "react";
import { Global, css } from "@emotion/react";

const defaultStyle = css`
	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
		font-family: "Noto Sans KR";
	}
	html {
		overflow-y: scroll;
	}
	html,
	body,
	a {
		color: inherit;
		text-decoration: none;
		cursor: pointer;
	}
`;

const GlobalStyle: FunctionComponent = function () {
	return <Global styles={defaultStyle} />;
};

export default GlobalStyle;
