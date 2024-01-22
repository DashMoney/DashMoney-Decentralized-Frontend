import React from "react";
import Card from "react-bootstrap/Card";

class GroupMsg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copiedName: false,
    };
  }

  handleNameClick = () => {
    navigator.clipboard.writeText(`${this.props.msg[0]}`);
    this.setState({
      copiedName: true,
    });
  };

  getRelativeTimeAgo(messageTime, timeNow) {
    //timeStamp: 2546075019551 - Date.now(), -> this is how I make the time for the DSO document

    //How do I make he adjustments....
    //So the messageTime is the time Stamp
    // So messageTime = 2546075019551 - Time of message
    //So I want Time of message
    //There4 TOM = 2546075019551 - timeStamp -> okay

    let timeOfMessage = 2546075019551 - messageTime;

    let timeDifference = timeNow - timeOfMessage;

    if (timeDifference >= 84600000) {
      let longFormDate = new Date();
      longFormDate.setTime(timeOfMessage);
      return longFormDate.toLocaleDateString();
    }

    /*
    Calculate milliseconds in a year
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const year = day * 365;
    */

    if (timeDifference < 15000) {
      return "Just now";
    } else if (timeDifference < 44000) {
      return "A few moments ago";
    } else if (timeDifference < 90000) {
      return "1 minute ago";
    } else if (timeDifference < 150000) {
      return "2 minutes ago";
    } else if (timeDifference < 210000) {
      return "3 minutes ago";
    } else if (timeDifference < 270000) {
      return "4 minutes ago";
    } else if (timeDifference < 330000) {
      return "5 minutes ago";
    } else if (timeDifference < 390000) {
      return "6 minutes ago";
    } else if (timeDifference < 450000) {
      return "7 minutes ago";
    } else if (timeDifference < 510000) {
      return "8 minutes ago";
    } else if (timeDifference < 570000) {
      return "9 minutes ago";
    } else if (timeDifference < 660000) {
      return "10 minutes ago";
    } else if (timeDifference < 840000) {
      return "12 minutes ago";
    } else if (timeDifference < 1020000) {
      return "15 minutes ago";
    } else if (timeDifference < 1140000) {
      return "18 minutes ago";
    } else if (timeDifference < 1380000) {
      return "20 minutes ago";
    } else if (timeDifference < 1650000) {
      return "25 minutes ago";
    } else if (timeDifference < 1950000) {
      return "30 minutes ago";
    } else if (timeDifference < 2250000) {
      return "35 minutes ago";
    } else if (timeDifference < 2550000) {
      return "40 minutes ago";
    } else if (timeDifference < 3000000) {
      return "45 minutes ago";
    } else if (timeDifference < 5400000) {
      return "1 hour ago";
    } else if (timeDifference < 9000000) {
      return "2 hours ago";
    } else if (timeDifference < 12600000) {
      return "3 hours ago";
    } else if (timeDifference < 18000000) {
      return "A few hours ago";
    } else if (timeDifference < 43200000) {
      return "Several hours ago";
    } else if (timeDifference < 84600000) {
      return "Less than a day ago";
    }
  }

  formatDate(theCreatedAt, today, yesterday) {
    let CreatedAt = new Date(theCreatedAt);

    const timeOptions = {
      hour: "numeric",
      minute: "2-digit", //numeric?
    };

    function isSameDay(date1, date2) {
      return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
      );
    }

    if (isSameDay(CreatedAt, today)) {
      // it's today
      return `Today at ${CreatedAt.toLocaleTimeString(undefined, timeOptions)}`;
    }

    if (isSameDay(CreatedAt, yesterday)) {
      // it was yesterday
      return `Yesterday at ${CreatedAt.toLocaleTimeString(
        undefined,
        timeOptions
      )}`;
    }
    let dateReturn = CreatedAt.toLocaleDateString().concat(
      "  ",
      CreatedAt.toLocaleTimeString(undefined, timeOptions)
    );
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

    return (
      <Card id="card" key={this.props.index} bg={cardBkg} text={cardText}>
        <Card.Body>
          <Card.Title className="cardTitle">
            {this.props.uniqueName === this.props.msg[0] ? (
              <span style={{ color: "#008de4" }}>{this.props.msg[0]}</span>
            ) : (
              <>
                <span onClick={() => this.handleNameClick()}>
                  {this.props.msg[0]}
                </span>
                <span>{this.state.copiedName ? <span>✅</span> : <></>}</span>
              </>
            )}
            <span className="textsmaller">
              {this.getRelativeTimeAgo(
                this.props.msg[1].timeStamp,
                this.props.date
              )}
            </span>
          </Card.Title>

          <Card.Text>{this.props.msg[1].message}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default GroupMsg;
