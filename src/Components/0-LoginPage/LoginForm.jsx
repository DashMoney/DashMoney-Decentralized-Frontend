//This will be the replacement for the connect wallet modal

import React from "react";

import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pastedText: "",
      searchedMnem: "",
      validated: true,
      validityCheck: false,
    };
  }
  onChange = (event) => {
    //console.log(event.target.value);
    if (this.formValidate(event.target.value) === true) {
      event.preventDefault();
      event.stopPropagation();
      this.setState({
        validityCheck: true,
      });
    } else {
      event.preventDefault();
      event.stopPropagation();
      this.setState({
        validityCheck: false,
      });
    }
  };
  handleSubmitClick = (event) => {
    event.preventDefault();
    //console.log(event.nativeEvent.submitter.id); //Found it - identifies the button pressed

    if (this.formValidate(event.target.validationCustom01.value)) {
      this.props.handleAccountLogin(event.target.validationCustom01.value);

      console.log("Successful login");
    } else {
      console.log(`Invalid Mnemonic: ${event.target.validationCustom01.value}`);
    }
  };

  formValidate = (mnemonic) => {
    let regex = /^([a-z]+[ ]){11}[a-z]+$/m;
    let valid = regex.test(mnemonic);

    if (valid) {
      this.setState({
        searchedMnem: mnemonic,
      });
      return true;
    } else {
      return false;
    }
  };

  render() {
    return (
      <>
        <div className="bodytext">
          <Form
            noValidate
            onSubmit={this.handleSubmitClick}
            onChange={this.onChange}
          >
            <Form.Group className="mb-3" controlId="validationCustom01">
              {/* <Form.Label>Account Login</Form.Label>  */}
              <h2>
                <b>Account Login</b>
                {/* <Badge bg="primary" pill>
                Account Login
              </Badge> */}
              </h2>
              <Form.Control
                type="text"
                placeholder="Enter 12 words here..."
                required
                //isInvalid={!this.state.validityCheck}
                isValid={this.state.validityCheck}
              />

              <div className="d-grid gap-2" style={{ marginTop: "2rem" }}>
                <Button variant="primary" type="submit" size="lg">
                  <b>Login</b>
                </Button>
              </div>

              <Form.Control.Feedback type="invalid">
                Please provide valid mnemonic.
              </Form.Control.Feedback>

              <Form.Control.Feedback type="valid">
                Mnemonic looks good, so long as everything is spelled correctly.
              </Form.Control.Feedback>

              <p></p>
              <ul>
                <li>
                  The 12 word phrase provided upon creation of your account.
                </li>
                <li>No spaces at the beginning or the end.</li>
                <li>Use lowercase for all words.</li>
                <li>Only one space between words.</li>
              </ul>
            </Form.Group>

            {/* <Button variant="primary" type="submit">
            <b>Login</b>
          </Button> */}
            {/* }  */}
          </Form>
          <div className="BottomBorder"></div>
          <p></p>
          <p className="bodytext">
            If you do not have an account, <b>Create New Account</b> below.
          </p>
          <p></p>
          <div className="d-grid gap-2">
            <Button
              variant="primary"
              size="lg"
              onClick={() => this.props.showModal("CreateNewWalletModal")}
            >
              <b>Create New Account</b>
            </Button>
          </div>
          {this.props.LocalForageKeys.length === 0 ? (
            <>
              <p></p>
              <p>
                <b>First-Time</b> logins may take up to a minute, but all
                subsequent will be much faster. Thank you for your patience.
              </p>
            </>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  }
}

export default LoginForm;
