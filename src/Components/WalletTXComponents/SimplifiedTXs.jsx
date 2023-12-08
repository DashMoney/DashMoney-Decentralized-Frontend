import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class SimplifiedTXs extends React.Component {
  handleSatsToDash = (sats) => {
    let dashAmt = sats / 100000000;
    let dashAmt2Display = dashAmt.toFixed(3);
    return dashAmt2Display;
  };

  // handleDenomDisplayNoStyle = (duffs) => {
  //   if (duffs >= 1000000) {
  //     return <span>{(duffs / 100000000).toFixed(3)} Dash</span>;
  //   } else {
  //     return <span>{(duffs / 100000).toFixed(2)} mDash</span>;
  //   }
  // };

  handleTimeToDate = (timeObject, timeNow) => {
    //TEST Far Future Bug->
    let date = new Date(timeObject);

    //let longFormDate= setTime(date);
    if (timeObject > timeNow) {
      return "Sending..";
    }

    return date.toLocaleDateString();
  };

  handleTxOrderName = (tx) => {
    //SO THIS NEEDS TO BE MODIFIED TO HANDLE THE sortedTuples OF NAME THEN DOC INSTEAD OF 2 SEPARATE ARRAYS

    if (
      tx.txId === undefined ||
      //this.props.DGPOrders === "No Orders"

      this.props.sortedTuples.length === 0

      //SO THIS ^^ SECTION IS JUST TO HANDLE SIDE CASE AND NO MSGS.

      //AND WITH HANDLE NO ORDERS IN FUTURE ->
    ) {
      return "";
    } else {
      //ELSE 1

      let pmtTuple = this.props.sortedTuples.find((msg) => {
        return msg[1].txId === tx.txId;
      });

      // PUT THE SHOPPING ORDERS HERE

      // PUT THE YOUR STORE ORDERS HERE

      //Put the address Names here?
      if (pmtTuple === undefined) {
        let pmtAddress = "";
        if (tx.type === "sent") {
          //get the address from the TX ->

          for (addr in tx.to) {
            //change this to find because i am only sending to one address =>DONE
            if (addr.addressType === "otherAccount") {
              pmtAddress = addr.address;
              break;
            }
          }
        }

        pmtTuple = this.props.addressTuples.find((addrTuple) => {
          return addrTuple[1].address === pmtAddress;
        });
      }

      if (pmtTuple === undefined) {
        return "";
      } else {
        //ELSE 2

        // let orderName = this.props.sortedTuples.find(doc => {
        //   return doc.$ownerId === pmtMsgTuple.$ownerId;
        // })
        //I DON'T NEED BC I ALREADY HAVE THE TUPLE WHICH HAS THE NAME FOR THE MSG DOCUMENT

        return pmtTuple[0].label; //<- give the name but I want to give name and purpose if i have it.
      } // CLOSE ELSE 2
    } // CLOSE ELSE 1
  };

  render() {
    //Name amt balance date

    //detailed -> Name  amt  date
    //    -> msg or order (display??) or button to
    return (
      <>
        <Row
          key={this.props.index}
          //className="justify-content-md-center"
        >
          <Col>
            <b>{this.handleTxOrderName(this.props.tx)}</b>
          </Col>
          <Col>
            {this.props.tx.type === "received" ? (
              <b className="satBalImpactreceived">
                {" "}
                {this.handleSatsToDash(this.props.tx.satoshisBalanceImpact)}
              </b>
            ) : (
              <span className="satBalImpactsent">
                {this.handleSatsToDash(this.props.tx.satoshisBalanceImpact)}
              </span>
            )}
          </Col>
          <Col>
            {this.props.tx.type === "received" ? (
              <b>{this.handleSatsToDash(balanceArr[index])}</b>
            ) : (
              <span>{this.handleSatsToDash(balanceArr[index])}</span>
            )}
          </Col>
          <Col>{this.handleTimeToDate(this.props.tx.time, this.props.d)}</Col>
        </Row>
        {/* <tr key={index}>
          <td>
            <b>{this.handleTxOrderName(tx)}</b>
          </td>

          {tx.type === "received" ? (
            <td className="satBalImpactreceived">
              <b> {this.handleSatsToDash(tx.satoshisBalanceImpact)}</b>
            </td>
          ) : (
            <td className="satBalImpactsent">
              {this.handleSatsToDash(tx.satoshisBalanceImpact)}
            </td>
          )}
          {tx.type === "received" ? (
            <td>
              <b>{this.handleSatsToDash(balanceArr[index])}</b>
            </td>
          ) : (
            <td>{this.handleSatsToDash(balanceArr[index])}</td>
          )}

          <td>{this.handleTimeToDate(tx.time, d)}</td>
        </tr> */}
      </>
    );
  }
}

export default SimplifiedTXs;
