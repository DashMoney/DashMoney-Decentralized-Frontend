import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import CloseButton from "react-bootstrap/CloseButton";
/* toMe: {
          
          minLength: 1,
          maxLength: 32,
        },
        toMeVia: {
          //(DashMoney.io) Wallet, Paypal, Venmo
          minLength: 1,
          maxLength: 32,
        },

        toMeHandle: {
          // 'Bob', 'Bob0242325'
          minLength: 1,
          maxLength: 32,
        },

        toU: {
          
          minLength: 1,
          maxLength: 32,
        },
        toUVia: {
          //(DashMoney.io) Wallet, Paypal, Venmo
          minLength: 1,
          maxLength: 32,
        },
        
        exRate: {
          //Use form to restrict to 2 decimal places. OR USE Platform to..
          //BUT IF i USE THIS HOW WILL THE ORDERbY QUERY WORK OR WILL I WORK DO i NEED TO USE INTEGER. AND JUST USE FOR TO RESTRICT ON THE OTHER SIDE.
          // type: 'string',
          // minLength: 1,
          // maxLength: 20,
          type: 'integer',
          minimum: 0,
          maximum: 1000000000000,
          position: 5,
        }, // 30 Dollars Per Dash  // Auto Populates Dollars and Dash  -> But one has to be Dash..

        instruction: {
          minLength: 1,
          maxLength: 350,
        },

        active: {
          type: 'boolean',
          position: 7,
        },
        minAmt: {
          type: 'integer',
          minimum: 0,
          maximum: 1000000000000,
          
        },
        maxAmt: {
          type: 'integer',
          minimum: 0,
          maximum: 1000000000000,
         
        },
 * 
 */
class CreateOfferModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 'toMe',
      // 'toMeVia',
      // 'toMeHandle',
      // 'toU',
      // 'toUVia',
      // //'toUHandle',
      // 'exRate',
      // 'instruction',
      // 'minAmt',
      // 'maxAmt',
      // 'active',

      toMeInput: "",
      validtoMe: false,
      //tooLongtoMeError: false,

      toMeInputOTHER: "",
      validtoMeOTHER: false,
      tooLongtoMeErrorOTHER: false,

      toMeViaInput: "",
      validtoMeVia: false,
      // tooLongtoMeViaError: false,

      toMeViaInputOTHER: "",
      validtoMeViaOTHER: false,
      tooLongtoMeViaErrorOTHER: false,

      toMeHandleInput: "",
      validtoMeHandle: false,
      tooLongtoMeHandleError: false,

      toMeAddrInput: "",
      tooLongtoMeAddrError: false,
      validtoMeAddr: false,

      toMeFinal: false,
      toMe4Doc: "",
      toMeVia4Doc: "",
      toMeHandle4Doc: "",

      toUInput: "",
      validtoU: false,
      //tooLongtoUError: false,

      toUInputOTHER: "",
      validtoUOTHER: false,
      tooLongtoUErrorOTHER: false,

      toUViaInput: "",
      validtoUVia: false,
      //tooLongtoUViaError: false,

      toUViaInputOTHER: "",
      validtoUViaOTHER: false,
      tooLongtoUViaErrorOTHER: false,

      toUFinal: false,
      toU4Doc: "",
      toUVia4Doc: "",

      exRateInput: 0,
      validexRate: false,

      instructionInput: "",
      validinstruction: false,
      tooLonginstructionError: false,

      minAmtInput: 0,
      validminAmt: false,

      maxAmtInput: 0,
      validmaxAmt: false,

      offerActive: true,

      calcInput: 0,
    };
  }

  handleCloseClick = () => {
    this.props.hideModal();
  };

  handleActive = () => {
    if (this.state.offerActive) {
      this.setState({
        offerActive: false,
      });
    } else {
      this.setState({
        offerActive: true,
      });
    }
  };
  //Called after state is set.
  verifyOrigi = () => {
    //set false unless hits a success full case
    // this.setState({
    //   toMeFinal: false,
    // },()=>this.verifyOrigi());

    // toMeFinal: false,
    // toMe4Doc: "",
    // toMeVia4Doc: "",
    // toMeHandle4Doc: "",
    //
    // 1) Dash -> PaytoName -> uniqueName
    if (
      this.state.toMeInput === "Dash" &&
      this.state.toMeViaInput === "PaytoName"
    ) {
      this.setState({
        toMeFinal: true,
        toMe4Doc: "Dash",
        toMeVia4Doc: "PaytoName",
        toMeHandle4Doc: this.props.uniqueName,
      });
    }
    // 2) Dash -> Address -> addr
    if (
      this.state.toMeInput === "Dash" &&
      this.state.toMeViaInput === "Address" &&
      this.state.validtoMeAddr
    ) {
      this.setState({
        toMeFinal: true,
        toMe4Doc: "Dash",
        toMeVia4Doc: "Address",
        toMeHandle4Doc: this.state.toMeAddrInput,
      });
    }
    //THIS IS FOR THE USD AND EUR
    if (this.state.toMeInput !== "" && this.state.toMeInput !== "Other") {
      // 3) USD AND EUR(Inside) -> Zelle, Venmo, PayPal -> Handle
      if (
        this.state.toMeViaInput !== "" &&
        this.state.toMeViaInput !== "Other" &&
        // (this.state.toMeVia === "Zelle" ||
        //   this.state.toMeVia === "PayPal" ||
        //   this.state.toMeVia === "Venmo") &&
        this.state.validtoMeHandle
      ) {
        this.setState({
          toMeFinal: true,
          toMe4Doc: this.state.toMeInput,
          toMeVia4Doc: this.state.toMeViaInput,
          toMeHandle4Doc: this.state.toMeHandleInput,
        });
      }
      //
      // 4) USD AND EUR(Inside) -> Other -> Handle
      if (
        this.state.toMeViaInput === "Other" &&
        this.state.validtoMeViaOTHER &&
        this.state.validtoMeHandle
      ) {
        this.setState({
          toMeFinal: true,
          toMe4Doc: this.state.toMeInput,
          toMeVia4Doc: this.state.toMeViaInputOTHER,
          toMeHandle4Doc: this.state.toMeHandleInput,
        });
      }
    }
    //
    //THIS IS FOR THE Other ->
    if (this.state.toMeInput === "Other" && this.state.validtoMeOTHER) {
      // 5) Other(Inside) -> Zelle, Venmo, PayPal, Cash App -> Handle
      if (
        this.state.toMeViaInput !== "" &&
        this.state.toMeViaInput !== "Other" &&
        this.state.validtoMeHandle
      ) {
        this.setState({
          toMeFinal: true,
          toMe4Doc: this.state.toMeInputOTHER,
          toMeVia4Doc: this.state.toMeViaInput,
          toMeHandle4Doc: this.state.toMeHandleInput,
        });
      }
      // 6) Other(Inside) -> Other -> Handle
      if (
        this.state.toMeViaInput === "Other" &&
        this.state.validtoMeViaOTHER &&
        this.state.validtoMeHandle
      ) {
        this.setState({
          toMeFinal: true,
          toMe4Doc: this.state.toMeInputOTHER,
          toMeVia4Doc: this.state.toMeViaInputOTHER,
          toMeHandle4Doc: this.state.toMeHandleInput,
        });
      }
    }
  };

  verifyRecip = () => {
    // 1) Dash <= PaytoName or Address
    if (this.state.toUInput === "Dash") {
      this.setState({
        toUFinal: true,
        toU4Doc: "Dash",
        toUVia4Doc: "Wallet", // "Address", "PaytoName" NEED SOMETHING FOR THE DOCUMENT BEING CREATED.
      });
    }

    //
    //THIS IS FOR THE USD AND EUR
    if (this.state.toUInput !== "" && this.state.toUInput !== "Other") {
      // 2) USD AND EUR(Inside) -> Zelle, Venmo, PayPal, Cash App
      if (this.state.toUViaInput !== "" && this.state.toUViaInput !== "Other") {
        this.setState({
          toUFinal: true,
          toU4Doc: this.state.toUInput,
          toUVia4Doc: this.state.toUViaInput,
        });
      }
      //
      // 3) USD AND EUR(Inside) -> Other
      if (this.state.toUViaInput === "Other" && this.state.validtoUViaOTHER) {
        this.setState({
          toUFinal: true,
          toU4Doc: this.state.toUInput,
          toUVia4Doc: this.state.toUViaInputOTHER,
        });
      }
    }

    //
    //THIS IS FOR THE Other ->
    if (this.state.toUInput === "Other" && this.state.validtoUOTHER) {
      // 4) Other(Inside) -> Zelle, Venmo, PayPal
      if (this.state.toUViaInput !== "" && this.state.toUViaInput !== "Other") {
        this.setState({
          toUFinal: true,
          toU4Doc: this.state.toUInputOTHER,
          toUVia4Doc: this.state.toUViaInput,
        });
      }
      // 5) Other(Inside) -> Other
      if (this.state.toUViaInput === "Other" && this.state.validtoUViaOTHER) {
        this.setState({
          toUFinal: true,
          toU4Doc: this.state.toUInputOTHER,
          toUVia4Doc: this.state.toUViaInputOTHER,
        });
      }
    }
  };

  onChange = (event) => {
    // console.log(event.target.value);
    //console.log(`id = ${event.target.id}`);

    if (event.target.id === "formtoMe") {
      event.preventDefault();
      event.stopPropagation();
      //Set invalid to reset the forms below
      this.setState(
        {
          validtoMe: false,
        },
        () => this.toMeValidate(event.target.value)
      );
    }

    if (event.target.id === "formtoMeOTHER") {
      event.preventDefault();
      event.stopPropagation();
      this.toMeValidateOTHER(event.target.value);
    }

    if (event.target.id === "formtoMeVia") {
      event.preventDefault();
      event.stopPropagation();
      this.toMeViaValidate(event.target.value);
    }

    if (event.target.id === "formtoMeViaDash") {
      event.preventDefault();
      event.stopPropagation();
      this.toMeViaDashValidate(event.target.value);
    }

    if (event.target.id === "formtoMeViaOTHER") {
      event.preventDefault();
      event.stopPropagation();
      this.toMeViaValidateOTHER(event.target.value);
    }

    if (event.target.id === "formtoMeHandle") {
      event.preventDefault();
      event.stopPropagation();
      this.toMeHandleValidate(event.target.value);
    }

    if (event.target.id === "formtoMeAddr") {
      event.preventDefault();
      event.stopPropagation();
      this.toMeAddrValidate(event.target.value);
    }

    if (event.target.id === "formtoU") {
      event.preventDefault();
      event.stopPropagation();
      //Set invalid to reset the forms below
      this.setState(
        {
          validtoU: false,
        },
        () => this.toUValidate(event.target.value)
      );
    }

    if (event.target.id === "formtoUOTHER") {
      event.preventDefault();
      event.stopPropagation();
      this.toUValidateOTHER(event.target.value);
    }

    if (event.target.id === "formtoUVia") {
      event.preventDefault();
      event.stopPropagation();
      this.toUViaValidate(event.target.value);
    }

    // if (event.target.id === "formtoUViaDash") {
    //   event.preventDefault();
    //   event.stopPropagation();
    //   this.toUViaDashValidate(event.target.value);
    // }

    if (event.target.id === "formtoUViaOTHER") {
      event.preventDefault();
      event.stopPropagation();
      this.toUViaValidateOTHER(event.target.value);
    }

    if (event.target.id === "formexRate") {
      event.preventDefault();
      event.stopPropagation();
      this.exRateValidate(event.target.value);
    }

    if (event.target.id === "formCalc") {
      event.preventDefault();
      event.stopPropagation();
      this.calcValidate(event.target.value);
    }

    if (event.target.id === "formminAmt") {
      event.preventDefault();
      event.stopPropagation();
      this.minAmtValidate(event.target.value);
    }

    if (event.target.id === "formmaxAmt") {
      event.preventDefault();
      event.stopPropagation();
      this.maxAmtValidate(event.target.value);
    }

    if (event.target.id === "custom-switch") {
      event.stopPropagation();
      this.handleActive();
    }

    if (event.target.id === "forminstruction") {
      event.preventDefault();
      event.stopPropagation();
      this.instructionValidate(event.target.value);
    }
  };
  // toMe ***
  toMeValidate = (toMe) => {
    let regex = /^\S.{0,32}\S$/;
    let valid = regex.test(toMe);

    if (valid) {
      this.setState({
        toMeInput: toMe,
        validtoMe: true,
        tooLongtoMeError: false,

        toMeFinal: false,

        //Must reset other inputs if change above one.
        toMeViaInput: "",
        validtoMeVia: false,

        toMeViaInputOTHER: "",
        validtoMeViaOTHER: false,
        //
        toMeHandle: "",
        validtoMeHandle: false,
        //
        toMeAddr: "",
        validtoMeAddr: false,
      });
    } else {
      if (toMe.length > 34) {
        this.setState({
          toMeInput: toMe,
          tooLongtoMeError: true,
          validtoMe: false,
          toMeFinal: false,
        });
      } else {
        this.setState({
          toMeInput: toMe,
          validtoMe: false,
          toMeFinal: false,
        });
      }
    }
  };

  toMeValidateOTHER = (toMe) => {
    let regex = /^\S.{0,32}\S$/;
    let valid = regex.test(toMe);

    if (valid) {
      this.setState(
        {
          toMeInputOTHER: toMe,
          tooLongtoMeErrorOTHER: false,
          validtoMeOTHER: true,
          ////set false unless hits a success full case
          toMeFinal: false,
        },
        () => this.verifyOrigi()
      );
    } else {
      if (toMe.length > 34) {
        this.setState({
          toMeInputOTHER: toMe,
          tooLongtoMeErrorOTHER: true,
          validtoMeOTHER: false,
          toMeFinal: false,
        });
      } else {
        this.setState({
          toMeInputOTHER: toMe,
          validtoMeOTHER: false,
          toMeFinal: false,
        });
      }
    }
  };
  //toMeVia ***
  toMeViaValidate = (toMeVia) => {
    let regex = /^\S.{0,32}\S$/;
    let valid = regex.test(toMeVia);

    if (valid) {
      this.setState(
        {
          toMeViaInput: toMeVia,
          tooLongtoMeViaError: false,
          validtoMeVia: true,
          //Must reset other inputs if change above one.
          toMeViaInputOTHER: "",
          tooLongtoMeViaErrorOTHER: false,
          validtoMeViaOTHER: false,
          ////set false unless hits a success full case
          toMeFinal: false,
        },
        () => this.verifyOrigi()
      );
    } else {
      if (toMeVia.length > 34) {
        this.setState({
          toMeViaInput: toMeVia,
          tooLongtoMeViaError: true,
          validtoMeVia: false,
          toMeFinal: false,
        });
      } else {
        this.setState({
          toMeViaInput: toMeVia,
          validtoMeVia: false,
          toMeFinal: false,
        });
      }
    }
  };

  toMeViaDashValidate = (toMeVia) => {
    let regex = /^\S.{1,32}\S$/;
    let valid = regex.test(toMeVia);

    if (valid) {
      this.setState(
        {
          toMeViaInput: toMeVia,
          tooLongtoMeViaError: false,
          validtoMeVia: true,
          ////set false unless hits a success full case
          toMeFinal: false,
        },
        () => this.verifyOrigi()
      );
    } else {
      if (toMeVia.length > 34) {
        this.setState({
          toMeViaInput: toMeVia,
          tooLongtoMeViaError: true,
          validtoMeVia: false,
          toMeFinal: false,
        });
      } else {
        this.setState({
          toMeViaInput: toMeVia,
          validtoMeVia: false,
          toMeFinal: false,
        });
      }
    }
  };

  toMeViaValidateOTHER = (toMeVia) => {
    let regex = /^\S.{1,32}\S$/;
    let valid = regex.test(toMeVia);

    if (valid) {
      this.setState(
        {
          toMeViaInputOTHER: toMeVia,
          tooLongtoMeViaErrorOTHER: false,
          validtoMeViaOTHER: true,
          ////set false unless hits a success full case
          toMeFinal: false,
        },
        () => this.verifyOrigi()
      );
    } else {
      if (toMeVia.length > 34) {
        this.setState({
          toMeViaInputOTHER: toMeVia,
          tooLongtoMeViaErrorOTHER: true,
          validtoMeViaOTHER: false,
          toMeFinal: false,
        });
      } else {
        this.setState({
          toMeViaInputOTHER: toMeVia,
          validtoMeViaOTHER: false,
          toMeFinal: false,
        });
      }
    }
  };
  //toMeHandle ***
  toMeHandleValidate = (toMeHandle) => {
    let regex = /^\S{1,32}\S$/;
    let valid = regex.test(toMeHandle);

    if (valid) {
      this.setState(
        {
          toMeHandleInput: toMeHandle,
          tooLongtoMeHandleError: false,
          validtoMeHandle: true,
          ////set false unless hits a success full case
          toMeFinal: false,
        },
        () => this.verifyOrigi()
      );
    } else {
      if (toMeHandle.length > 34) {
        this.setState({
          toMeHandleInput: toMeHandle,
          tooLongtoMeHandleError: true,
          validtoMeHandle: false,
          toMeFinal: false,
        });
      } else {
        this.setState({
          toMeHandleInput: toMeHandle,
          validtoMeHandle: false,
          toMeFinal: false,
        });
      }
    }
  };

  toMeAddrValidate = (toMeAddr) => {
    let regex; // = /^[Xy][\S]{33}$/;

    if (this.props.whichNetwork === "testnet") {
      regex = /^[y][\S]{33}$/;
    } else {
      regex = /^[X][\S]{33}$/;
    }
    let valid = regex.test(toMeAddr);

    if (valid) {
      this.setState(
        {
          toMeAddrInput: toMeAddr,
          tooLongtoMeAddrError: false,
          validtoMeAddr: true,
          ////set false unless hits a success full case
          toMeFinal: false,
        },
        () => this.verifyOrigi()
      );
    } else {
      if (toMeAddr.length > 34) {
        this.setState({
          toMeAddrInput: toMeAddr,
          tooLongtoMeAddrError: true,
          validtoMeAddr: false,
          toMeFinal: false,
        });
      } else {
        this.setState({
          toMeAddrInput: toMeAddr,
          validtoMeAddr: false,
          toMeFinal: false,
        });
      }
    }
  };
  //
  //
  // toU ***
  toUValidate = (toU) => {
    let regex = /^\S.{0,32}\S$/;
    let valid = regex.test(toU);

    if (valid) {
      this.setState(
        {
          toUInput: toU,
          tooLongtoUError: false,
          validtoU: true,

          toUFinal: false,

          //Must reset other inputs if change above one.
          toUViaInput: "",
          validtoUVia: false,

          toUViaInputOTHER: "",
          validtoUViaOTHER: false,
        },
        () => this.verifyRecip()
      );
    } else {
      if (toU.length > 34) {
        this.setState({
          toUInput: toU,
          tooLongtoUError: true,
          validtoU: false,
          toUFinal: false,
        });
      } else {
        this.setState({
          toUInput: toU,
          validtoU: false,
          toUFinal: false,
        });
      }
    }
  };

  toUValidateOTHER = (toU) => {
    let regex = /^\S.{0,32}\S$/;
    let valid = regex.test(toU);

    if (valid) {
      this.setState(
        {
          toUInputOTHER: toU,
          tooLongtoUErrorOTHER: false,
          validtoUOTHER: true,
          ////set false unless hits a success full case
          toUFinal: false,
        },
        () => this.verifyRecip()
      );
    } else {
      if (toU.length > 34) {
        this.setState({
          toUInputOTHER: toU,
          tooLongtoUErrorOTHER: true,
          validtoUOTHER: false,
          toUFinal: false,
        });
      } else {
        this.setState({
          toUInputOTHER: toU,
          validtoUOTHER: false,
          toUFinal: false,
        });
      }
    }
  };
  //toUVia ***
  toUViaValidate = (toUVia) => {
    let regex = /^\S.{0,32}\S$/;
    let valid = regex.test(toUVia);

    if (valid) {
      this.setState(
        {
          toUViaInput: toUVia,
          tooLongtoUViaError: false,
          validtoUVia: true,

          //Must reset other inputs if change above one.
          toUViaInputOTHER: "",
          tooLongtoUViaErrorOTHER: false,
          validtoUViaOTHER: false,
          ////set false unless hits a success full case
          toUFinal: false,
        },
        () => this.verifyRecip()
      );
    } else {
      if (toUVia.length > 34) {
        this.setState({
          toUViaInput: toUVia,
          tooLongtoUViaError: true,
          validtoUVia: false,
          toUFinal: false,
        });
      } else {
        this.setState({
          toUViaInput: toUVia,
          validtoUVia: false,
          toUFinal: false,
        });
      }
    }
  };

  // toUViaDashValidate = (toUVia) => {
  //   let regex = /^\S.{0,32}\S$/;
  //   let valid = regex.test(toUVia);

  //   if (valid) {
  //     this.setState(
  //       {
  //         toUViaInput: toUVia,
  //         tooLongtoUViaError: false,
  //         validtoUVia: true,
  //         ////set false unless hits a success full case
  //         toUFinal: false,
  //       },
  //       () => this.verifyRecip()
  //     );
  //   } else {
  //     if (toUVia.length > 34) {
  //       this.setState({
  //         toUViaInput: toUVia,
  //         tooLongtoUViaError: true,
  //         validtoUVia: false,
  //         toUFinal: false,
  //       });
  //     } else {
  //       this.setState({
  //         toUViaInput: toUVia,
  //         validtoUVia: false,
  //         toUFinal: false,
  //       });
  //     }
  //   }
  // };

  toUViaValidateOTHER = (toUVia) => {
    let regex = /^\S.{0,32}\S$/;
    let valid = regex.test(toUVia);

    if (valid) {
      this.setState(
        {
          toUViaInputOTHER: toUVia,
          tooLongtoUViaErrorOTHER: false,
          validtoUViaOTHER: true,
          ////set false unless hits a success full case
          toUFinal: false,
        },
        () => this.verifyRecip()
      );
    } else {
      if (toUVia.length > 34) {
        this.setState({
          toUViaInputOTHER: toUVia,
          tooLongtoUViaErrorOTHER: true,
          validtoUViaOTHER: false,
          toUFinal: false,
        });
      } else {
        this.setState({
          toUViaInputOTHER: toUVia,
          validtoUViaOTHER: false,
          toUFinal: false,
        });
      }
    }
  };
  //
  //

  exRateValidate = (numberInput) => {
    //console.log(typeof numberInput);

    let regex = /^\d{0,10}[.,]\d{2}$/; //  /^\d{1,12}[.,]\d{2}$/

    //let regex = /(^[0-9]+[.,]{0,1}[0-9]{0,5}$)|(^[.,][0-9]{1,5}$)/;
    //CHANGED TO LIMIT TO minimum mDash possible
    //let regex = /(^[0-9]+[.,]{0,1}[0-9]*$)|(^[.,][0-9]+$)/;

    let valid = regex.test(numberInput);

    if (valid) {
      this.setState(
        {
          exRateInput: numberInput.replace(/[.,]/g, ""),
          validexRate: true,
        } //,() => console.log(this.state.exRateInput)
      );
    } else {
      this.setState({
        //exRateInput: numberInput,
        validexRate: false,
      });
    }
  };

  calcValidate = (numberInput) => {
    //console.log(this.props.accountBalance);

    let regex = /^\d{0,10}[.]\d{3}$/;

    //let regex = /(^[0-9]+[.,]{0,1}[0-9]{0,5}$)|(^[.,][0-9]{1,5}$)/;
    //CHANGED TO LIMIT TO minimum mDash possible
    //let regex = /(^[0-9]+[.,]{0,1}[0-9]*$)|(^[.,][0-9]+$)/;

    let valid = regex.test(numberInput);

    //MAX SPENDABLE IS 10000 DASH
    if (valid) {
      this.setState({
        calcInput: numberInput.replace(/[.,]/g, ""),
      });
    } else {
      this.setState({
        calcInput: 0,
      });
    }
  };

  minAmtValidate = (numberInput) => {
    //console.log(this.props.accountBalance);

    let regex = /^\d{0,10}[.,]\d{2}$/;

    //let regex = /(^[0-9]+[.,]{0,1}[0-9]{0,5}$)|(^[.,][0-9]{1,5}$)/;
    //CHANGED TO LIMIT TO minimum mDash possible
    //let regex = /(^[0-9]+[.,]{0,1}[0-9]*$)|(^[.,][0-9]+$)/;

    let valid = regex.test(numberInput);

    //MAX SPENDABLE IS 10000 DASH
    if (valid) {
      this.setState({
        minAmtInput: numberInput.replace(/[.,]/g, ""),
        validminAmt: true,
      });
    } else {
      this.setState({
        // minAmtInput: numberInput,
        validminAmt: false,
      });
    }
  };

  maxAmtValidate = (numberInput) => {
    console.log(typeof numberInput);
    let regex = /^\d{0,10}[.,]\d{2}$/;

    //let regex = /(^[0-9]+[.,]{0,1}[0-9]{0,5}$)|(^[.,][0-9]{1,5}$)/;
    //CHANGED TO LIMIT TO maximum mDash possible
    //let regex = /(^[0-9]+[.,]{0,1}[0-9]*$)|(^[.,][0-9]+$)/;

    let valid = regex.test(numberInput);

    //MAX SPENDABLE IS 10000 DASH
    if (valid) {
      this.setState({
        maxAmtInput: numberInput.replace(/[.,]/g, ""),
        validmaxAmt: true,
      });
    } else {
      this.setState({
        // maxAmtInput: numberInput,
        validmaxAmt: false,
      });
    }
  };

  instructionValidate = (instruction) => {
    //see BELOW
    //let regex = /^.[\S\s]{0,499}$/; //CHECK OUT OF THE OTHERS -> Why did I add the . ?

    let regex1 = /^.[\S\s]{0,499}$/;

    let valid1 = regex1.test(instruction);

    let regex2 = /^(?:[^\r\n]*(?:\r\n?|\n)){0,6}[^\r\n]*$/;

    let valid2 = regex2.test(instruction);

    // if (valid1 && valid2) {
    //   valid = true;
    // }

    // let valid = regex.test(instruction);

    if (valid1 && valid2) {
      this.setState({
        instructionInput: instruction,
        validinstruction: true,
        tooLonginstructionError: false,
      });
    } else {
      if (instruction.length > 500 || !valid2) {
        this.setState({
          instructionInput: instruction,
          validinstruction: false,
          tooLonginstructionError: true,
        });
      } else {
        this.setState({
          instructionInput: instruction,
          validinstruction: false,
        });
      }
    }
  };

  handleSubmitClick = (event) => {
    event.preventDefault();
    // console.log(event.target.event);

    // console.log(this.state.instructionInput);

    //CHANGE TO NEWOFFER AND SET THE LOWERCASE HERE! -> ?
    let newOffer;

    newOffer = {
      toMe: this.state.toMe4Doc.toLocaleUpperCase(),
      toMeVia: this.state.toMeVia4Doc.toLocaleLowerCase(),
      toMeHandle: this.state.toMeHandle4Doc,
      toU: this.state.toU4Doc.toLocaleUpperCase(),
      toUVia: this.state.toUVia4Doc.toLocaleLowerCase(),
      // toUHandle  <- Not a thing
      exRate: Number(this.state.exRateInput),
      instruction: this.state.instructionInput,
      minAmt: Number(this.state.minAmtInput),
      maxAmt: Number(this.state.maxAmtInput),
      active: this.state.offerActive,
      myStore: false,
    };

    // console.log(newOffer);

    this.props.createYourOffer(newOffer);
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

    let cardBkg;
    let cardText;

    if (this.props.mode === "primary") {
      cardBkg = "white";
      cardText = "dark";
    } else {
      cardBkg = "dark";
      cardText = "white";
    }

    let minMax = true;

    if (Number(this.state.minAmtInput) > Number(this.state.maxAmtInput)) {
      minMax = false;
    }

    let calcAmt = (this.state.calcInput * this.state.exRateInput * 0.00001) //.001 for Dash conversion and .01 for fiat conversion
      .toFixed(2);

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
                <b>Create an Offer</b>
              </h3>
            </Modal.Title>
            {closeButtonColor}
          </Modal.Header>

          {/* <div className="BottomBorder" style={{ paddingTop: ".5rem" }}></div> */}

          <Modal.Body>
            <h4 style={{ marginBottom: ".5rem" }}>
              <b>Offer Originator(You):</b>
            </h4>

            <Form
              noValidate
              onSubmit={this.handleSubmitClick}
              onChange={this.onChange}
            >
              {/* toMe FORM BELOW */}
              <Form.Group className="mb-3" controlId="formtoMe">
                <Row>
                  <Col>
                    <h5 style={{ marginTop: ".2rem", marginBottom: ".2rem" }}>
                      Send to you:
                    </h5>
                    {this.state.toMeInput === "Other" ? (
                      <>
                        <p className="smallertext">
                          (e.g. CHF, AUD, GBP, MXN, or INR)
                        </p>
                      </>
                    ) : (
                      <></>
                    )}
                  </Col>
                  <Col>
                    <Form.Select
                      aria-label="Default select example"
                      isValid={
                        this.state.validtoMe && this.state.toMeInput !== "Other"
                      }
                    >
                      <option value="">Options</option>
                      <option value="USD">Dollars(USD)</option>
                      <option value="EUR">Euro(EUR)</option>
                      <option value="Dash">Dash</option>
                      <option value="Other">Other</option>
                    </Form.Select>

                    {this.state.toMeInput === "Other" ? (
                      <>
                        <Form.Group //className="mb-3"
                          controlId="formtoMeOTHER"
                        >
                          <Form.Control
                            type="text"
                            placeholder="Enter option"
                            required
                            isInvalid={this.state.tooLongtoMeErrorOTHER}
                            isValid={this.state.validtoMeOTHER}
                          />

                          <Form.Control.Feedback
                            className="mt-1"
                            type="invalid"
                          >
                            Option is too long.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </>
                    ) : (
                      <></>
                    )}
                  </Col>
                </Row>
              </Form.Group>
              {this.state.validtoMe ? (
                <>
                  {" "}
                  {/* toMeVia FORM BELOW */}
                  <Row>
                    <Col>
                      <h5 style={{ marginTop: ".2rem", marginBottom: ".2rem" }}>
                        Send via:
                      </h5>
                    </Col>
                    <Col>
                      {this.state.toMeInput === "Dash" ? (
                        <>
                          <Form.Group //className="mb-3"
                            controlId="formtoMeViaDash"
                          >
                            <Form.Select
                              aria-label="Default select example"
                              isValid={
                                this.state.validtoMeVia &&
                                this.state.toMeViaInput !== "Other"
                              }
                            >
                              <option value="">Options</option>
                              <option value="PaytoName">Pay-to-Name</option>
                              <option value="Address">Address</option>
                            </Form.Select>
                          </Form.Group>
                        </>
                      ) : (
                        <></>
                      )}
                      {this.state.toMeInput !== "Dash" ? (
                        <>
                          <Form.Group //className="mb-3"
                            controlId="formtoMeVia"
                          >
                            <Form.Select
                              aria-label="Default select example"
                              isValid={
                                this.state.validtoMeVia &&
                                this.state.toMeViaInput !== "Other"
                              }
                            >
                              <option value="">Options</option>
                              <option value="Venmo">Venmo</option>
                              <option value="Zelle">Zelle</option>
                              <option value="Paypal">PayPal</option>
                              <option value="Cashapp">Cash App</option>
                              <option value="Other">Other</option>
                            </Form.Select>
                          </Form.Group>
                        </>
                      ) : (
                        <></>
                      )}

                      {this.state.toMeViaInput === "Other" &&
                      this.state.toMeInput !== "Dash" ? (
                        <>
                          <Form.Group //className="mb-3"
                            controlId="formtoMeViaOTHER"
                          >
                            <Form.Control
                              type="text"
                              placeholder="Enter option"
                              required
                              isInvalid={this.state.tooLongtoMeViaErrorOTHER}
                              isValid={this.state.validtoMeViaOTHER}
                            />
                            <Form.Control.Feedback
                              className="mt-1"
                              type="invalid"
                            >
                              Option is too long.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </>
                      ) : (
                        <></>
                      )}
                    </Col>
                  </Row>
                  {/* <Form.Control.Feedback type="invalid">
                    Option is too long.
                  </Form.Control.Feedback> */}
                  {/* toMeAddr FORM BELOW */}
                  <Row>
                    {this.state.toMeInput === "Dash" &&
                    this.state.toMeViaInput === "Address" ? (
                      <>
                        {" "}
                        <Col>
                          <h5 className="mt-3 mb-3">To your address:</h5>
                        </Col>
                        <Col>
                          <Form.Group
                            className="mt-3 mb-3"
                            controlId="formtoMeAddr"
                          >
                            <Form.Control
                              type="text"
                              placeholder="Enter address"
                              required
                              isInvalid={this.state.tooLongtoMeAddrError}
                              isValid={this.state.validtoMeAddr}
                            />
                            <p></p>
                            <Form.Control.Feedback type="invalid">
                              Address is too long.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </>
                    ) : (
                      <></>
                    )}

                    {this.state.toMeInput === "Dash" &&
                    this.state.toMeViaInput === "PaytoName" ? (
                      <>
                        {" "}
                        <Col>
                          <h5 className="mt-3 mb-3">To your name:</h5>
                        </Col>
                        <Col>
                          <h5 className="mt-3 mb-3">
                            <b>Bob</b>
                            {/* this.props.uniqueName */}
                          </h5>
                        </Col>
                      </>
                    ) : (
                      <></>
                    )}
                    {/* toMeHandle FORM BELOW */}
                    {this.state.toMeInput !== "Dash" ? (
                      <>
                        {" "}
                        <Col>
                          <h5 className="mt-3 mb-3">To your handle:</h5>
                        </Col>
                        <Col>
                          <Form.Group
                            className="mt-3 mb-3"
                            controlId="formtoMeHandle"
                          >
                            <Form.Control
                              type="text"
                              placeholder="e.g. Bob-007"
                              required
                              isInvalid={this.state.tooLongtoMeHandleError}
                              isValid={this.state.validtoMeHandle}
                            />
                            <p></p>
                            <Form.Control.Feedback type="invalid">
                              Handle is too long.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </>
                    ) : (
                      <></>
                    )}
                  </Row>
                </>
              ) : (
                <></>
              )}

              {this.state.toMeFinal ? (
                <>
                  {" "}
                  <p
                    className="smallertext"
                    style={{ color: "green", padding: "0.2rem" }}
                  >
                    Payment option acceptable.
                  </p>
                </>
              ) : (
                <></>
              )}

              <h4 style={{ marginBottom: ".5rem", marginTop: ".5rem" }}>
                <b>Offer Receipient:</b>
              </h4>

              {/* toU FORM BELOW */}

              <Row>
                <Col>
                  <h5 style={{ marginTop: ".2rem", marginBottom: ".2rem" }}>
                    Receives:
                  </h5>
                  {this.state.toUInput === "Other" ? (
                    <>
                      <p className="smallertext">
                        (e.g. CHF, AUD, GBP, MXN, or INR)
                      </p>
                    </>
                  ) : (
                    <></>
                  )}
                </Col>

                <Col>
                  <Form.Group //className="mb-3"
                    controlId="formtoU"
                  >
                    <Form.Select
                      aria-label="Default select example"
                      isValid={
                        this.state.validtoU && this.state.toUInput !== "Other"
                      }
                    >
                      <option value="">Options</option>
                      <option value="USD">Dollars(USD)</option>
                      <option value="EUR">Euro(EUR)</option>
                      <option value="Dash">Dash</option>
                      <option value="Other">Other</option>
                    </Form.Select>
                  </Form.Group>
                  {this.state.toUInput === "Other" ? (
                    <>
                      <Form.Group //className="mb-3"
                        controlId="formtoUOTHER"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Enter option"
                          required
                          isInvalid={this.state.tooLongtoUErrorOTHER}
                          isValid={this.state.validtoUOTHER}
                        />

                        <Form.Control.Feedback className="mt-1" type="invalid">
                          Option is too long.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </>
                  ) : (
                    <></>
                  )}
                </Col>
              </Row>
              {/*  */}
              {this.state.validtoU ? (
                <>
                  {" "}
                  {/* toUVia FORM BELOW */}
                  <Row style={{ marginTop: "1.2rem" }}>
                    <Col>
                      <h5 style={{ marginTop: ".2rem", marginBottom: ".2rem" }}>
                        Receives via:
                      </h5>
                    </Col>
                    <Col>
                      {this.state.toUInput === "Dash" ? (
                        <>
                          {/* <Form.Group //className="mb-3"
                            controlId="formtoUViaDash"
                          >
                            <Form.Select
                              aria-label="Default select example"
                              isValid={
                                this.state.validtoUVia &&
                                this.state.toUViaInput !== "Other"
                              }
                            >
                              <option value="">Options</option>
                              <option value="PaytoName">Pay-to-Name</option>
                              <option value="Address">Address</option>
                            </Form.Select>
                          </Form.Group> */}
                          <>
                            {" "}
                            {/* <h5 className="mt-3 mb-3">To either:</h5> */}
                            <h5 className="mt-1 mb-1">
                              <b>Address or Pay-to-Name</b>
                            </h5>
                          </>
                        </>
                      ) : (
                        <></>
                      )}
                      {this.state.toUInput !== "Dash" ? (
                        <>
                          <Form.Group //className="mb-3"
                            controlId="formtoUVia"
                          >
                            <Form.Select
                              aria-label="Default select example"
                              isValid={
                                this.state.validtoUVia &&
                                this.state.toUViaInput !== "Other"
                              }
                            >
                              <option value="">Options</option>
                              <option value="Venmo">Venmo</option>
                              <option value="Zelle">Zelle</option>
                              <option value="Paypal">PayPal</option>
                              <option value="CashApp">Cash App</option>
                              <option value="Other">Other</option>
                            </Form.Select>
                          </Form.Group>
                        </>
                      ) : (
                        <></>
                      )}

                      {this.state.toUViaInput === "Other" &&
                      this.state.toUInput !== "Dash" ? (
                        <>
                          <Form.Group //className="mb-3"
                            controlId="formtoUViaOTHER"
                          >
                            <Form.Control
                              type="text"
                              placeholder="Enter option"
                              required
                              isInvalid={this.state.tooLongtoUViaErrorOTHER}
                              isValid={this.state.validtoUViaOTHER}
                            />
                            <Form.Control.Feedback
                              className="mt-1"
                              type="invalid"
                            >
                              Option is too long.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </>
                      ) : (
                        <></>
                      )}
                    </Col>
                  </Row>
                </>
              ) : (
                <></>
              )}

              {this.state.toUFinal ? (
                <>
                  {" "}
                  <p
                    className="smallertext"
                    style={{ color: "green", padding: "0rem" }}
                  >
                    Payment option acceptable.
                  </p>
                </>
              ) : (
                <>
                  <p></p>
                </>
              )}

              {this.state.toMeInput === "Dash" ||
              this.state.toMeInput === "" ||
              this.state.toUInput === "Dash" ||
              this.state.toUInput === "" ? (
                <></>
              ) : (
                <>
                  {" "}
                  <p className="smallertext" style={{ color: "red" }}>
                    One of the options should be Dash. But.. You can do what you
                    want.
                  </p>
                </>
              )}

              {this.state.toMeInput === "Dash" &&
              this.state.toUInput === "Dash" ? (
                <>
                  {" "}
                  <p className="smallertext" style={{ color: "red" }}>
                    Only one of the options should be Dash. But.. It could be a
                    good way to test if a user is viable as Dash spends
                    instantly, and you can send really small amounts.
                  </p>
                </>
              ) : (
                <></>
              )}

              {/*  EXRATE FORM BELOW */}

              <Form.Group className="mb-3" controlId="formexRate">
                <Form.Label>
                  <h4 style={{ marginTop: ".2rem", marginBottom: ".2rem" }}>
                    Exchange Rate (Fiat/Dash)
                  </h4>
                </Form.Label>

                <Form.Control
                  type="text"
                  placeholder="30.01 For example.."
                  required
                  isValid={this.state.validexRate}
                  //isInvalid={!this.state.validexRate}
                />
                <p className="smallertext">
                  (i.e. Must include 2 decimal precision)
                </p>
              </Form.Group>
              {/*  */}
              {/* {this.state.validexRate ? (
                <>
                  <Card
                    bg={cardBkg}
                    text={cardText}
                    style={{ border: "solid 2px white", padding: ".2rem" }}
                  >
                    <Form.Group className="mb-1" controlId="formCalc">
                      <Form.Label>
                        <h5
                          style={{ marginTop: ".2rem", marginBottom: "0rem" }}
                        >
                          Rate Calculator
                        </h5>
                      </Form.Label>
                      <Row>
                        <Col>
                          <Form.Control
                            type="number"
                            placeholder="Amount(Dash)"
                            required
                            //isValid={this.state.validminAmt}
                            // isInvalid={!this.state.validminAmt}
                          />
                        </Col>
                        <Col>
                          <h5 className="mt-1">
                            <b>Dash x Rate =</b>
                          </h5>
                        </Col>
                      </Row>
                    </Form.Group>
                    <p className="smallertext">
                      (i.e. Must include 3 decimal precision)
                    </p>

                    <h5 style={{ paddingLeft: "2rem" }}>
                      <b> = {calcAmt} (fiat)</b>
                    </h5>
                  </Card>
                </>
              ) : (
                <></>
              )} */}

              {/*  MINAMT FORM BELOW */}

              <Form.Group className="mb-2" controlId="formminAmt">
                <Form.Label>
                  <h6 style={{ marginTop: ".2rem", marginBottom: ".1rem" }}>
                    Minimum per Exchange(Fiat)
                  </h6>
                </Form.Label>

                <Form.Control
                  type="text"
                  placeholder="1.00 For example.."
                  required
                  isValid={this.state.validminAmt}
                  //isInvalid={!this.state.validminAmt}
                />
                <p className="smallertext">
                  (i.e. Must include 2 decimal precision)
                </p>
              </Form.Group>

              {/*  MAXAMT FORM BELOW */}

              <Form.Group className="mb-3" controlId="formmaxAmt">
                <Form.Label>
                  <h6 style={{ marginTop: ".2rem", marginBottom: ".1rem" }}>
                    Maximum per Exchange(Fiat)
                  </h6>
                </Form.Label>

                <Form.Control
                  type="text"
                  placeholder="1000.00 For example.."
                  required
                  isValid={this.state.validmaxAmt}
                  // isInvalid={!this.state.validmaxAmt}
                />
                <p className="smallertext">
                  (i.e. Must include 2 decimal precision)
                </p>
              </Form.Group>

              {minMax ? (
                <></>
              ) : (
                <>
                  {" "}
                  <p className="smallertext" style={{ color: "red" }}>
                    Minimum must be equal or less than maximum.
                  </p>
                </>
              )}

              {/* POST DESCRIPTION FORM BELOW */}

              <Form.Group className="mb-3" controlId="forminstruction">
                <Form.Label>
                  <h5 style={{ marginTop: ".2rem", marginBottom: ".2rem" }}>
                    Instructions
                  </h5>
                </Form.Label>
                <Form.Control
                  style={{ whiteSpace: "pre-wrap" }}
                  onChange={this.onChange}
                  as="textarea"
                  rows={3}
                  placeholder="Put instructions here.."
                  required
                  isInvalid={this.state.tooLonginstructionError}
                  isValid={this.state.validinstruction}
                />
                <p></p>
                Instructions can include things like:
                <ul>
                  <li>Send (DM) Message to me prior to pay.</li>
                  <li>Check out Group (GroupName) to ask you questions.</li>
                  {/* , or Go to
                    my store and place order */}
                  <li>
                    IMPORTANT: Ensure you spell your receiving handle correctly
                    if you are getting fiat.
                  </li>
                  <li>
                    IMPORTANT: Include 'Your Handle' in payment message, else
                    how will I send to you?
                  </li>
                  <li>Please wait up to 12 hours. I may be asleep</li>
                  <li>Best time to send is 1:00 PM UTC.</li>
                </ul>
                {this.state.tooLongDescriptionError ? (
                  <Form.Control.Feedback className="floatLeft" type="invalid">
                    Sorry, this is too long.
                  </Form.Control.Feedback>
                ) : (
                  <></>
                )}
              </Form.Group>

              <Form.Group className="mb-3" id="formGridCheckbox">
                {/* <Form.Label>
                  <b>Is Offer Active?</b>
                </Form.Label> */}
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label={
                    this.state.offerActive ? <b>Active</b> : <b>Inactive</b>
                  }
                  //onChange={() => this.handleActive()}
                />

                <p>
                  <b>Active</b> means people can view the offer when searching.
                </p>
              </Form.Group>

              <div className="ButtonRightNoUnderline">
                <>
                  {this.state.toMeFinal &&
                  this.state.toUFinal &&
                  this.state.validinstruction &&
                  this.state.validexRate &&
                  this.state.validminAmt &&
                  this.state.validmaxAmt &&
                  minMax ? (
                    <Button variant="primary" type="submit">
                      <b>Create Offer</b>
                    </Button>
                  ) : (
                    <Button variant="primary" disabled>
                      <b>Create Offer</b>
                    </Button>
                  )}
                </>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default CreateOfferModal;
