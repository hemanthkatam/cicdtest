import logo from "./logo.svg";
import "./App.css";
import { applyMiddleware, combineReducers, createStore } from "redux";
// import { useDispatch } from "react-redux";
import { useSelector, Provider, useDispatch } from "react-redux";
import thunk from "redux-thunk";

const mainState = {
  firstCount: 50,
  counterStatus: "",
};
const MainReduxcer = (state = mainState, { type, data }) => {
  switch (type) {
    case "INCREASE_FIRST":
      return {
        ...state,
        firstCount: state.firstCount + 1,
      };
    case "UPDATE_RESPONSE_STATUS_FIRST":
      return {
        ...state,
        counterStatus: data,
      };
  }
  return state;
};
const sndState = {
  secondCount: 50,
  sndCounterStatus: "",
};
const SecondaryReduxcer = (state = sndState, { type, data }) => {
  switch (type) {
    case "INCREASE_SECOND":
      return {
        ...state,
        secondCount: state.secondCount + 1,
      };
    case "UPDATE_RESPONSE_STATUS_SND":
      return {
        ...state,
        sndCounterStatus: data,
      };
  }
  return state;
};

const state = createStore(
  combineReducers({ first: MainReduxcer, second: SecondaryReduxcer }),
  applyMiddleware(thunk)
);

const fetachStatus = (data) => (dispatch) => {
  fetch("https://run.mocky.io/v3/4b7ff377-802f-47b3-b82c-a8acd3cc4719")
    .then((res) => res.json())
    .then((response) =>
      dispatch({ type: "UPDATE_RESPONSE_STATUS_FIRST", data: response.text })
    );
};
const fetachStatusSnd = (data) => (dispatch) => {
  fetch("https://run.mocky.io/v3/4b7ff377-802f-47b3-b82c-a8acd3cc4719")
    .then((res) => res.json())
    .then((response) =>
      dispatch({ type: "UPDATE_RESPONSE_STATUS_SND", data: response.text })
    );
};

const CounterDetail = () => {
  const {
    first: { firstCount, counterStatus },
    second: { sndCounterStatus, secondCount },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div>
      <div style={{ display: "flex" }}>
        <div
          style={{ backgroundColor: "red" }}
          onClick={() => dispatch({ type: "INCREASE_FIRST" })}
        >
          ADD First
        </div>
        <div>counter 1: {firstCount}</div>
        <div onClick={() => dispatch(fetachStatus())}>fetchResult</div>
        {counterStatus}
      </div>
      <div style={{ display: "flex" }}>
        <div
          style={{ backgroundColor: "red" }}
          onClick={() => dispatch({ type: "INCREASE_SECOND" })}
        >
          ADD
        </div>
        <div>counter 1: {secondCount}</div>
        <div onClick={() => dispatch(fetachStatusSnd())}>fetchResult</div>
        {sndCounterStatus}
      </div>
    </div>
  );
};

function App() {
  return (
    <Provider store={state}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          Learn React
          <CounterDetail />
        </header>
      </div>
    </Provider>
  );
}

export default App;
