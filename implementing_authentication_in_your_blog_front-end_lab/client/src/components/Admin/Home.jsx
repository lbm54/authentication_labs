import React, { Component } from "react";
import BlogList from "./BlogList";
import BlogInput from "./BlogInput";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blogs: []
    };

    this.refresh = async () => {
      let blogs = await fetch("/api/blogs/");
      let blogsJson = await blogs.json();
      this.setState({ blogs: blogsJson });
    };
  }

  componentDidMount() {
    this.refresh();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col col-xs-8">
            <BlogList blogs={this.state.blogs} />
          </div>
          <div className="col col-xs-4">
            <BlogInput refresh={this.refresh} />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
