import React from "react";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
//import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

import "./InvitesPage.css";

class InvitesPage extends React.Component {
  handleTimeToDate = (timeObject) => {
    let date = new Date(timeObject);

    //let longFormDate= setTime(date);

    return date.toLocaleDateString();
  };

  handleJoinGroup = (groupName) => {
    this.props.handleSelectedJoinGroup(groupName);
  };

  render() {
    let acceptedInvitesButtons = <></>;
    let othersInvitesButtons = <></>;

    acceptedInvitesButtons = this.props.dgtAcceptedInvites.map(
      (acceptedGroup, index) => {
        return (
          <Button
            key={index}
            variant="primary"
            onClick={() => this.props.showGroupPage(acceptedGroup.group)}
          >
            {acceptedGroup.group}
            <Badge className="createwalletbtn" bg="light" text="dark" pill>
              {this.handleTimeToDate(acceptedGroup.$createdAt)}
            </Badge>
          </Button>
        );
      }
    );

    othersInvitesButtons = this.props.othersInvitesToDisplay.map(
      (othersInvite, index) => {
        return (
          <Button
            key={index}
            variant="primary"
            onClick={() => this.handleJoinGroup(othersInvite[1].group)}
          >
            {othersInvite[1].group}
            <Badge className="createwalletbtn" bg="light" text="dark" pill>
              {othersInvite[0]}
            </Badge>
          </Button>
        );
      }
    );

    return (
      <>
        <p></p>
        <div className="id-line">
          <h5>
            {this.props.identityInfo === "" ||
            this.props.identityInfo.balance >= 450000000 ? (
              <Badge className="paddingBadge" bg="primary">
                Your Platform Credits
              </Badge>
            ) : (
              <Badge className="paddingBadge" bg="danger">
                Platform Credits : Low!
              </Badge>
            )}
          </h5>
          {this.props.identityInfo === "" ? (
            <h5>
              <Badge className="paddingBadge" bg="primary" pill>
                Loading..
              </Badge>
            </h5>
          ) : (
            <>
              {this.props.identityInfo.balance >= 450000000 ? (
                <h5>
                  <Badge className="paddingBadge" bg="primary" pill>
                    {this.props.identityInfo.balance}
                  </Badge>
                </h5>
              ) : (
                <h5>
                  <Badge className="paddingBadge" bg="danger" pill>
                    {this.props.identityInfo.balance}
                  </Badge>
                </h5>
              )}
            </>
          )}

          <h5>
            {this.props.identityInfo === "" ||
            this.props.identityInfo.balance >= 450000000 ? (
              <></>
            ) : (
              <Badge className="paddingBadge" bg="primary">
                Please visit DGN or DGM to TopUp your credits.
              </Badge>
            )}
          </h5>
          
        </div>
        <div id="bodytext">
          {this.props.isLoading ? (
            <>
              <p></p>
              <div id="spinner">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            </>
          ) : (
            <></>
          )}

          {this.props.identity !== "Retrieving Identity" &&
          this.props.identity !== "No Identity" &&
          this.props.uniqueName !== "Er" &&
          !this.props.isLoading ? (
            <>
              <h3>Your Groups</h3>
            </>
          ) : (
            <></>
          )}

          {!this.props.isLoading && this.props.isLoadingRefresh ? (
            <>
              <p></p>
              <div id="spinner">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            </>
          ) : (
            <></>
          )}

          {this.props.identity !== "Retrieving Identity" &&
          this.props.identity !== "No Identity" &&
          this.props.uniqueName !== "Er" &&
          !this.props.isLoading &&
          !this.props.isLoadingRefresh &&
          this.props.dgtAcceptedInvites.length === 0 ? (
            <>(Groups, you have joined or created will appear here!)</>
          ) : (
            <></>
          )}

          {this.props.identity !== "Retrieving Identity" &&
          this.props.identity !== "No Identity" &&
          this.props.uniqueName !== "Er" &&
          !this.props.isLoading &&
          !this.props.isLoadingRefresh ? (
            <>
              <div className="d-grid gap-2">{acceptedInvitesButtons}</div>
              <p></p>
              <h3>Your Invites</h3>

              {!this.props.isLoading && this.props.isLoadingOthersInvites ? (
                <>
                  <p></p>
                  <div id="spinner">
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
                </>
              ) : (
                <></>
              )}

              <div className="d-grid gap-2">{othersInvitesButtons}</div>
            </>
          ) : (
            <></>
          )}

          {this.props.identity !== "Retrieving Identity" &&
          this.props.identity !== "No Identity" &&
          this.props.uniqueName !== "Er" &&
          !this.props.isLoading &&
          !this.props.isLoadingRefresh &&
          this.props.othersInvitesToDisplay.length === 0 ? (
            <>(Invites sent to you will appear here!)</>
          ) : (
            <></>
          )}
        </div>

        {this.props.identity === "No Identity" ? (
          <div id="bodytext">
            <p>
              There is no Identity for this Mnemonic, please go the{" "}
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://dashgetnames.com/"
              >
                DashGetNames.com
              </a>{" "}
              and register an Identity for your Mnemonic.
            </p>
            <p>Or Testnet Platform maybe having difficulties...</p>
          </div>
        ) : (
          <></>
        )}

        {this.props.uniqueName === "Er" ? (
          <div id="bodytext">
            <p>
              There is no Name for this Identity, please go to{" "}
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://dashgetnames.com/"
              >
                DashGetNames.com
              </a>{" "}
              and register an Name for your Identity.
            </p>
            <p>
              Or you may have run into a platform issue, just reload page and
              try again.
            </p>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default InvitesPage;
