import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import CloseButton from "react-bootstrap/CloseButton";

//Post
/**
 * city: {
          type: 'string',
          minLength: 1,
          maxLength: 32,
        },

        region: {
          type: 'string',
          minLength: 1,
          maxLength: 32,
        },

        country: {
          type: 'string',
          minLength: 1,
          maxLength: 32,
        },
        description: { 
          type: 'string',
          minLength: 1,
          maxLength: 350,
        },
        category: { // offrent, offbiz, offother, lookrent, lookother
          type: 'string',
          minLength: 0,
          maxLength: 32,
        },

        link:{ //one url/http address
              type: 'string',
              minLength: 1,
              maxLength: 350,
        },


        // links:{ //array of url/http addresses
        //   type: 'array', 
        //   minItems: 1,
        //   maxItems: 10,
        //   items: { //This defines the url
        //       type: 'string',
        //       minLength: 1,
        //       maxLength: 350,
        //     },
        // },

        price: { //this will be priced in duffs but i will have Dash, mDash for display
          type: 'integer',
          minimum: 0,
          maximum: 10000000000000, // 100,000 Dash is max
           
        },

        // avail:{ //the post appears in the search but cannot click in
        //   type: 'boolean'
        // },

        active:{ //Post does not appear in search
          type: 'boolean'
        },

        dgp:{
          type:'boolean'
        }
 */

class CreatePostModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: "offrent",

      cityInput: "",
      validCity: false,
      tooLongCityError: false,

      regionInput: "",
      validRegion: false,
      tooLongRegionError: false,

      countryInput: "",
      validCountry: false,
      tooLongCountryError: false,

      // priceInput: 0,
      // validPrice: false,

      descriptionInput: "",
      validDescription: false,
      tooLongDescriptionError: false,

      linkInput: "",
      validLink: true,
      tooLongLinkError: false,

      postActive: true,
      //postAvail: true,
      postDGP: true,
    };
  }

  handleCloseClick = () => {
    this.props.hideModal();
  };

  handleCategoryButtons = (category) => {
    this.setState({
      selectedCategory: category,
    });
  };

  handleActive = () => {
    if (this.state.postActive) {
      this.setState({
        postActive: false,
      });
    } else {
      this.setState({
        postActive: true,
      });
    }
  };

  handleDGP = () => {
    if (this.state.postDGP) {
      this.setState({
        postDGP: false,
      });
    } else {
      this.setState({
        postDGP: true,
      });
    }
  };

  // handleAvail = () => {
  //   if (this.state.itemAvail) {
  //     this.setState({
  //       itemAvail: false,
  //     });
  //   } else {
  //     this.setState({
  //       itemAvail: true,
  //     });
  //   }
  // };

  // formValidate = (messageText) => {
  //   let regex = /^.[\S\s]{0,350}$/;

  //   let valid = regex.test(messageText);

  //   if (valid) {
  //     //Put tag error here
  //     this.setState({
  //       messageInput: messageText,
  //       tooLongError: false,
  //     });
  //     return true;
  //   } else {
  //     if (messageText.length > 300) {
  //       this.setState({
  //         tooLongError: true,
  //       });
  //     }
  //     return false;
  //   }
  // };

  onChange = (event) => {
    // console.log(event.target.value);

    //console.log(`id = ${event.target.id}`);

    if (event.target.id === "formCityName") {
      event.preventDefault();
      event.stopPropagation();
      this.cityValidate(event.target.value);
    }

    if (event.target.id === "formRegionName") {
      event.preventDefault();
      event.stopPropagation();
      this.regionValidate(event.target.value);
    }

    if (event.target.id === "formCountryName") {
      event.preventDefault();
      event.stopPropagation();
      this.countryValidate(event.target.value);
    }

    // if (event.target.id === "formItemPrice") {
    //   this.priceValidate(event.target.value);
    // }

    if (event.target.id === "custom-switch") {
      event.stopPropagation();
      this.handleActive();
    }

    if (event.target.id === "DGP-switch") {
      event.stopPropagation();
      this.handleDGP();
    }

    if (event.target.id === "formDescription") {
      event.preventDefault();
      event.stopPropagation();
      this.descriptionValidate(event.target.value);
    }

    if (event.target.id === "formLink") {
      event.preventDefault();
      event.stopPropagation();
      this.linkValidate(event.target.value);
    }
  };

  cityValidate = (city) => {
    let regex = /^\S.{1,30}\S$/;
    let valid = regex.test(city);

    if (valid) {
      this.setState({
        cityInput: city,
        tooLongCityError: false,
        validCity: true,
      });
    } else {
      if (city.length > 32) {
        this.setState({
          cityInput: city,
          tooLongCityError: true,
          validCity: false,
        });
      } else {
        this.setState({
          cityInput: city,
          validCity: false,
        });
      }
    }
  };

  regionValidate = (region) => {
    let regex = /^\S.{1,30}\S$/;
    let valid = regex.test(region);

    if (valid) {
      this.setState({
        regionInput: region,
        tooLongRegionError: false,
        validRegion: true,
      });
    } else {
      if (region.length > 32) {
        this.setState({
          regionInput: region,
          tooLongRegionError: true,
          validRegion: false,
        });
      } else {
        this.setState({
          regionInput: region,
          validRegion: false,
        });
      }
    }
  };

  countryValidate = (country) => {
    let regex = /^\S.{1,30}\S$/;
    let valid = regex.test(country);

    if (valid) {
      this.setState({
        countryInput: country,
        tooLongCountryError: false,
        validCountry: true,
      });
    } else {
      if (country.length > 32) {
        this.setState({
          countryInput: country,
          tooLongCountryError: true,
          validCountry: false,
        });
      } else {
        this.setState({
          countryInput: country,
          validCountry: false,
        });
      }
    }
  };

  //   priceValidate = (numberInput) => {
  //     //console.log(this.props.accountBalance);

  //     let regex = /(^[0-9]+[.,]{0,1}[0-9]{0,5}$)|(^[.,][0-9]{1,5}$)/;
  //     //CHANGED TO LIMIT TO minimum mDash possible
  //     //let regex = /(^[0-9]+[.,]{0,1}[0-9]*$)|(^[.,][0-9]+$)/;

  //     let valid = regex.test(numberInput);

  // //MAX SPENDABLE IS 10000 DASH
  //     if (valid && numberInput > 0 && numberInput <= 10000) {
  //       this.setState({
  //         priceInput: numberInput,
  //         validPrice: true,
  //       });
  //     } else {
  //       this.setState({
  //         priceInput: numberInput,
  //         validPrice: false,
  //       });
  //     }
  //   };

  descriptionValidate = (description) => {
    let regex = /^.[\S\s]{0,350}$/;

    let valid = regex.test(description);

    if (valid) {
      this.setState({
        descriptionInput: description,
        validDescription: true,
        tooLongDescriptionError: false,
      });
    } else {
      if (description.length > 350) {
        this.setState({
          descriptionInput: description,
          validDescription: false,
          tooLongDescriptionError: true,
        });
      } else {
        this.setState({
          descriptionInput: description,
          validDescription: false,
        });
      }
    }
  };

  linkValidate = (link) => {
    let regex = /^[\S\s]{0,350}$/;

    let valid = regex.test(link);

    if (valid) {
      this.setState({
        linkInput: link,
        validLink: true,
        tooLongLinkError: false,
      });
    } else {
      if (link.length > 350) {
        this.setState({
          linkInput: link,
          validLink: false,
          tooLongLinkError: true,
        });
      } else {
        this.setState({
          linkInput: link,
          validLink: false,
        });
      }
    }
  };

  handleSubmitClick = (event) => {
    event.preventDefault();
    //console.log(event.target.ControlTextarea1.value);

    //CHANGE TO NEWPOST AND SET THE LOWERCASE HERE!

    let newPost = {
      city: this.state.cityInput.toLocaleLowerCase(),
      region: this.state.regionInput.toLocaleLowerCase(),
      country: this.state.countryInput.toLocaleLowerCase(),

      //price:  Number((this.state.priceInput * 100000000).toFixed(0)),

      description: this.state.descriptionInput,
      category: this.state.selectedCategory,
      link: this.state.linkInput,

      //avail: this.state.postAvail,
      active: this.state.postActive,
      dgp: this.state.postDGP,
    };

    this.props.createYourPost(newPost);
    this.props.hideModal();
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
          show={this.props.isModalShowing}
          backdropClassName={modalBackdrop}
          contentClassName={modalBkg}
        >
          <Modal.Header style={{ paddingBottom: ".2rem" }}>
            <Modal.Title>
              <h3>
                <b>Create a Post</b>
              </h3>
            </Modal.Title>
            {closeButtonColor}
          </Modal.Header>

          {/* <div className="BottomBorder" style={{ paddingTop: ".5rem" }}></div> */}

          <Modal.Body>
            <h4 style={{ marginBottom: ".1rem" }}>
              <b>You are Offering:</b>
            </h4>

            {this.state.selectedCategory === "offrent" ? (
              <Button
                variant="primary"
                style={{
                  textDecoration: "underline",
                  marginRight: ".5rem",
                  marginBottom: ".2rem",
                }}
              >
                <b>Place to Rent</b>
              </Button>
            ) : (
              <Button
                variant="primary"
                style={{ marginRight: ".5rem", marginBottom: ".2rem" }}
                onClick={() => this.handleCategoryButtons("offrent")}
              >
                <b>Place to Rent</b>
              </Button>
            )}

            {this.state.selectedCategory === "offbiz" ? (
              <Button
                variant="primary"
                style={{ textDecoration: "underline", marginRight: ".5rem" }}
              >
                <b>Business/DGP</b>
              </Button>
            ) : (
              <Button
                variant="primary"
                style={{ marginRight: ".5rem" }}
                onClick={() => this.handleCategoryButtons("offbiz")}
              >
                <b>Business/DGP</b>
              </Button>
            )}

            {this.state.selectedCategory === "offother" ? (
              <Button variant="primary" style={{ textDecoration: "underline" }}>
                <b>Other</b>
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={() => this.handleCategoryButtons("offother")}
              >
                <b>Other</b>
              </Button>
            )}

            <h4 style={{ marginTop: ".2rem", marginBottom: ".1rem" }}>
              <b>You are Looking For:</b>
            </h4>

            {this.state.selectedCategory === "lookrent" ? (
              <Button
                variant="primary"
                style={{ textDecoration: "underline", marginRight: ".5rem" }}
              >
                <b>Place to Rent</b>
              </Button>
            ) : (
              <Button
                variant="primary"
                style={{ marginRight: ".5rem" }}
                onClick={() => this.handleCategoryButtons("lookrent")}
              >
                <b>Place to Rent</b>
              </Button>
            )}

            {this.state.selectedCategory === "lookother" ? (
              <Button
                variant="primary"
                style={{ textDecoration: "underline", marginRight: ".5rem" }}
              >
                <b>Other</b>
              </Button>
            ) : (
              <Button
                variant="primary"
                style={{ marginRight: ".5rem" }}
                onClick={() => this.handleCategoryButtons("lookother")}
              >
                <b>Other</b>
              </Button>
            )}
            <div className="BottomBorder" style={{ paddingTop: ".5rem" }}></div>
            <Form
              noValidate
              onSubmit={this.handleSubmitClick}
              onChange={this.onChange}
            >
              {/* CITY FORM BELOW */}
              <Form.Group className="mb-3" controlId="formCityName">
                <h5 style={{ marginTop: ".2rem", marginBottom: ".2rem" }}>
                  City/Town
                </h5>
                <Form.Control
                  type="text"
                  placeholder="Enter city/town"
                  required
                  isInvalid={this.state.tooLongCityError}
                  isValid={this.state.validCity}
                />
                <p></p>
                <Form.Control.Feedback type="invalid">
                  City/Town name is too long.
                </Form.Control.Feedback>
                {/* <Form.Control.Feedback type="valid">
              City/Town name is acceptable!
            </Form.Control.Feedback> */}
              </Form.Group>

              {/* REGION FORM BELOW */}
              <Form.Group className="mb-3" controlId="formRegionName">
                <h5 style={{ marginTop: ".2rem", marginBottom: ".2rem" }}>
                  Region
                </h5>
                <Form.Control
                  type="text"
                  placeholder="Enter state/province"
                  required
                  isInvalid={this.state.tooLongRegionError}
                  isValid={this.state.validRegion}
                />
                <p></p>
                <Form.Control.Feedback type="invalid">
                  State/Province name is too long.
                </Form.Control.Feedback>
                {/* <Form.Control.Feedback type="valid">
              State/Province name is acceptable!
            </Form.Control.Feedback> */}
              </Form.Group>

              {/* COUNTRY FORM BELOW */}
              <Form.Group className="mb-3" controlId="formCountryName">
                <h5 style={{ marginTop: ".2rem", marginBottom: ".2rem" }}>
                  Country
                </h5>
                <Form.Control
                  type="text"
                  placeholder="Enter country"
                  required
                  isInvalid={this.state.tooLongCountryError}
                  isValid={this.state.validCountry}
                />
                <p></p>
                <Form.Control.Feedback type="invalid">
                  Country name is too long.
                </Form.Control.Feedback>
                {/* <Form.Control.Feedback type="valid">
              Country name is acceptable!
            </Form.Control.Feedback> */}
              </Form.Group>

              {/*  PRICE FORM BELOW */}

              {/* <Form.Group className="mb-3" controlId="formItemPrice">
                <Form.Label>Item Price (in Dash)</Form.Label>

                 //<Form.Control
                   //   type="number"
                    //  placeholder={this.state.amountToSend}
                    //  readOnly
                  //  /> 

                <Form.Control
                  type="number"
                  placeholder="0.01 For example.."
                  required
                  isValid={this.state.validPrice}
                  isInvalid={!this.state.validPrice}
                />
              </Form.Group> */}

              {/* POST DESCRIPTION FORM BELOW */}

              <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>
                  <h5 style={{ marginTop: ".5rem", marginBottom: ".2rem" }}>
                    Description
                  </h5>
                </Form.Label>

                <Form.Control
                  onChange={this.onChange}
                  as="textarea"
                  rows={2}
                  placeholder="Put description here.."
                  required
                  isInvalid={this.state.tooLongDescriptionError}
                  isValid={this.state.validDescription}
                />

                {this.state.tooLongDescriptionError ? (
                  <Form.Control.Feedback className="floatLeft" type="invalid">
                    Sorry, this is too long! Please use less than 300
                    characters.
                  </Form.Control.Feedback>
                ) : (
                  <></>
                )}
              </Form.Group>

              {/* LINKS FORM BELOW */}

              <Form.Group className="mb-3" controlId="formLink">
                <h5 style={{ marginTop: ".5rem", marginBottom: ".2rem" }}>
                  Link
                </h5>

                <Form.Control
                  type="text"
                  placeholder="Enter a URL"
                  required
                  isInvalid={this.state.tooLongLinkError}
                  isValid={this.state.validLink}
                />
                <p></p>
                <Form.Control.Feedback type="invalid">
                  Link is too long.
                </Form.Control.Feedback>
                {/* <Form.Control.Feedback type="valid">
              Link is acceptable!
            </Form.Control.Feedback> */}
              </Form.Group>

              <Form.Group className="mb-3" id="formGridCheckbox">
                {/* <Form.Label>
                  <b>Is Post Active?</b>
                </Form.Label> */}
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label={
                    this.state.postActive ? <b>Active</b> : <b>Inactive</b>
                  }
                  //onChange={() => this.handleActive()}
                />

                <p>
                  <b>Active</b> means people can view the post when searching.
                </p>
              </Form.Group>

              {this.state.selectedCategory === "offbiz" ? (
                <Form.Group className="mb-3" id="formDGPCheckbox">
                  {/* <Form.Label>
                  <b>Is Post Active?</b>
                </Form.Label> */}
                  <Form.Check
                    type="switch"
                    id="DGP-switch"
                    label={
                      this.state.postDGP ? (
                        <b>DashGetPaid Store/Menu</b>
                      ) : (
                        <b>No DashGetPaid Store/Menu</b>
                      )
                    }
                    //onChange={() => this.handleActive()}
                  />

                  <p>
                    <b>DashGetPaid</b> means you have store/menu available for
                    viewing.
                  </p>
                </Form.Group>
              ) : (
                <></>
              )}

              <div className="ButtonRightNoUnderline">
                {this.state.validCity &&
                this.state.validRegion &&
                this.state.validCountry &&
                this.state.validDescription &&
                this.state.validLink ? (
                  <Button variant="primary" type="submit">
                    Create Post
                  </Button>
                ) : (
                  <Button variant="primary" disabled>
                    Create Post
                  </Button>
                )}
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default CreatePostModal;
