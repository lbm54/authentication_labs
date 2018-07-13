import React, { Component } from "react";
import { Link } from "react-router-dom";

class BlogDisplay extends Component {
  constructor(props) {
    super(props);
    this.id = props.match.params.id;

    this.state = {
      title: "",
      content: ""
    };

    this.handleDelete = async function() {
      try {
        await fetch(`../api/blogs/${this.id}`, {
          method: "DELETE"
        });
        props.history.push("/admin");
      } catch (err) {
        console.log(err);
      }
    };

    this.handleEdit = async function() {
      try {
        await fetch(`../api/blogs/${this.id}`, {
          method: "PUT",
          body: JSON.stringify(this.state),
          headers: {
            "Content-Type": "application/json"
          }
        });
        props.history.push("/admin");
      } catch (err) {
        console.log(err);
      }
    };

    this.handleChange = function(what, value) {
      this.setState({
        [what]: value
      });
    };
  }

  async componentDidMount() {
    try {
      let blog = await fetch(`../api/blogs/${this.id}`);
      let blogJson = await blog.json();
      this.setState({ title: blogJson.title, content: blogJson.content });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className="container">
        <div className="card">
          <div className="card-body">
            <input
              className="form-control"
              onChange={e => {
                this.handleChange("title", e.target.value);
              }}
              placeholder={this.state.title}
            />
            <textarea
              className="form-control"
              onChange={e => {
                this.handleChange("content", e.target.value);
              }}
              placeholder={this.state.content}
            />
          </div>
          <div className="card-footer">
            <Link to="/admin">
              <button className="btn btn-primary m-1">Go back</button>
            </Link>
            <button
              onClick={() => this.handleEdit()}
              className="btn btn-warning m-1"
            >
              Edit
            </button>
            <button
              onClick={() => {
                this.handleDelete();
              }}
              className="btn btn-danger m-1"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default BlogDisplay;
