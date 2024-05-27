import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class LocationForm extends React.Component {
  // handleRegionButton = () => {
  //   this.props.triggerRegionButton();
  // };

  onChange = (event) => {
    // console.log(event.target.value);

    event.preventDefault();
    event.stopPropagation();

    //console.log(`id = ${event.target.id}`);

    this.props.handleOnChangeValidation(event);
  };

  //DISCONNECTED BELOW
  handleSubmitClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    //console.log(event.target.ControlTextarea1.value);

    this.props.submittedDriversTHENConstruct();
  };

  render() {
    /**
      cityInput: "",
      validCity: false,
      tooLongCityNameError: false,

      regionInput: "",
      validRegion: false,
      tooLongRegionNameError: false,
     */

    return (
      <>
        <Form
          noValidate
          onSubmit={this.handleSubmitClick}
          onChange={this.onChange}
        >
          {/* CITY INPUT BELOW */}

          <Form.Group className="mb-3" controlId="formCityNameDriver">
            <h4 style={{ marginTop: ".5rem", marginBottom: ".2rem" }}>
              City/Town
            </h4>
            <Form.Control
              type="text"
              placeholder="Enter city/town (Optional)"
              required
              isInvalid={this.props.tooLongCityNameError}
              isValid={this.props.validCity}
            />
            <p></p>
            <Form.Control.Feedback type="invalid">
              City/Town name is too long.
            </Form.Control.Feedback>
            {/* <Form.Control.Feedback type="valid">
              City/Town name is acceptable!
            </Form.Control.Feedback> */}
          </Form.Group>

          {/* REGION INPUT BELOW */}
          <Form.Group className="mb-3" controlId="formRegionNameDriver">
            <>
              <h4 style={{ marginTop: ".5rem", marginBottom: ".2rem" }}>
                Region
              </h4>
              <Form.Control
                type="text"
                placeholder="Enter state/province (Optional)"
                required
                isInvalid={this.props.tooLongRegionNameError}
                isValid={this.props.validRegion}
              />
              <p></p>
              <Form.Control.Feedback type="invalid">
                State/Province name is too long.
              </Form.Control.Feedback>
              {/* <Form.Control.Feedback type="valid">
              State/Province name is acceptable!
            </Form.Control.Feedback> */}
            </>
          </Form.Group>

          {/* 2 separate things is valid? and is Loading? ->  */}

          <div className="ButtonRightNoUnderline">
            {this.props.validCity &&
            this.props.validRegion &&
            !this.props.isLoadingDriversForm ? (
              <Button variant="primary" type="submit">
                <b>Start Search</b>
              </Button>
            ) : (
              <></>
            )}

            {(!this.props.validCity || !this.props.validRegion) &&
            !this.props.isLoadingDriversForm ? (
              <Button variant="primary" disabled>
                <b>Search</b>
              </Button>
            ) : (
              <></>
            )}

            {this.props.isLoadingDriversForm ? (
              <Button variant="primary">
                <b>Loading..</b>
              </Button>
            ) : (
              <></>
            )}
          </div>
        </Form>
      </>
    );
  }
}

export default LocationForm;
