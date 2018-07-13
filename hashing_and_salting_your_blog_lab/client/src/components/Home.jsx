import React, { Component } from "react";
import BlogList from './BlogList';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blogs: []
    };
  }

  async componentDidMount() {
    let blogs = await fetch("/api/blogs/");
    let blogsJson = await blogs.json();
    this.setState({ blogs: blogsJson });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col col-xs-8">
            <BlogList blogs={this.state.blogs} />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
