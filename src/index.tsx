import * as React from "react";
import * as ReactDOM from "react-dom";

import * as Models from "./Models";
import Scorekeeper from "./components/Scorekeeper";

require("./stylesheets/style.scss");

let game = new Models.Game();

declare let window: any;
window.game = game;

ReactDOM.render(
    <Scorekeeper game={game} />,
    document.getElementById("sk-scores-container")
);