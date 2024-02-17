import React from "react";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import CloseButton from "react-bootstrap/CloseButton";

import Dash from "dash";

class NewSOModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingNames: false,
      taggedArray: [],
      messageInput: "",
      tooLongError: false,
      tooManyTagsError: false,
      validityAvail: false,
      validityCheck: false,

      retrievedNameLabelArray: [],
      ownerIdsfromTagsRetrieved: [],
    };
  }

  /*
  <NewSOModal
    ADD : whichNetwork -> 
            uniqueName={this.state.uniqueName}
            submitDSODocument={this.submitDSODocument}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            closeExpandedNavs={this.closeExpandedNavs}
          />
  */

  handleCloseClick = () => {
    this.props.hideModal();
  };

  taggedValidate = (taggedInput) => {
    let regex = /[@]{1}[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]/gm;
    //Added the g so returns all tags
    //let regex = /[@]{1}[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]/m;
    //Remove the g so that only returns the first one

    //Accomplishes for Display -> handles if no tags, removes @
    //DOESN'T HANDLE IF NAMES ARE DIFFERNT UPPER OR LOWERCASE -> MaYBE THAT IS OKAY

    let tags = taggedInput.match(regex);

    //console.log(tags);
    if (tags === null) {
      tags = [];
    }

    //if tags is greater than 1 I think will fix
    let names = [];

    if (tags.length >= 1) {
      names = tags.map((tag) => tag.slice(1));
      //console.log(names);
    }

    //This makes sure that only a list of unique names is made.
    let uniqueNames = new Set([...names]);
    //Puts in back to an array
    let nameArray = [...uniqueNames];

    //Still lets through upper/lowercase differences but its okay for now

    return nameArray;
  };

  formValidate = (messageText) => {
    let regex1 = /^.[\S\s]{0,450}$/;

    let valid1 = regex1.test(messageText);

    let regex2 = /^(?:[^\r\n]*(?:\r\n?|\n)){0,4}[^\r\n]*$/;

    let valid2 = regex2.test(messageText);

    let valid = false;

    if (valid1 && valid2) {
      valid = true;
    }

    if (valid && !this.state.tooManyTagsError) {
      //Put tag error here
      this.setState({
        messageInput: messageText,
        tooLongError: false,
      });
      return true;
    } else {
      if (messageText.length > 450 || !valid2) {
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

    let taggedNames = this.taggedValidate(event.target.value);

    if (this.formValidate(event.target.value)) {
      if (taggedNames.length > 10) {
        this.setState({
          validityCheck: true,
          taggedArray: taggedNames,
          tooManyTagsError: true,
        });
      } else {
        this.setState({
          tooManyTagsError: false,
          validityCheck: true,
          taggedArray: taggedNames,
        });
      }
    } else {
      this.setState({
        validityCheck: false,
        taggedArray: taggedNames,
      });
    }
  };

  handleSubmitClick = (event) => {
    event.preventDefault();
    // console.log(event.target.ControlTextarea1.value);

    this.setState({
      isLoadingNames: true,
    });

    if (this.formValidate(event.target.ControlTextarea1.value)) {
      //Accomplishes for Document Creation -> sets lowercase, add author(no) and ensures unique on lowercase

      let names = this.state.taggedArray;

      // names.push(this.props.uniqueName); //Add the author
      // console.log(names);

      names = names.map((tag) => tag.toLowerCase());
      //console.log(names);

      let uniqueNames = new Set([...names]); // ensures unique

      let nameArray = [...uniqueNames]; //Puts in back to an array

      //console.log(nameArray);

      //base58

      let base58NameArray = nameArray.map((name) => {
        let base58Name = name.replace(/l/g, "1");
        base58Name = base58Name.replace(/i/g, "1");
        base58Name = base58Name.replace(/o/g, "0");

        return base58Name;
      });
      console.log(base58NameArray);

      //$$$

      if (
        this.state.taggedArray.length -
          this.state.retrievedNameLabelArray.length ===
          0 &&
        this.checkNamesVersusTags()
      ) {
        let newMessage;

        /*dsomsg ->
      msg, sh, msgId(for reply)  (only first 2 are required)
*/
        newMessage = {
          //OR I COULD JUST PUT TYPE: SO OR DM HERE?
          sh: "out",
          msg: `${event.target.ControlTextarea1.value}`,
        };

        this.props.submitDSODocument(
          newMessage,
          this.state.ownerIdsfromTagsRetrieved
        );
        this.props.hideModal();
      } else {
        //this part will be the retrieving the name labels..

        //START OF NAME RETRIEVAL

        // console.log("Calling getDPNSDocsforNewSOModal");

        const clientOpts = {
          network: this.props.whichNetwork,

          apps: {
            DPNS: {
              //this probably changed!! ->
              contractId: this.props.DataContractDPNS,
            },
          },
        };
        const client = new Dash.Client(clientOpts);

        const getNameDocuments = async () => {
          return client.platform.documents.get("DPNS.domain", {
            where: [
              ["normalizedParentDomainName", "==", "dash"],
              // Return all matching names from the provided array
              ["normalizedLabel", "in", base58NameArray],
            ],
            orderBy: [["normalizedLabel", "asc"]],
          });
        };

        getNameDocuments()
          .then((d) => {
            //WHAT IF THERE ARE NO NAMES?
            if (d.length === 0) {
              // console.log("No DPNS domain documents retrieved.");
            }

            let nameDocArray = [];

            for (const n of d) {
              //console.log("NameDoc:\n", n.toJSON());

              nameDocArray = [n.toJSON(), ...nameDocArray];
            }
            // console.log(`DPNS Name Docs: ${nameDocArray}`);

            let ownerarrayOfOwnerIds = nameDocArray.map((doc) => {
              return doc.$ownerId;
            });

            let retrievedNameLabels = nameDocArray.map((doc) => {
              return doc.label;
            });

            //console.log("Names of Tags!");
            // console.log(retrievedNameLabels);

            this.setState({
              retrievedNameLabelArray: retrievedNameLabels,
              ownerIdsfromTagsRetrieved: ownerarrayOfOwnerIds,
              isLoadingNames: false,
            });
          })
          .catch((e) => {
            console.error("Something went wrong:\n", e);
          });
        //END OF NAME RETRIEVAL
      }
    } else {
      console.log("Invalid Message");
    }
  };

  checkNamesVersusTags = () => {
    if (
      this.state.taggedArray.length !== 0 &&
      this.state.retrievedNameLabelArray.length !== 0
    ) {
      let lowerCaseRetrieved = this.state.retrievedNameLabelArray.map((name) =>
        name.toLowerCase()
      );

      return this.state.taggedArray.every((tag) => {
        let normalizedTag = tag.toLowerCase();
        // normalizedTag = normalizedTag.replace(/l/g, '1');
        // normalizedTag = normalizedTag.replace(/i/g, '1');
        // normalizedTag = normalizedTag.replace(/o/g, '0');

        return lowerCaseRetrieved.find((name) => name === normalizedTag);
      });
    } else {
      return true;
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

    //Fix the rendering of the Tagged names here
    let namesToDisplay = "";
    if (this.state.taggedArray.length >= 1) {
      namesToDisplay = "";
      this.state.taggedArray.forEach((name) => (namesToDisplay += " " + name));
    }

    //Fix the rendering of the names labels here
    let labelsToDisplay = "";
    if (this.state.retrievedNameLabelArray.length >= 1) {
      labelsToDisplay = "";
      this.state.retrievedNameLabelArray.forEach(
        (label) => (labelsToDisplay += " " + label)
      );
    }

    return (
      <>
        <Modal
          show={this.props.isModalShowing}
          backdropClassName={modalBackdrop}
          contentClassName={modalBkg}
        >
          <Modal.Header>
            <Modal.Title>
              <h3>
                <b> Shout Out Message</b>
                {/* <b>New Message</b> */}
              </h3>
            </Modal.Title>
            {closeButtonColor}
          </Modal.Header>
          <Modal.Body>
            <Form noValidate onSubmit={this.handleSubmitClick}>
              <Form.Group className="mb-3" controlId="ControlTextarea1">
                {/* <Form.Label>Example textarea</Form.Label> */}

                <Form.Control
                  onChange={this.onChange}
                  as="textarea"
                  rows={4}
                  placeholder="Write message here.."
                  required
                  isInvalid={
                    this.state.tooLongError ||
                    this.state.tooManyTagsError ||
                    (this.state.taggedArray !== 0 &&
                      this.state.retrievedNameLabelArray.length !==
                        this.state.taggedArray.length)
                  }
                />

                {this.state.tooLongError ? (
                  <Form.Control.Feedback className="floatLeft" type="invalid">
                    Sorry, this is too long! Please use less than 450
                    characters.
                  </Form.Control.Feedback>
                ) : (
                  <></>
                )}

                {this.state.tooManyTagsError ? (
                  <Form.Control.Feedback className="floatLeft" type="invalid">
                    Sorry, too many tags! Please use no more than 10 tags.
                  </Form.Control.Feedback>
                ) : (
                  <></>
                )}

                {/* {this.state.taggedArray !== 0 &&
                this.state.retrievedNameLabelArray.length !==
                  this.state.taggedArray.length ? (
                  <Form.Control.Feedback className="floatLeft" type="invalid">
                    Please use <b>Verify Tags</b> below, to ensure there is a Dash Name that matches before sending.
                  </Form.Control.Feedback>
                ) : (
                  <></>
                )} */}

                {this.state.taggedArray.length < 1 ? (
                  <div>
                    <p></p>
                    <div>Add @Name to tag another user.</div>
                  </div>
                ) : (
                  <div>
                    <p></p>
                    <b>Tags: </b>
                    {namesToDisplay}
                  </div>
                )}

                {this.state.retrievedNameLabelArray.length < 1 ? (
                  <></>
                ) : (
                  <>
                    <div>
                      <b>Dash Names: </b>
                      {labelsToDisplay}
                    </div>
                  </>
                )}

                {this.state.isLoadingNames ? (
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
              </Form.Group>

              {this.state.taggedArray.length -
                this.state.retrievedNameLabelArray.length ===
                0 && this.checkNamesVersusTags() ? (
                this.state.validityCheck ? (
                  <Button variant="primary" type="submit">
                    Create Message
                  </Button>
                ) : (
                  <Button variant="primary" disabled type="submit">
                    Create Message
                  </Button>
                )
              ) : this.state.validityCheck ? (
                <Button variant="primary" type="submit">
                  Verify Tags
                </Button>
              ) : (
                <Button variant="primary" disabled type="submit">
                  Verify Tags
                </Button>
              )}
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default NewSOModal;
