import React, { Component } from "react";

class BlogInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      content: ""
    };

    this.handleChange = (what, value) => {
      this.setState({
        [what]: value
      });
    };

    this.handleSubmit = async () => {
      let insertObject = {
        title: this.state.title,
        content: this.state.content
      };
      try {
        fetch("/api/blogs", {
          method: "post",
          body: JSON.stringify(insertObject),
          headers: {
            "Content-Type": "application/json"
          }
        });
        props.refresh();
      } catch (e) {
        console.log(e);
      }
    };
  }

  render() {
    return (
      <div className="container mt-2">
          <input
            type="text"
            placeholder="Blog title"
            onChange={event => this.handleChange("title", event.target.value)}
            id="title"
            className="form-control"
          />
          <textarea
            id="content"
            cols="50"
            placeholder="content"
            onChange={event => this.handleChange("content", event.target.value)}
            className="form-control mt-2"
          />
          <button
            className="btn btn-primary mt-2"
            onClick={event => this.handleSubmit()}
          >
            Submit
          </button>
        </div>
    );
  }
}

export default BlogInput;
