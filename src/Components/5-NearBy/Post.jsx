import React from "react";
import Badge from "react-bootstrap/Badge";
//import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copiedName: false,
    };
  }

  handleNameClick = (nameLabel) => {
    navigator.clipboard.writeText(nameLabel);
    this.setState({
      copiedName: true,
    });
  };

  // handleName = (msgDoc) =>{
  //   if(msgDoc.$ownerId === this.props.identity){
  //   return <span style={{ color: "#008de4" }}>{this.props.uniqueName}</span>
  //   }

  //   //*** *** */
  //     let nameDoc = this.props.PostNames.find(doc => {
  //       return msgDoc.$ownerId === doc.$ownerId
  //     })

  //     if(nameDoc === undefined){
  //       return 'Not Found'
  //     }

  //     return <span style={{ color: "#008de4" }} onClick={() => this.handleNameClick(nameDoc.label)}>
  //       {nameDoc.label}
  //       </span>

  // }

  formatDate(theCreatedAt) {
    let CreatedAt = new Date(theCreatedAt);

    let dateReturn = CreatedAt.toLocaleDateString();

    return dateReturn;
  }

  render() {
    let cardBkg;
    let cardText;

    if (this.props.mode === "primary") {
      cardBkg = "white";
      cardText = "dark";
    } else {
      cardBkg = "dark";
      cardText = "white";
    }

    let nameDocToPass = ""; //this is the nameDoc and not the label

    if (this.props.post.$ownerId === this.props.identity) {
      let myNameDoc = {
        $ownerId: this.props.identity,
        label: this.props.uniqueName,
      };
      nameDocToPass = myNameDoc;
    } else {
      nameDocToPass = this.props.PostNames.find((doc) => {
        return this.props.post.$ownerId === doc.$ownerId;
      });
    }

    //Pass the entire NameDoc!! =>
    // if(nameToPass === undefined){
    //   nameToPass = 'Not Found'
    // }else{
    //   nameToPass = nameToPass.label;
    // }

    return (
      <>
        <Card id="card" key={this.props.index} bg={cardBkg} text={cardText}>
          <Card.Body
            onClick={() =>
              this.props.handleSearchedPost(this.props.post, nameDocToPass)
            }
          >
            <div className="locationTitle" style={{ marginBottom: ".5rem" }}>
              <Badge bg="primary" style={{ marginRight: ".5rem" }}>
                {this.props.post.city}
              </Badge>

              <Badge bg="primary" style={{ marginRight: ".5rem" }}>
                {this.props.post.region}
              </Badge>

              <Badge bg="primary">{this.props.post.country}</Badge>
            </div>

            <Card.Title className="cardTitle">
              {/* {this.handleName(this.props.post)} */}

              <span
                style={{ color: "#008de3" }}
                // onClick={() => this.handleNameClick(nameDocToPass.label)}
              >
                {nameDocToPass.label}
              </span>

              {/* <span>
    {this.state.copiedName?<span>✅</span>:<></>}
    </span> */}

              <span className="textsmaller">
                {this.formatDate(this.props.post.$createdAt)}
              </span>
            </Card.Title>

            <Card.Text style={{ whiteSpace: "pre-wrap" }}>
              {this.props.post.description}
            </Card.Text>

            {this.props.post.date !== undefined &&
            this.props.post.date !== "" ? (
              <p>
                Date: <b>{this.props.post.date}</b>
              </p>
            ) : (
              <></>
            )}

            {this.props.post.time !== undefined &&
            this.props.post.time !== "" ? (
              <p>
                Time: <b>{this.props.post.time}</b>
              </p>
            ) : (
              <></>
            )}
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default Post;
