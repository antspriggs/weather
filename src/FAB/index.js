import React from "react";
import { Icon, Button } from 'react-materialize';
import { SET_REDIRECT } from "../reducer";

const FAB = ( { dispatch }) => {

  return (
    <Button
      className="yellow darken-3 pulse"
      floating
      large
      icon={<Icon>wb_sunny</Icon>}
      fab={{
        direction: "top",
        hoverEnabled: true
        }}
      waves="light"
    >
      <Button
        className="red"
        floating
        tooltip="Mars"
        icon={<Icon>brightness_1</Icon>}
        node="button"
        waves="light"
        onClick={() => dispatch({ type: SET_REDIRECT, payload: "/" })}
      />
      <Button
        className="green"
        floating
        tooltip="Earth"
        icon={<Icon>public</Icon>}
        node="button"
        waves="light"
        onClick={() => dispatch({ type: SET_REDIRECT, payload: "earth" })}
      />
    </Button>
  );
}

export default FAB
