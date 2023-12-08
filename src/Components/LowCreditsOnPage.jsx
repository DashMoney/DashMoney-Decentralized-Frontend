import React from 'react';

import Badge from "react-bootstrap/Badge";

/**
 * So this will have the credits display and able to click to TopUp and then the modal will have the walletbalance and topup Function
 * 
 */

class LowCreditsOnPage extends React.Component {

  render() { 
    return (
      <>
        

              {this.props.identityInfo !== "" &&
              this.props.identityInfo.balance <= 450000000 ? (
                <div
                  className="id-line"
                  onClick={() => this.props.showModal("TopUpIdentityModal")}
                >
                  <>
                    <h5>
                      <Badge className="paddingBadge" bg="danger">
                        Platform Credits : Low!
                      </Badge>
                    </h5>
                  </>
                  <>
                    <p></p>
                    <h5>
                      <Badge className="paddingBadge" bg="danger" pill>
                        {this.props.identityInfo.balance}
                      </Badge>
                    </h5>
                  </>
                </div>
              ) : (
                <></>
              )}
      </>
    );
  }
}
 
export default LowCreditsOnPage;
