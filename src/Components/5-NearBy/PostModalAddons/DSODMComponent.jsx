import React from "react";
import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";

class DSODMComponent

extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
      messageInput: "",
      tooLongError: false,

    };
  }


  /*
  <DSODMComponent
            whichNetwork={this.state.whichNetwork}
            uniqueName={this.state.uniqueName} // <= Used where?

            DataContractDPNS={this.state.DataContractDPNS}

            submitDSODocument={this.submitDSODocument}

        isModalShowing={this.state.isModalShowing} // <= NOT USED HERE ANYMORE
        hideModal={this.hideModal} // <= NOT USED HERE ANYMORE

            mode={this.state.mode}
            closeTopNav={this.closeTopNav} // <= Used where?
          />
  */

 // the NAMEDOC IS PASSED THE TAG QUERY IS NOT REQUIRED.. 

 //     => ALOT TO CHANGE/SIMPLIFY => 
 //   THERE IS JUST THE MESSAGE THEN..


  formValidate = (messageText) => {

    let regex1 = /^.[\S\s]{0,450}$/; 

    let valid1 = regex1.test(messageText);

    let regex2 = /^(?:[^\r\n]*(?:\r\n?|\n)){0,4}[^\r\n]*$/

    let valid2 = regex2.test(messageText);

    let valid=false;

    if(valid1 && valid2){
      valid = true;
    }

    if (valid) {
      this.setState({
        messageInput: messageText,
        tooLongError: false,
      });
      return true;
    } else {
      if (messageText.length > 450) {
        this.setState({
          tooLongError: true,
        });
      }
      return false;
    }
  };

  
  onChange = (event) => {
    event.preventDefault();
    event.stopPropagation();

    //console.log(event.target.value);
    //this is the message body!!!

    //console.log(taggedNames);
   // console.log('Too few tags: ', this.state.tooFewTagsError);

    this.formValidate(event.target.value)
    

    }

  handleSubmitClick = (event) => {
    event.preventDefault();
   // console.log(event.target.ControlTextarea1.value);

        let  newMessage = {
            //OR JUST PUT TYPE: SO OR DM HERE?
            sh: "dmio", //this just goes to function and not DataContract creation
            msg: `${event.target.ControlTextarea1.value}`,
          };
        
        this.props.submitDSODM(newMessage, [this.props.selectedSearchedPostNameDoc.$ownerId]);
      
  };

  render() {

    return (
      <>
        
            <Form
              noValidate
              onSubmit={this.handleSubmitClick}
               
            >
              <Form.Group className="mb-3" controlId="ControlTextarea1"
              >
                {/* <Form.Label>Example textarea</Form.Label> */}

                <Form.Control
                  onChange={this.onChange}
                  as='textarea'
                  rows={4}
                  placeholder="Write message here.."
                  required
                  isInvalid={this.state.tooLongError}
                />

                {this.state.tooLongError ? (
                <Form.Control.Feedback className="floatLeft" type="invalid">
                Sorry, this is too long! Please use less than 450 characters.
              </Form.Control.Feedback>
                
              ) : (
                <></>
              )}


</Form.Group>
              
            

{             this.state.validityCheck ? (
                  <Button variant="primary" type="submit">
                    Create Message
                  </Button>
                ) : (
                  <></>
                )
              }
               

            </Form>
          
      </>
    );
  }
}

export default DSODMComponent
;
