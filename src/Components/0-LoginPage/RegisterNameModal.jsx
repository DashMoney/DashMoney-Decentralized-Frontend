import React from "react";
import LocalForage from "localforage";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import CloseButton from "react-bootstrap/CloseButton";

import Dash from "dash";

class RegisterNameModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isError: false,
      nameTaken: false,
      nameAvailable: false,
      searchedName: "",
      validated: true,
      validityCheck: false,
    };
  }

  handleCloseClick = () => {
    this.props.hideModal();
  };

  onChange = (event) => {
    this.setState({
      isError: false,
      isLoading: false,
      nameTaken: false,
      nameAvailable: false,
    });
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

  purchaseName = (theName) => {
    const nameToRegister = theName; // Enter name to register

    const clientOpts = {
      network: this.props.whichNetwork,
      wallet: {
        mnemonic: this.props.mnemonic, // A Dash wallet mnemonic with testnet funds
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.props.skipSynchronizationBeforeHeight, // only sync from early-2022
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const registerName = async () => {
      const { platform } = client;

      // const identity = await platform.identities.get(this.props.identity); // Your identity ID

      const identity = this.props.identityRaw;

      const nameRegistration = await platform.names.register(
        `${nameToRegister}.dash`,
        { dashUniqueIdentityId: identity.getId() },
        identity
      );

      return nameRegistration;
    };

    registerName()
      .then((d) => {
        console.log("Name registered:\n", d.toJSON());
        this.props.handleName(d.toJSON().label);
        this.props.hideModal();
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          isError: true,
          isLoading: false,
        });
      })
      //Add an error state and end isLoading****
      .finally(() => client.disconnect());
  };

  handleSubmitClick = (event) => {
    event.preventDefault();
    let nameToTry = event.target.validationCustom02.value;
    this.props.triggerNameLoading(); //trigger for connected page spinner
    this.setState({
      isLoading: true,
      searchName: event.target.value,
      isError: false,
    });

    if (this.formValidate(nameToTry)) {
      console.log(`A good one: ${nameToTry}`);
      ///this is where call function to Purchase the Name ****************************************************************
      this.purchaseName(nameToTry);
    } else {
      console.log(`Not a good one: ${nameToTry}`);
    }
  };

  formValidate = (nameInput) => {
    let regex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]$/;
    let valid = regex.test(nameInput);

    if (valid) {
      this.setState({
        searchedName: nameInput,
      });
      return true;
    } else {
      return false;
    }
  };

  render() {
    let modalBkg = "";
    let closeButtonColor;
    let modalBackdrop;

    if (this.props.mode === "primary") {
      modalBackdrop = "modal-backdrop-nochange";
      modalBkg = "modal-backcolor-primary";
      closeButtonColor = <CloseButton onClick={this.handleCloseClick} />;
    } else {
      modalBackdrop = "modal-backdrop-dark";
      modalBkg = "text-bg-dark";
      closeButtonColor = (
        <CloseButton onClick={this.handleCloseClick} variant="white" />
      );
    }

    return (
      <>
        <Modal
          contentClassName={modalBkg}
          backdropClassName={modalBackdrop}
          show={this.props.isModalShowing}
        >
          <Modal.Header>
            <Modal.Title>Purchase Your Dash Name!</Modal.Title>
            {closeButtonColor}
          </Modal.Header>
          <Modal.Body>
            <Form
              noValidate
              onSubmit={this.handleSubmitClick}
              onChange={this.onChange}
            >
              <Form.Group className="mb-3" controlId="validationCustom02">
                {this.state.isLoading ? (
                  <Form.Control
                    type="text"
                    placeholder={this.state.searchedName}
                    disabled
                  />
                ) : (
                  <Form.Control
                    type="text"
                    placeholder="Enter desired name here..."
                    required
                    isInvalid={!this.state.validityCheck}
                  />
                )}

                <Form.Control.Feedback className="floatLeft" type="invalid">
                  Please use proper naming format
                </Form.Control.Feedback>

                {this.state.isError ? (
                  <Alert variant="warning">
                    Testnet Platform is having difficulties... or the identity
                    has insufficient credits or the name is already taken...
                  </Alert>
                ) : (
                  <></>
                )}

                {this.state.isLoading ? (
                  <>
                    <p></p>
                    <div id="spinner">
                      <p></p>
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </div>
                  </>
                ) : (
                  <></>
                )}

                {this.state.validityCheck && !this.state.isLoading ? (
                  <>
                    <p> </p>
                    <Button variant="primary" type="submit">
                      Purchase Name
                    </Button>
                  </>
                ) : (
                  <Button disabled variant="primary" type="submit">
                    Purchase Name
                  </Button>
                )}

                <p></p>

                <ul>
                  <li>
                    A name can consist of any combination of letters (UPPERCASE
                    or lowercase) and numbers with one hyphen (-) anywhere in
                    the middle.
                  </li>
                  <li>No spaces are allowed.</li>
                  <li>Length must be between 3 to 63 characters</li>
                  <li>
                    Examples
                    <ul>
                      <li>john</li>
                      <li>JohnDoe</li>
                      <li>John-Doe</li>
                      <li>JohnDoe001</li>
                      <li>THEJOHNDOE001</li>
                      <li>JOHN-DOE</li>
                    </ul>
                  </li>
                </ul>
                <p>
                  Interesting fact: If you own the name "JohnDoe", no one can
                  purchase any combination of UPPERCASE or lowercase characters
                  that match. Therefore, johndoe, JOHNDOE, johnDoe, etc.. would
                  all be unavailable.
                </p>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleCloseClick}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default RegisterNameModal;
