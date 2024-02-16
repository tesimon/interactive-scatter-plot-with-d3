import { select } from "d3";
import { main } from "./src/main";
const container = select("#app").node();
let state = {};

const render = () => {
  main(container, {
    state,
    setState,
  });
};

const setState = (next) => {
  state = next(state);
  render();
};

render();

if (state.width === undefined) {
  setState((state) => ({
    ...state,
    width: innerWidth,
    height: innerHeight,
  }));
}

window.addEventListener("resize", (e) => {
  setState((state) => ({
    ...state,
    width: e.target.innerWidth,
    height: e.target.innerHeight,
  }));
});
