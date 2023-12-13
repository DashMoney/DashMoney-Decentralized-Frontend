import React from "react";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

class AccountLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      extraInfo: false,
    };
  }

  handleExtraInfo = () => {
    if (this.state.extraInfo === false)
      this.setState({
        extraInfo: true,
      });
    else {
      this.setState({
        extraInfo: false,
      });
    }
  };

  handleCreditsToTopup = () => {
    let topUpAmt = (this.props.identityInfo.balance / 1000000000).toFixed(2);
    return topUpAmt;
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

  // handleDenomDisplayNoStyle = (duffs) => {
  //   if (duffs >= 1000000) {
  //     return <span>{(duffs / 100000000).toFixed(3)} Dash</span>;
  //   } else {
  //     return <span>{(duffs / 100000).toFixed(2)} mDash</span>;
  //   }
  // };

  render() {
    let buttonColor;

    if (this.props.mode === "primary") {
      buttonColor = "outline-dark";
    } else {
      buttonColor = "outline-light";
    }

    let listofAliases = this.props.aliasList.map((alias, index) => {
      return (
        <li key={index}>
          <h5>
            <b>{alias}</b>
          </h5>
        </li>
      );
    });

    return (
      <>
        <div className="bodytext">
          <h2>
            <b>Your Account</b>
          </h2>

          {/* START OF THE NEW CONNECTED PAGE FLOW */}
          {!this.props.identityError &&
          !this.props.identityInfoError &&
          !this.props.walletError &&
          !this.props.nameError ? (
            <>
              {this.props.isLoadingWallet ? (
                <>
                  <div className="indentStuff">
                    <b>Wallet Balance</b>

                    <h4>Loading..</h4>
                  </div>
                </>
              ) : (
                <>
                  <div className="indentStuff">
                    <div className="cardTitle">
                      <div>
                        <b>Wallet Balance</b>
                        <h4>
                          <b>
                            {this.handleDenomDisplay(this.props.accountBalance)}
                          </b>
                        </h4>
                      </div>

                      {!this.props.isLoading &&
                      !this.props.isLoadingWallet &&
                      this.props.identity === "no identity" &&
                      this.props.accountBalance === 0 ? (
                        <>
                          <Button
                            style={{ marginRight: "1rem" }}
                            variant="primary"
                            onClick={() => this.props.handleAccountRetry()}
                          >
                            <b>Retry</b>
                          </Button>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* {this.props.isLoadingWallet ? (
                <>
                  <div className="indentStuff">
                    <b>Wallet Balance</b>

                    <h4>Loading..</h4>
                  </div>
                </>
              ) : (
                <>
                  <div className="indentStuff">
                    <b>Wallet Balance</b>
                    <h4>
                      <b>
                        {this.handleDenomDisplay(this.props.accountBalance)}
                      </b>
                    </h4>
                  </div>
                </>
              )} */}

              {!this.props.isLoading &&
              !this.props.isLoadingWallet &&
              this.props.identity === "no identity" &&
              this.props.accountBalance === 0 ? (
                <>
                  <p>There are insufficient funds in your wallet.</p>

                  <div className="d-grid gap-2" id="button-edge">
                    <Button
                      size="lg"
                      variant="primary"
                      onClick={() => {
                        this.props.showModal("SendFundsModal");
                      }}
                    >
                      <b>Send Funds to Wallet</b>
                    </Button>
                  </div>
                </>
              ) : (
                <></>
              )}

              {!this.props.isLoadingIdentity &&
              this.props.identity === "no identity" &&
              this.props.accountBalance !== 0 ? (
                <>
                  <div className="d-grid gap-2" id="button-edge">
                    <Button
                      size="lg"
                      variant="primary"
                      onClick={() => {
                        this.props.showModal("RegisterIdentityModal");
                      }}
                    >
                      <b>Register Identity</b>
                    </Button>
                  </div>
                  <p></p>
                  <div className="bodytext">
                    <p>
                      You are ready to <b>Register an Identity</b> and then
                      begin name purchasing!
                    </p>
                  </div>
                  {/* <p>
                    If this action doesn't work, Testnet Platform may be down.
                  </p> */}
                </>
              ) : (
                <></>
              )}

              <div className="ms-2 me-auto">
                {!this.props.isLoadingIdentity &&
                !this.props.isLoadingIdInfo &&
                this.props.identityInfo !== "" &&
                this.props.identity !== "no identity" ? (
                  <>
                    <p></p>

                    {/* <div className="id-line "> */}
                    {/* Insert beginning************** */}

                    <Button
                      variant="primary"
                      onClick={() => this.props.showModal("TopUpIdentityModal")}
                    >
                      <b>TopUp Identity</b>
                    </Button>

                    <span>
                      {/* <Badge className="paddingBadge" bg="primary" pill>
                        {this.props.identityInfo.balance} Credits
                        // {this.handleCreditsToTopup()} TopUps of Credits 
                      </Badge> */}

                      {this.props.identityInfo !== "" &&
                      this.props.identityInfo.balance > 450000000 ? (
                        <Badge className="paddingBadge" bg="primary" pill>
                          {this.handleCreditsToTopup()} TopUps of Credits
                        </Badge>
                      ) : (
                        <></>
                      )}
                      {this.props.identityInfo !== "" &&
                      this.props.identityInfo.balance <= 450000000 ? (
                        <Badge className="paddingBadge" bg="danger" pill>
                          {this.handleCreditsToTopup()} TopUps of Credits
                        </Badge>
                      ) : (
                        <></>
                      )}
                    </span>

                    <p></p>
                  </>
                ) : (
                  <></>
                )}

                {!this.props.isLoadingIdentity &&
                this.props.isLoadingIdInfo &&
                this.props.identityInfo !== "" &&
                this.props.identity !== "no identity" ? (
                  <>
                    <p></p>
                    <Button variant="primary" disabled>
                      <b>TopUp Identity</b>
                    </Button>

                    <span>
                      <Badge className="paddingBadge" bg="primary" pill>
                        Loading..
                      </Badge>
                    </span>

                    <p></p>
                  </>
                ) : (
                  <></>
                )}

                {/* ADD ^^^^ THE TOPUP LOADING STATE HERE 
              isLoadingIdInfo IS SET TO TRUE DURING TOPUP
              TEST => 
              */}

                {!this.props.isLoadingAlias &&
                !this.props.isLoadingName &&
                this.props.identity !== "no identity" ? (
                  <>
                    {this.props.uniqueName === "no name" ? (
                      <>
                        <div className="indentStuff">
                          <h4>
                            <b>Your Dash Name</b>
                          </h4>
                        </div>
                        <div className="d-grid gap-2" id="button-edge">
                          <Button
                            variant="primary"
                            onClick={() =>
                              this.props.showModal("RegisterNameModal")
                            }
                          >
                            <b>Purchase Name</b>
                          </Button>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    {this.props.uniqueName !== "no name" ? (
                      <>
                        {this.props.aliasList.length === 0 ? (
                          <>
                            <div className="indentStuff">
                              <h4>
                                <b>Your Dash Name</b>
                              </h4>
                              <ul>
                                <li>
                                  <h5>
                                    <b>{this.props.uniqueName}</b>
                                  </h5>
                                </li>
                              </ul>
                            </div>

                            <h6>
                              <b>Login complete!</b>
                            </h6>

                            <div
                              className="d-grid gap-2"
                              style={{
                                marginBottom: "1rem",
                              }}
                            >
                              <Button
                                variant="primary"
                                //size="lg"
                                onClick={() => this.props.toggleTopNav()}
                              >
                                <b>Go to Dapps</b>
                              </Button>
                            </div>
                            <h6 style={{ textAlign: "center" }}>
                              <b>OR</b>
                            </h6>

                            <div
                              className="d-grid gap-2"
                              style={{
                                marginTop: "1rem",
                              }}
                              id="button-edge"
                            >
                              <Button
                                variant="primary"
                                onClick={() =>
                                  this.props.showModal("RegisterNameAliasModal")
                                }
                              >
                                <b>Purchase Alias</b>
                              </Button>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="indentStuff">
                              <h4>
                                <b>Your Dash Names</b>
                              </h4>
                              <ul>
                                <li>
                                  <h5>
                                    <b>{this.props.uniqueName}</b>
                                  </h5>
                                </li>
                                {listofAliases}
                              </ul>
                            </div>
                            <div className="d-grid gap-2" id="button-edge">
                              <Button
                                variant="primary"
                                onClick={() =>
                                  this.props.showModal("RegisterNameAliasModal")
                                }
                              >
                                <b>Purchase Alias</b>
                              </Button>
                            </div>
                          </>
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
            </>
          ) : (
            <>
              {this.props.identityError ? (
                <>
                  <p>
                    Identity retrieval error. Testnet Platform may be down,
                    please refresh page and try again, or check the network with{" "}
                    <b>Test Connection</b>.
                  </p>
                </>
              ) : (
                <></>
              )}

              {/* Put nameError, identityInfoError and wallet Error here as well I guess or can separate out to separte component and do 'alerts' instead of texts. */}
            </>
          )}

          {/* END OF NEW CONNECTED PAGE FLOW */}

          {this.props.isLoadingIdentity ||
          this.props.isLoadingIdInfo ||
          this.props.isLoadingName ||
          this.props.isLoadingAlias ? (
            <>
              <p></p>
              <div id="spinner">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
              <p></p>
            </>
          ) : (
            <></>
          )}

          {/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */}

          <div className="positionButton">
            <Button
              variant={buttonColor}
              onClick={() => {
                this.handleExtraInfo();
              }}
            >
              <h3>More about name/alias</h3>
            </Button>
          </div>

          {this.state.extraInfo ? (
            <>
              <p></p>
              <div className="indentStuff">
                <p>
                  The <b>first name</b> purchased for an Identity is the{" "}
                  <b>dashUniqueIdentityId</b>, and all names purchased after are{" "}
                  <b>dashAliasIdentityId</b> or "aliases". But rest assured, be
                  it the first name or an alias, it will successfully retrieve
                  your identity. (But the Dapps build by DashMoney will focus on
                  the DashUniqueIdentityID, so if you want to use a name make
                  sure it is the first.)
                </p>
                <p>
                  It is recommended that names for an Identity be related. For
                  example, JohnDoe (dashUniqueIdentityId), John-Doe
                  (dashAliasIdentityId), and JohnDoe007 (dashAliasIdentityId).
                  But do not forget, you can always do what you want, it is your
                  Dash.
                </p>
                <p>
                  A good practice is for different entities to have separate
                  Identities. For example, if the owner of Bob's Burger and
                  Chicken Palace purchased the names: BobsBurger and
                  ChickenPalace, he should purchase them under different
                  Identities.
                </p>
                <p>
                  <b>DashMoney Dapps</b> are implemented such that you can only
                  purchase a single Identity for your account(12 word mnemonic).
                  This is to maintain a simple implementation and not add
                  complexity in the future. Currently, there is no trustless way
                  to exchange names with others.
                </p>
              </div>
            </>
          ) : (
            <></>
          )}

          {this.props.isLoginComplete ? (
            <div
              className="d-grid gap-2"
              style={{
                marginTop: "4rem",
                paddingLeft: "3rem",
                paddingRight: "3rem",
              }}
            >
              <Button
                variant="primary"
                //size="lg"
                onClick={() => this.props.showModal("LogoutModal")}
              >
                <b>Logout</b>
              </Button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  }
}

export default AccountLogin;
