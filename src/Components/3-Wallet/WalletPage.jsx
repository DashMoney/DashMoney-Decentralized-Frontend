import React from "react";
import LocalForage from "localforage";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import Nav from "react-bootstrap/Nav";

import PaymentsTab from "./PaymentsTab";
import PaymentAddrComponent from "./PaymentAddrComponent";

import ConfirmPaymentModal from "./ConfirmPaymentModal";

import CreditsOnPage from "../CreditsOnPage";

import "./ConnectedWalletPage.css";

import Dash from "dash";

class WalletPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalShowing: false,
      presentModal: "",

      nameFormat: false,
      numberQuantity: false,
      amountToSend: "", //changed from 0 for placeholder to appear
      sendToName: "",

      sendToAddr: "",
      addrFormat: false,

      messageToAdd: "",
      validMessage: true,
      tooLongMessageError: false,

      displayAddress: false,
      copiedAddress: false,

      identityIdReceipient: "",
      dgmDocumentsForReceipient: [],
      formEventTarget: "",
      isLoadingVerify: false,
      isError: false,
    };
  }

  hideModal = () => {
    this.setState({
      isModalShowing: false,
    });
  };

  showModal = (modalName) => {
    this.setState({
      presentModal: modalName,
      isModalShowing: true,
    });
  };

  handleDisplayAddress = () => {
    if (this.state.displayAddress === false)
      this.setState({
        displayAddress: true,
      });
    else {
      this.setState({
        displayAddress: false,
      });
    }
  };

  handleClearModalPostPmtConfirm = () => {
    this.setState({
      nameFormat: false,
      numberQuantity: false,
      amountToSend: "", //changed from 0 for placeholder to appear
      sendToName: "",

      sendToAddr: "",
      addrFormat: false,

      messageToAdd: "",
      validMessage: true,
    });
  };

  onChange = (event) => {
    // console.log(event.target.value);

    event.preventDefault();
    event.stopPropagation();

    this.setState({
      nameAvail: false,
      isLoadingVerify: false,
      identityIdReceipient: "", //Test if this clears the error msg after failed send ->
      dgmDocumentsForReceipient: [],
      isError: false,
    });

    //console.log(`id = ${event.target.id}`);

    if (event.target.id === "validationCustomName") {
      this.nameAndAddrValidate(event.target.value);
    }

    if (event.target.id === "validationCustomNumber") {
      this.numberValidate(event.target.value);
    }

    if (event.target.id === "validationCustomMessage") {
      this.messageValidate(event.target.value);
    }
  };

  nameAndAddrValidate = (nameInput) => {
    let regex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]$/;
    let valid = regex.test(nameInput);

    //Separate name and address
    //starts with X (mainnet) or Y (Testnet) and is 34 characters in length

    let addrRegex = /^[Xy][\S]{33}$/;
    let validAddr = addrRegex.test(nameInput);

    if (valid) {
      if (validAddr) {
        this.setState({
          sendToAddr: nameInput,
          addrFormat: true,
          nameFormat: false,
        });
      } else {
        this.setState({
          sendToName: nameInput,
          nameFormat: true,
          addrFormat: false,
        });
      }
    } else {
      this.setState({
        sendToName: nameInput,
        nameFormat: false,
      });
    }
  };

  numberValidate = (numberInput) => {
    //console.log(this.props.accountBalance);

    //let regex = /(^[0-9]+[.,]{0,1}[0-9]*$)|(^[.,][0-9]+$)/;

    let regex = /(^[0-9]+[.,]{0,1}[0-9]{0,5}$)|(^[.,][0-9]{1,5}$)/;
    //CHANGED TO LIMIT TO minimum mDash possible

    let valid = regex.test(numberInput);

    let result = this.props.accountBalance - numberInput * 100000000;
    //console.log(result);

    if (result >= 0 && valid && numberInput > 0) {
      this.setState({
        amountToSend: numberInput,
        numberQuantity: true,
      });
    } else {
      this.setState({
        amountToSend: numberInput,
        numberQuantity: false,
      });
    }
  };

  messageValidate = (messageInput) => {
    let regex = /^.[\S\s]{0,250}$/;

    let valid = regex.test(messageInput);

    if (valid) {
      this.setState({
        messageToAdd: messageInput,
        validMessage: true,
        tooLongMessageError: false,
      });
    } else {
      if (messageInput.length > 250) {
        this.setState({
          messageToAdd: messageInput,
          validMessage: false,
          tooLongMessageError: true,
        });
      } else {
        this.setState({
          messageToAdd: messageInput,
          validMessage: false,
        });
      }
    }
  };

  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&777

  searchName = (nameToRetrieve) => {
    const client = new Dash.Client(this.props.whichNetwork);

    const retrieveName = async () => {
      // Retrieve by full name (e.g., myname.dash)

      return client.platform.names.resolve(`${nameToRetrieve}.dash`);
    };

    retrieveName()
      .then((d) => {
        if (d === null) {
          console.log("No DPNS Document for this Name.");
          this.setState({
            identityIdReceipient: "No Name",
            isLoadingVerify: false,
          });
        } else {
          let nameDoc = d.toJSON();
          console.log("Name retrieved:\n", nameDoc.$ownerId);
          this.setState(
            {
              identityIdReceipient: nameDoc.$ownerId,
            },
            () => this.queryDGMDocument()
          );
        }
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          identityIdReceipient: "Error",
          isLoadingVerify: false,
        });
      })
      .finally(() => client.disconnect());
  };

  queryDGMDocument = () => {
    const clientOpts = {
      network: this.props.whichNetwork,
      wallet: {
        mnemonic: this.props.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.props.skipSynchronizationBeforeHeight,
        },
      },
      apps: {
        DGMContract: {
          contractId: this.props.DataContractDGM,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const getDocuments = async () => {
      console.log("Querying Receipient's DGM Documents.");
      console.log(this.state.identityIdReceipient);

      return client.platform.documents.get("DGMContract.dgmaddress", {
        where: [["$ownerId", "==", this.state.identityIdReceipient]],
      });
    };

    getDocuments()
      .then((d) => {
        let docArray = [];
        for (const n of d) {
          console.log("Document:\n", n.toJSON());
          docArray = [...docArray, n.toJSON()];
        }

        if (docArray.length === 0) {
          this.setState({
            dgmDocumentsForReceipient: "No DGM Doc for Receipient.",
            isLoadingVerify: false,
          });
        } else {
          this.props.showConfirmModal(
            this.state.sendToName,
            this.state.amountToSend,
            docArray[0],
            this.state.messageToAdd
          );

          this.setState({
            dgmDocumentsForReceipient: docArray,
            isLoadingVerify: false,

            //Setting state to original so that form clears post pmt

            //Issue is if they cancel the payment modal it freezes the form <-
            //SO WHAT TO DO -> WHAT IF THAT MODAL WAS HERE -< AND NOT IN APPJS SO THEN CAN HANDLE HERE AND FUNCTIONS STILL OPERATE IN APP.JS AS NEEDED?i CAN PASS FROM aPP.JS TO CWP.JS TO MODAL? <- YES

            // nameFormat: false,
            // numberQuantity: false,
            // amountToSend: "", //changed from 0 for placeholder to appear
            // sendToName: "",

            // sendToAddr: "",
            // addrFormat: false,

            // messageToAdd: "",
            // validMessage: true,
          });
        }
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          dgmDocuments: "Document Error",
          isLoadingVerify: false,
        });
      })
      .finally(() => client.disconnect());
  };

  handleVerifyClick = (event) => {
    event.preventDefault();

    this.setState({
      dgmDocumentsForReceipient: [],
      identityIdReceipient: "Verifying Name..",
      isLoadingVerify: true,
      formEventTarget: event.target,
    });

    if (this.state.nameFormat) {
      this.searchName(this.state.sendToName);
    } else if (this.state.addrFormat) {
      this.props.showAddrConfirmModal(
        //Create this function and modal ->
        this.state.sendToAddr,
        this.state.amountToSend
        // this.state.sendToName,
        // this.state.amountToSend,
        // this.state.dgmDocumentsForReceipient[0].address,
        // this.state.messageToAdd
      );
      this.setState({
        //No loading of name or DGM doc with Addr Payment
        isLoadingVerify: false,
      });
    }
  };

  handleDenomDisplay = (duffs) => {
    if (duffs >= 1000000) {
      return (
        <span style={{ color: "#008de4" }}>
          {(duffs / 100000000).toFixed(3)} Dash
        </span>
      );
    } else {
      return (
        <span style={{ color: "#008de4" }}>
          {(duffs / 100000).toFixed(2)} mDash
        </span>
      );
    }
  };

  handleDenomDisplayNoStyle = (duffs) => {
    if (duffs >= 1000000) {
      return <span>{(duffs / 100000000).toFixed(3)} Dash</span>;
    } else {
      return <span>{(duffs / 100000).toFixed(2)} mDash</span>;
    }
  };

  //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

  render() {
    return (
      <>
        <Nav
          fill
          variant="pills"
          defaultActiveKey={this.props.WALLET_whichTab}
          onSelect={(eventKey) => this.props.handleTab_WALLET(eventKey)}
        >
          <Nav.Item>
            <Nav.Link eventKey="Your Wallet">
              <b>Your Wallet</b>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="Payments">
              <b>Payments</b>
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <div id="sidetext">
          {/* <h3>
            <Badge bg="primary">Your Connected Wallet</Badge>
          </h3> */}

          {/* ********** LOADING SPINNERS ********** */}

          {/* SO I NEED TO HAVE DIFFERENT WALLET STUFF FOR YOUR WALLET VS PAYMENTS -> SO WILL HAVE TO MOVE AND DUPLICATE/SEPARATE THE BELOW WALLET STUFF */}

          {this.props.isLoadingWallet ? (
            <>
              {/* <p> </p>
              <div id="spinner">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
              <p> </p> */}
              <div className="paddingBadge">
                <b>Wallet Balance</b>

                <h4>Loading..</h4>
              </div>
            </>
          ) : (
            <>
              <div className="paddingBadge">
                <div className="cardTitle">
                  <div>
                    <b>Wallet Balance</b>
                    <h4>
                      <b>
                        {this.handleDenomDisplay(this.props.accountBalance)}
                      </b>
                    </h4>
                  </div>

                  {this.props.WALLET_whichTab === "Payments" ? (
                    <Button
                      style={{ marginRight: "1rem" }}
                      variant="primary"
                      // onClick={() => this.props.showModal("WalletTXModal")}
                    >
                      <b>Wallet TXs</b>
                    </Button>
                  ) : (
                    <></>
                  )}

                  {this.props.WALLET_whichTab === "Your Wallet" ? (
                    <Button
                      style={{ marginRight: "1rem" }}
                      variant="primary"
                      onClick={() => this.props.handleRefresh_WALLET()}
                    >
                      <b>Refresh</b>
                    </Button>
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              {/* <div className="indentStuff">
                <b>Wallet Balance</b>
                <h4>
                  <b>{this.handleDenomDisplay(this.props.accountBalance)}</b>
                </h4>
              </div>
              <p></p> */}
            </>
          )}

          {/* **** ^^^^ LOADING SPINNERS ^^^^ **** */}

          {/* ********** FORMS AND INFO ********** */}

          {this.props.identity !== "No Identity" &&
          this.props.uniqueName !== "Er" &&
          this.props.dgmDocuments !== "Document Error" &&
          this.props.identityInfo !== "Load Failure" &&
          this.props.accountBalance !== 0 ? (
            <>
              <CreditsOnPage
                identityInfo={this.props.identityInfo}
                uniqueName={this.props.uniqueName}
                showModal={this.props.showModal}
              />

              {this.props.isLoadingRefresh_WALLET ? (
                <div id="spinner">
                  <p></p>
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  <p></p>
                </div>
              ) : (
                <></>
              )}

              {this.props.dgmDocuments.length === 0 &&
              this.props.WALLET_Login7 ? (
                <Alert variant="primary" dismissible>
                  <Alert.Heading>Pay to Name NOT Enabled!</Alert.Heading>
                  Please <b>Enable Pay to Name</b> below to receive payments to
                  your name.
                </Alert>
              ) : (
                <></>
              )}

              {this.props.WALLET_whichTab === "Payments" ? (
                <>
                  {this.props.WALLET_sendSuccess ? (
                    <>
                      <p></p>
                      <Alert
                        variant="success"
                        onClose={() => this.props.handleSuccessAlert_WALLET()}
                        dismissible
                      >
                        <Alert.Heading>Payment Successful!</Alert.Heading>
                        You have successfully sent{" "}
                        <b>
                          {this.handleDenomDisplayNoStyle(
                            this.props.WALLET_amountToSend
                          )}
                        </b>{" "}
                        to{" "}
                        <b>
                          {this.props.WALLET_sendToName !== ""
                            ? this.props.WALLET_sendToName
                            : this.props.WALLET_sendToAddress}
                          !
                        </b>
                      </Alert>
                    </>
                  ) : (
                    <></>
                  )}

                  {this.props.WALLET_sendFailure ? (
                    <>
                      <p></p>
                      <Alert
                        variant="danger"
                        onClose={() => this.props.handleFailureAlert_WALLET()}
                        dismissible
                      >
                        <Alert.Heading>Payment Failed</Alert.Heading>
                        <p>
                          You have run into a platform error or a repeated
                          transaction error. If everything seems correct, please
                          retry <b>Verify Payment</b> to try again.
                        </p>
                      </Alert>
                    </>
                  ) : (
                    <></>
                  )}

                  {this.props.isLoadingMsgs_WALLET ? (
                    <div id="spinner">
                      <p></p>
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </div>
                  ) : (
                    <>
                      <PaymentsTab
                        mode={this.props.mode}
                        identity={this.props.identity}
                        uniqueName={this.props.uniqueName}
                        hideModal={this.hideModal}
                        isModalShowing={this.state.isModalShowing}
                        presentModal={this.state.presentModal}
                        accountHistory={this.props.accountHistory}
                        accountBalance={this.props.accountBalance}
                        handleThread={this.props.handleThread_WALLET}
                        ByYouMsgs={this.props.WALLET_ByYouMsgs}
                        ByYouNames={this.props.WALLET_ByYouNames}
                        ByYouThreads={this.props.WALLET_ByYouThreads}
                        ToYouMsgs={this.props.WALLET_ToYouMsgs}
                        ToYouNames={this.props.WALLET_ToYouNames}
                        ToYouThreads={this.props.WALLET_ToYouThreads}

                        //isLoadingMsgs_WALLET={this.props.isLoadingMsgs_WALLET}
                      />
                    </>
                  )}
                </>
              ) : (
                <></>
              )}

              {this.props.WALLET_whichTab === "Your Wallet" ? (
                <>
                  {/* Below is the Pay to a Name Stuff */}
                  {/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/}
                  <Form
                    id="Pay-to-Name-form"
                    noValidate
                    onSubmit={this.handleVerifyClick}
                    onChange={this.onChange}
                  >
                    <Form.Group
                      className="mb-3"
                      controlId="validationCustomName"
                    >
                      {!this.state.addrFormat && !this.state.nameFormat ? (
                        <Form.Label>Send Dash to:</Form.Label>
                      ) : (
                        <></>
                      )}
                      {!this.state.addrFormat && this.state.nameFormat ? (
                        <Form.Label>Send Dash to Name:</Form.Label>
                      ) : (
                        <></>
                      )}
                      {this.state.addrFormat && !this.state.nameFormat ? (
                        <Form.Label>Send Dash to Address:</Form.Label>
                      ) : (
                        <></>
                      )}

                      {/* <Form.Label>Send Dash to:</Form.Label> */}

                      {this.state.isLoadingVerify ||
                      this.props.isLoadingForm_WALLET ? (
                        <Form.Control
                          type="text"
                          placeholder={this.state.sendToName}
                          readOnly
                        />
                      ) : (
                        <Form.Control
                          type="text"
                          placeholder="Enter name or address here..."
                          defaultValue={this.state.sendToName}
                          required
                          isValid={
                            this.state.nameFormat || this.state.addrFormat
                          }
                        />
                      )}
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="validationCustomNumber"
                    >
                      <Form.Label>Amount to Send (in Dash)</Form.Label>

                      {this.state.isLoadingVerify ||
                      this.props.isLoadingForm_WALLET ? (
                        <Form.Control
                          type="number"
                          placeholder={this.state.amountToSend}
                          readOnly
                        />
                      ) : (
                        <Form.Control
                          type="number"
                          placeholder="0.01 for example.."
                          defaultValue={this.state.amountToSend}
                          required
                        />
                      )}
                    </Form.Group>

                    {this.state.isLoadingVerify ? (
                      <>
                        <p> </p>
                        <div id="spinner">
                          <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </Spinner>
                        </div>
                        <p> </p>
                      </>
                    ) : (
                      <>
                        {(this.state.nameFormat || this.state.addrFormat) &&
                        this.state.numberQuantity &&
                        !this.props.isLoadingForm_WALLET ? (
                          <>
                            <p> </p>
                            <Button variant="primary" type="submit">
                              Send Dash
                            </Button>
                          </>
                        ) : (
                          <Button disabled variant="primary" type="submit">
                            Send Dash
                          </Button>
                        )}
                      </>
                    )}

                    {/* Add the message form input here */}
                    {!this.state.addrFormat &&
                    this.state.numberQuantity &&
                    this.state.nameFormat ? (
                      <>
                        <p></p>
                        <Form.Group
                          className="mb-3"
                          controlId="validationCustomMessage"
                        >
                          <Form.Label>
                            <b>Payment Message</b>
                          </Form.Label>

                          {this.state.isLoadingVerify ||
                          this.props.isLoadingForm_WALLET ? (
                            <Form.Control
                              onChange={this.onChange}
                              as="textarea"
                              rows={2}
                              placeholder={this.state.messageToAdd}
                              readOnly
                            />
                          ) : (
                            <Form.Control
                              onChange={this.onChange}
                              as="textarea"
                              rows={2}
                              placeholder="(Optional) Without a message, the receipient will not know who send the payment.."
                              defaultValue={this.state.messageToAdd}
                              required
                              isInvalid={this.state.tooLongMessageError}
                              //isValid={this.state.validMessage}
                            />
                          )}

                          {/* <Form.Control
                                    onChange={this.onChange}
                                    as="textarea"
                                    rows={2}
                                    placeholder="(Optional) Enter message here..."
                                    defaultValue={this.state.messageToAdd}
                                    required
                                    isInvalid={this.state.tooLongMessageError}
                                    //isValid={this.state.validMessage}
                                  /> */}

                          {this.state.tooLongError ? (
                            <Form.Control.Feedback
                              className="floatLeft"
                              type="invalid"
                            >
                              Sorry, this is too long! Please use less than 250
                              characters.
                            </Form.Control.Feedback>
                          ) : (
                            <></>
                          )}
                        </Form.Group>
                      </>
                    ) : (
                      <></>
                    )}
                  </Form>
                  {/* **** ^^^^ FORMS AND INFO ^^^^ **** */}
                  {/* MY SERIES OF ALERTS FOR ERRORS AND NO NAME AND NOT DGM DOC */}
                  {this.state.isError ? (
                    <Alert variant="warning" dismissible>
                      Testnet Platform is having difficulties...
                    </Alert>
                  ) : (
                    <></>
                  )}
                  {this.state.identityIdReceipient === "No Name" ? (
                    <>
                      <p></p>
                      <Alert variant="danger" dismissible>
                        <Alert.Heading>Alert!</Alert.Heading>
                        <p>
                          The name {this.state.sendToName} is not owned by
                          anyone.
                        </p>
                        <p>
                          Or you may have run into a platform issue, please
                          retry <b>Verify Payment</b> to try again.
                        </p>
                      </Alert>
                    </>
                  ) : (
                    <></>
                  )}
                  {this.state.identityIdReceipient === "Error" ? (
                    <>
                      <p></p>
                      <Alert variant="danger" dismissible>
                        <Alert.Heading>Alert!</Alert.Heading>
                        <p>
                          You have run into a platform error. If everything
                          seems correct, please retry <b>Verify Payment</b> to
                          try again.
                        </p>
                      </Alert>
                    </>
                  ) : (
                    <></>
                  )}
                  {this.state.dgmDocumentsForReceipient ===
                  "No DGM Doc for Receipient." ? (
                    <>
                      <p></p>
                      <Alert variant="danger" dismissible>
                        <Alert.Heading>Alert!</Alert.Heading>
                        <p>
                          <b>{this.state.sendToName}</b> has not yet enabled{" "}
                          <b>Pay to Name</b> at <b>DashGetMoney</b>. Let them
                          know on <b>DashShoutOut</b>.
                        </p>
                        <p>
                          Or you may have run into a platform issue, please
                          retry <b>Send Dash</b> to try again.
                        </p>
                      </Alert>
                      <p></p>
                    </>
                  ) : (
                    <></>
                  )}
                  {this.state.dgmDocumentsForReceipient === "Document Error" ? (
                    <>
                      <p></p>
                      <Alert variant="danger" dismissible>
                        <Alert.Heading>Alert!</Alert.Heading>
                        <p>
                          You have run into a platform error. If everything
                          seems correct, please retry <b>Verify Payment</b> to
                          try again.
                        </p>
                      </Alert>
                      <p></p>
                    </>
                  ) : (
                    <></>
                  )}
                  {this.props.WALLET_sendSuccess &&
                  !this.props.WALLET_sendMsgSuccess &&
                  !this.props.WALLET_sendMsgFailure ? (
                    <>
                      <p></p>
                      <Alert
                        variant="success"
                        onClose={() => this.props.handleSuccessAlert_WALLET()}
                        dismissible
                      >
                        <Alert.Heading>Payment Successful!</Alert.Heading>
                        <p>
                          You have successfully sent{" "}
                          <b>
                            {this.handleDenomDisplayNoStyle(
                              this.props.WALLET_amountToSend
                            )}
                          </b>{" "}
                          to{" "}
                          <b>
                            {this.props.WALLET_sendToName !== ""
                              ? this.props.WALLET_sendToName
                              : this.props.WALLET_sendToAddress}
                            !
                          </b>
                        </p>
                        <p>Sending payment message..</p>
                      </Alert>
                    </>
                  ) : (
                    <></>
                  )}
                  {this.props.WALLET_sendSuccess &&
                  this.props.WALLET_sendMsgSuccess ? (
                    <>
                      <p></p>
                      <Alert
                        variant="success"
                        onClose={() => this.props.handleSuccessAlert_WALLET()}
                        dismissible
                      >
                        <Alert.Heading>
                          Payment & Message Success!
                        </Alert.Heading>
                        <p>
                          You have successfully sent{" "}
                          <b>
                            {this.handleDenomDisplayNoStyle(
                              this.props.WALLET_amountToSend
                            )}
                          </b>{" "}
                          to{" "}
                          <b>
                            {this.props.WALLET_sendToName !== ""
                              ? this.props.WALLET_sendToName
                              : this.props.WALLET_sendToAddress}
                            !
                          </b>
                        </p>
                      </Alert>
                    </>
                  ) : (
                    <></>
                  )}

                  {this.props.WALLET_sendFailure ? (
                    <>
                      <p></p>
                      <Alert
                        variant="danger"
                        onClose={() => this.props.handleFailureAlert_WALLET()}
                        dismissible
                      >
                        <Alert.Heading>Payment Failed</Alert.Heading>
                        <p>
                          Payment was not sent. If everything seems correct,
                          please retry <b>Verify Payment</b> to try again.
                        </p>
                      </Alert>
                    </>
                  ) : (
                    <></>
                  )}
                  {this.props.WALLET_sendMsgFailure ? (
                    <>
                      <p></p>
                      <Alert
                        variant="danger"
                        onClose={() =>
                          this.props.handleFailureMsgAlert_WALLET()
                        }
                        dismissible
                      >
                        <Alert.Heading>Message Failed</Alert.Heading>
                        <p>
                          You have run into a platform error or insufficient
                          credits.
                          <p>
                            Go the <b>View TXs</b> to resend message.
                          </p>
                        </p>
                      </Alert>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
        </div>

        {this.props.WALLET_whichTab === "Your Wallet" ? (
          <>
            {this.props.dgmDocuments.length === 0 &&
            this.props.WALLET_Login7 &&
            !this.props.isLoadingButtons_WALLET ? (
              <>
                <div className="d-grid gap-2" style={{ margin: "1rem" }}>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => this.props.showModal("RegisterDGMModal")}
                  >
                    <b>Enable Pay-to-Name</b>
                  </Button>
                </div>
              </>
            ) : (
              <></>
            )}

            {this.props.dgmDocuments.length === 0 &&
            this.props.WALLET_Login7 &&
            this.props.isLoadingButtons_WALLET ? (
              <>
                <div className="d-grid gap-2" style={{ margin: "1rem" }}>
                  <Button variant="primary" size="lg" disabled>
                    <b>Enable Pay-to-Name</b>
                  </Button>
                </div>
              </>
            ) : (
              <></>
            )}

            {/* <TxHistoryComponent
                  mode={this.state.mode}
                  accountHistory={this.state.accountHistory}
                  accountBalance={this.state.accountBalance}
                /> */}
            <div style={{ marginLeft: "1rem" }}>
              <PaymentAddrComponent
                mode={this.props.mode}
                accountAddress={this.props.accountAddress}
              />
            </div>
          </>
        ) : (
          <></>
        )}

        {this.props.isModalShowing &&
        this.props.presentModal === "ConfirmPaymentModal" ? (
          <ConfirmPaymentModal
            sendToName={this.props.WALLET_sendToName}
            amountToSend={this.props.WALLET_amountToSend}
            messageToSend={this.props.WALLET_messageToSend}
            sendDashtoName={this.props.sendDashtoName}
            handleClearModalPostPmtConfirm={this.handleClearModalPostPmtConfirm}
            isModalShowing={this.props.isModalShowing}
            hideModal={this.props.hideModal}
            mode={this.props.mode}
            closeTopNav={this.props.closeTopNav}
          />
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default WalletPage;
