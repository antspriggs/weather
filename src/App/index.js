import React, { useEffect, useReducer } from "react";
import { BrowserRouter as Switch, Redirect, Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import { FETCH_INSIGHT, FETCH_MARS_ROVER, FETCH_OPEN_WEATHER, SET_SOL, SET_ERROR, SET_IMAGE, SET_POSITION, CLEAR_REDIRECT, initialState, reducer } from "../reducer"
import FAB from "../FAB"
import Earth from "../Earth"
import Mars from "../Mars"
import "../styles.css"

const history = createBrowserHistory();

const App = () => {
  const [ state, dispatch ] = useReducer(reducer, initialState)
  const { insight, update, sol, mars_rover, endpoint, image, redirect, earth_endpoint, open_weather } = state

  window.location.pathname === redirect && dispatch({ type: CLEAR_REDIRECT })

  const fetchInsight = async () => {
    try {
      const response = await fetch("https://api.nasa.gov/insight_weather/?api_key=d8vGnKRNvf9gmKhgGq2WVNsE924KcC4rNcmr5xLj&feedtype=json&ver=1.0");
      const data = await response.json();

      dispatch({ type: FETCH_INSIGHT, payload: data });
      dispatch({ type: SET_SOL, payload: data.sol_keys[data.sol_keys.length - 1] });
    } catch (error) {
      dispatch({ type: SET_ERROR, payload: error });
    }
  }

  const fetchMarsRover = async () => {
    try {
      const response = await fetch(endpoint);
      const data = await response.json();

      dispatch({ type: FETCH_MARS_ROVER, payload: data.photos });
      dispatch({ type: SET_IMAGE, payload: data.photos[0] }); // Add random
    } catch (error) {
      dispatch({ type: SET_ERROR, payload: error });
    }
  }

  const fetchOpenWeather = async () => {
    try {
      const response = await fetch(earth_endpoint);
      const data = await response.json();

      dispatch({ type: FETCH_OPEN_WEATHER, payload: data });
    } catch (error) {
      dispatch({ type: SET_ERROR, payload: error });
    }
  }

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(dispatchPosition);
    }
  }

  const dispatchPosition = (position) => {
    dispatch({ type: SET_POSITION, payload: position.coords });
  }

  useEffect(() => {
    fetchInsight()
    getLocation()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);

  useEffect(() => {
    endpoint && fetchMarsRover()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  useEffect(() => {
    fetchOpenWeather()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [earth_endpoint]);

  return (
    <div>
      <FAB redirect={redirect} dispatch={dispatch}/>
      <Router history={history}>
        <Switch>
          { redirect && <Redirect to={redirect} /> }
          <Route exact path="/earth">
            <Earth open_weather={open_weather} dispatch={dispatch}/>
          </Route>
          <Route exact path="/">
            <Mars insight={insight} mars_rover={mars_rover} sol={sol} image={image} dispatch={dispatch}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App