//have to sort the message prior to name attach
//then attach name
//
//
// Alright dont have to create a new way just have to change the inputs a bit
//
//Wallet.jsx render -> combine the msgs and the threads and pass that to the P2P Sequencer ->
//
// then pass the output of the sequencer to the component
//
// HAVE TO DO THE NAMES TOGETHER HERE AND NOT SEPARATE ->

import React from "react";
//import Badge from "react-bootstrap/Badge";
//import Button from "react-bootstrap/Button";

import PaymentsMsgs from "./PaymentsMsgs";
import P2PSequencerDisplay from "../P2PSequencerDisplay";

class PaymentsTabNEW extends React.Component {
  render() {
    // *** *** *** *** *** ***
    //
    //KEEP SEPARATE BC TUPLING OF NAMES <= ***
    //
    // //COMBINE MSG & THREADS HERE ->
    // let bothThreads = [
    //   ...this.props.WALLET_ByYouThreads,
    //   ...this.props.WALLET_ToYouThreads,
    // ];
    // //THESE 2 ARE ALWAYS [..] SO ITS OKAY
    // let bothMessages = [
    //   ...this.props.WALLET_ByYouMsgs,
    //   ...this.props.WALLET_ToYouMsgs,
    // ];
    let thrsAndMsgsArr_BYYOU = [];
    let paidThrs_BYYOU = [];
    let replyThrs_BYYOU = [];
    let paymentMsgs_BYYOU = [];
    let paidOrRejPmtReqs_BYYOU = [];
    let notPaidPmtReqs_BYYOU = [];

    let thrsAndMsgsArr_TOYOU = [];
    let paidThrs_TOYOU = [];
    let replyThrs_TOYOU = [];
    let paymentMsgs_TOYOU = [];
    let paidOrRejPmtReqs_TOYOU = [];
    let notPaidPmtReqs_TOYOU = [];

    thrsAndMsgsArr_BYYOU = P2PSequencerDisplay(
      this.props.ByYouMsgs,
      this.props.ByYouThreads
    );
    paidThrs_BYYOU = thrsAndMsgsArr_BYYOU[0];
    replyThrs_BYYOU = thrsAndMsgsArr_BYYOU[1];
    paymentMsgs_BYYOU = thrsAndMsgsArr_BYYOU[2];
    paidOrRejPmtReqs_BYYOU = thrsAndMsgsArr_BYYOU[3];
    notPaidPmtReqs_BYYOU = thrsAndMsgsArr_BYYOU[4];

    thrsAndMsgsArr_TOYOU = P2PSequencerDisplay(
      this.props.ToYouMsgs,
      this.props.ToYouThreads
    );
    paidThrs_TOYOU = thrsAndMsgsArr_TOYOU[0];
    replyThrs_TOYOU = thrsAndMsgsArr_TOYOU[1];
    paymentMsgs_TOYOU = thrsAndMsgsArr_TOYOU[2];
    paidOrRejPmtReqs_TOYOU = thrsAndMsgsArr_TOYOU[3];
    notPaidPmtReqs_TOYOU = thrsAndMsgsArr_TOYOU[4];
    //
    //threads - [0] -> paid/rejected Thrs -> messages Tab
    //threads - [1] -> reply - for pmtMsgsReply AND reqReply -> msg Tab & queue
    //messages - [2] -> PmtMsgs -> this goes to messages Tab
    //messages - [3] -> PmtReqsPaidOrRej -> messages Tab
    //messages - [4] -> PmtReqsNeitherPaidOrRej ->  this goes to queue
    //
    //ONLY THE BELOW FOR PAYMENTS TAB:
    //paidThrs={paidThrs} //-> messages Tab
    //replyThrs={replyThrs}//-> msg Tab & queue
    //paymentMsgs={paymentMsgs} //-> this goes to messages Tab
    //paidOrRejPmtReqs={paidOrRejPmtReqs} //-> messages Tab

    // ByYou and ToYou No Longer separate -> WRONG
    // let messagesArray = [
    //   ...this.props.paymentMsgs,
    //   ...this.props.paidOrRejPmtReqs,
    // ];
    //let namesArray = [...this.props.ByYouNames, ...this.props.ToYouNames];
    //NO ^^^ DEFINITELY NOT ^^

    let tupleByYouArray = [];

    let ByYouMsgsPostSeq = [...paidOrRejPmtReqs_BYYOU, ...paymentMsgs_BYYOU];

    tupleByYouArray = ByYouMsgsPostSeq.map((msg) => {
      let tuple = "";

      for (let nameDoc of this.props.ByYouNames) {
        if (nameDoc.$ownerId === msg.toId) {
          tuple = [nameDoc.label, msg];
          break;
        }
      }
      if (tuple !== "") {
        return tuple;
      }

      return ["No Name Avail..", msg];
    });
    // *** *** *** *** *** ***

    let tupleToYouArray = [];

    let ToYouMsgsPostSeq = [...paidOrRejPmtReqs_TOYOU, ...paymentMsgs_TOYOU];

    tupleToYouArray = ToYouMsgsPostSeq.map((msg) => {
      let tuple = "";

      for (let nameDoc of this.props.ToYouNames) {
        if (nameDoc.$ownerId === msg.$ownerId) {
          tuple = [nameDoc.label, msg];
          break;
        }
      }
      if (tuple !== "") {
        return tuple;
      }

      return ["No Name Avail..", msg];
    });
    // *** *** *** *** *** ***

    // ### ### ### ### ### ###

    let tupleThreads = [...this.props.ByYouThreads, ...this.props.ToYouThreads];

    //DO I NEED TO KEEP THIS SEPARATE? OR CAN I JUST USE THE ORIGINAL ABOVE THREADS?? -> I CHOOSE ABOVE

    //let tupleThreads = [...this.props.paidThrs, ...this.props.replyThrs];
    //OR I WOULD NEED SEPARATE TOYOU AND BYYOU OF THREADS

    // ### ### ### ### ### ###

    let tupleArray = [...tupleByYouArray, ...tupleToYouArray];

    // Ensure Unique msgs*** START
    let arrayOfMsgIds = tupleArray.map((tuple) => {
      return tuple[1].$id;
    });

    // console.log('Combine arrayMsgId!!', arrayOfMsgIds);

    let setOfMsgIds = [...new Set(arrayOfMsgIds)];

    arrayOfMsgIds = [...setOfMsgIds];

    // //       ***

    tupleArray = arrayOfMsgIds.map((msgId) => {
      let tuple = [];

      for (let tupleDoc of tupleArray) {
        if (tupleDoc[1].$id === msgId) {
          tuple = tupleDoc;
          break;
        }
      }
      return tuple;
    });
    // Ensure Unique msgs*** END

    // console.log('CombineandUnique Tuples!!', tupleArray);

    let sortedTuples = tupleArray.sort(function (a, b) {
      return b[1].$createdAt - a[1].$createdAt;
    });

    // console.log('Final Tuples!!', sortedTuples);

    let today = new Date();
    let yesterday = new Date(today);

    yesterday.setDate(yesterday.getDate() - 1);

    let tuples = sortedTuples.map((tuple, index) => {
      return (
        <PaymentsMsgs
          key={index}
          mode={this.props.mode}
          index={index}
          tuple={tuple}
          today={today}
          yesterday={yesterday}
          identity={this.props.identity}
          uniqueName={this.props.uniqueName}
          showModal={this.props.showModal}
          handleThread={this.props.handleThread}
          // ForYouThreads={ForYouThreads}
          // ForYouThreadsNames={ForYouThreadsNames}
          tupleThreads={tupleThreads}
        />
      );
    });

    return (
      <>
        {sortedTuples.length < 1 ? (
          <p className="paddingBadge">
            Payment messages, you send or ones sent to you, will appear here.
          </p>
        ) : (
          <></>
        )}

        <div className="footer">{tuples}</div>
      </>
    );
  }
}

export default PaymentsTabNEW;
