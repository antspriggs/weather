import React from "react"
import { Button, Row, Col, TextInput, Container, ProgressBar, Parallax, Card, CardTitle } from 'react-materialize';
import { SET_ZIP } from "../reducer"

const directions = ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"]

const Earth = ( { open_weather, dispatch } ) => {
  const submitHandler = (e) => {
    e.preventDefault()

    dispatch({ type: SET_ZIP, payload: e.target.location.value })
  }

  const degToCompass = (num) => {
    const val = parseInt((num/22.5)+.5)

    return directions[(val % 16)]
  }

  if (open_weather){
    const image = `http://openweathermap.org/img/wn/${open_weather.weather[0].icon}@2x.png`

    return (
      <div>
        <h1 className="center-align">Earth Location Weather Data</h1>
        <Parallax
          image={<img alt="Earth" src="https://images.pexels.com/photos/41953/earth-blue-planet-globe-planet-41953.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"/>}
          options={{
            responsiveThreshold: 0
          }}

          style={{height: "700px"}}
        />
        <Container>
        <form onSubmit={(e) => submitHandler(e)} method="POST">
          <TextInput name="location" label="Location" icon="location_searching"/>
          <Button
            node="button"
            type="submit"
            waves="light"
            className="right"
          >
            Search
          </Button>
        </form>

        <Row>
          <Col m={12}>
            <Card
              header={<CardTitle image={image} />}
              horizontal
              title={open_weather.name}
            >
              <p>Currently: {parseInt(open_weather.main.temp)}&#176;F and {open_weather.weather[0].main}</p>
              <p>Low: {parseInt(open_weather.main.temp_min)}&#176;F</p>
              <p>High: {parseInt(open_weather.main.temp_max)}&#176;F</p>
              <p>Humidity: {parseInt(open_weather.main.humidity)}&#176;F</p>
              <p>Wind Speed: {parseInt(open_weather.wind.speed)} mph</p>
              <p>Wind Direction: {degToCompass(open_weather.wind.deg)}</p>
            </Card>
          </Col>
        </Row>
      </Container>
      </div>
    )
  } else {
    return <ProgressBar />

  }
}

export default Earth
