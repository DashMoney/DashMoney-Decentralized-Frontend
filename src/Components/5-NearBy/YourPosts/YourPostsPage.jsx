import React from 'react';

import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import YourPost from './YourPost';

class YourPostsPage extends React.Component {
  //Dont need a constructor because gets data from app.js this is just to display
  /**
   * 1) So the tabs and credits appear at the top
   * 2) like DGP -> button that says add post
   * 3) 
   */

  render() { 

    let posts = this.props.yourPostsToDisplay.map(
      (post, index) => {  
        //console.log(item);
        return (
          <YourPost
          key={index}
          mode={this.props.mode}
          index={index}
          post = {post}
          handleYourPost={this.props.handleYourPost}
          />
        )
      }
    );
    
    return (
      <>
      <p></p>
      {this.props.isLoadingYourPosts? 
              <>
                
                <div id="spinner">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              </>
             : 
              <>

               <div className="d-grid gap-2" id="button-edge">
            <Button
              variant="primary"
              onClick={() => 
                this.props.showModal("CreatePostModal")
              }
            >
              <b>Create New Post</b>
            </Button>
          </div>
          <p></p>

          {this.props.yourPostsToDisplay.length === 0?
        <>
        <p style={{ textAlign: "center" }}>(This is where your posts will appear)</p>
        
        </>
        :
        <>
         {posts}
        </>
        }

              </>
            }

      </>
    );
  }
}
 
export default YourPostsPage;
