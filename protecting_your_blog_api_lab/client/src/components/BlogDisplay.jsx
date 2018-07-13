import React, { Component } from "react";
import { Link } from "react-router-dom";

class BlogDisplay extends Component {
  constructor(props) {
    super(props);
    this.id = props.match.params.id;

    this.state = {
      blog: {
        title: "",
        content: ""
      }
    };
  }

  async componentDidMount() {
    let blog = await fetch(`/api/blogs/${this.id}`);
    let blogJson = await blog.json();
    this.setState({ blog: blogJson });
  }

  render() {
    return (
      <div className="container">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{this.state.blog.title}</h5>
            <p className="card-text">{this.state.blog.content}</p>
          </div>
        </div>
        <Link to="/">
          <button className="btn btn-primary">Go back</button>
        </Link>
      </div>
    );
  }
}

export default BlogDisplay;
