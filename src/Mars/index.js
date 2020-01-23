import React from "react"
import classNames from "classnames"
import { XYPlot, ArcSeries, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, AreaSeries } from 'react-vis';
import { Parallax, Col, Row, Container, Range } from 'react-materialize';
import { SET_SOL, SET_IMAGE } from "../reducer"

const PI = Math.PI

const Mars = ({ insight, mars_rover, sol, image, dispatch }) => {
  const sol_data = (sol) => {
    let i
    let array = []

    if (sol !== "") {
      for (i = 0; i < insight.validity_checks[sol].WD.sol_hours_with_data.length; i++) {
        let wind_data = insight[sol].WD[i]

        if (wind_data) {
          array.push({
            color: i,
            radius: 0,
            radius0: wind_data.ct,
            angle: ( ( wind_data.compass_degrees / 180 ) * PI ) - .1,
            angle0: ( ( wind_data.compass_degrees / 180 ) * PI ) + .1
          })
        }
      }
    }

    return array
  }

  const classes = (s) => {return classNames("waves-effect", { "active red": s === sol })}

  const sols = insight.sol_keys.map(s => { return <li key={s} className={classes(s)}><a href="#!" onClick={() => dispatch({ type: SET_SOL, payload: s })}>{s}</a></li> })

  const atmos = insight.sol_keys.map(s => { return { y: insight[s].AT.av, x: parseInt(s)} })

  return (
    <div>
      <h1 className="center-align">Mars Rover Images and Insight Weather Data</h1>
      <Parallax
        image={<img alt="" src={ image ? image.img_src : undefined }/>}
        options={{
          responsiveThreshold: 2
        }}
        style={{height: "700px"}}
      />
      { image && <div className="center-align">Photo: {image.rover.name} - {image.camera.full_name}</div> }
      <Container>
        <Range
          name="sol"
          max={toString(mars_rover.length - 1)}
          min={"0"}
          onChange={(e) => dispatch({ type: SET_IMAGE, payload: mars_rover[e.target.value] })}
        />
        <ul className="pagination">
          {sols}
        </ul>
        <h2 className="header center-align">
          SOL: {sol}
        </h2>
        <p className="grey-text text-darken-3 lighten-3 center-align">
          On this day, the martian planet averaged a cool tempurature
          of {insight[sol] && parseInt(insight[sol].AT.av)}&#176;F
          with a high of {insight[sol] && parseInt(insight[sol].AT.mx)}&#176;F
          and low of {insight[sol] && parseInt(insight[sol].AT.mn)}&#176;F
        </p>
        <Row>
          <Col m={12}>
            <h4 className="center-align">Wind Direction Samples</h4>
            <div className="center-align">N</div>
            <XYPlot key={sol} xDomain={[-25000, 25000]} yDomain={[-25000, 25000]} width={400} height={400} className="wind">
              <ArcSeries
                animation
                radiusDomain={[0, 25000]}
                data={sol_data(sol)}
                color="red"
              />
            </XYPlot>
          </Col>
          <Col m={12}>
            <h4 className="center-align">Average Atmospheric Tempurature (&#176;F)</h4>
            <XYPlot width={300} height={300}>
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis />
              <YAxis />
              <AreaSeries
                className="area-series-example"
                curve="curveNatural"
                data={atmos}
                color="red"
              />
            </XYPlot>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Mars