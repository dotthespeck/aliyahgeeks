import React from 'react';
import { connect } from 'react-redux';
import { loggedIn, getPost } from '../../actions/UserActions';
//import { draftToMarkdown } from 'markdown-draft-js';
import { convertToRaw, convertFromRaw } from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';

class ViewPost extends React.Component {
  componentDidMount(){
    this.props.loggedIn();
    this.props.getPost();
  }
  render() {
    // let rawDraftContentState = 
    //   this.props.post !== undefined && this.props.post.length !== 0 ?
    //   JSON.stringify( convertToRaw(this.props.post.post.draft_json) ) : null

    //   console.log(rawDraftContentState)
    // let rawDraft = 
    //   this.props.post !== undefined && this.props.post.length !== 0 ?
    //   convertToRaw( JSON.parse( rawDraftContentState) ) : null

    let html = 
      this.props.post !== undefined && this.props.post.length !== 0 ?
        stateToHTML(this.props.editorState.getCurrentContent()) : null
    let dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let date = this.props.post !== undefined && this.props.post.length !== 0 ?
      new Date(this.props.post.post.created_at) : null

    function createMarkup() {
      return {__html: html};
    }
    return (
      <React.Fragment>
        {
          this.props.post !== undefined && this.props.post.length !== 0  
        ?
        <div className="post-container">
            <div id="post-title">
              <h1>{this.props.post.post.title}</h1>
            </div>
            <div id="author-info">
              <h2>
                <img src={"/assets/headshots/" + this.props.post.author.image_file_name} />{this.props.post.author.first_name + ' ' + this.props.post.author.last_name}
                <a href={"https://www.twitter.com/" + this.props.post.author.twitter}><img src="/assets/icons/twitter-icon.png" /></a>
                {date.toLocaleDateString("en-US",dateOptions)}
              </h2>
            </div>
            <div id="tag-info">
            {this.props.post.post.tags}
            </div>
            <div id="post-body" dangerouslySetInnerHTML={createMarkup()}></div>
            
        </div>
        :
        "Loading..."
        }
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    signed_in: state.signed_in,
    email: state.email,
    first_name: state.first_name,
    last_name: state.last_name,
    user_location: state.user_location,
    twitter: state.twitter,
    id: state.id,
    picture: state.picture,
    headshot: state.headshot,
    post: state.current_post,
    editorState: state.editorState
  }
}
export default connect(mapStateToProps, { loggedIn, getPost })(ViewPost)