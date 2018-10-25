import React from "react";
const { Component } = require("react");

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      tasks: [],
      _id: ""
    };
    this.addTask = this.addTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  fetchtasks() {
    fetch("/api/v1/task")
      .then(res => res.json())
      .then(data => this.setState({ tasks: data }));
  }

  deleteTask(id) {
    if (confirm("Are you sure?")) {
      console.log(id);
      fetch("/api/v1/task/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          M.toast({ html: "Task Deleted" });
          this.fetchtasks();
        })
        .catch(err => console.log(err));
    }
  }

  editTask(id) {
    console.log(id);
    fetch("/api/v1/task/" + id)
      .then(res => res.json())
      .then(data => {
        this.setState({
          title: data.title,
          description: data.description,
          _id: data._id
        });
      })
      .catch(err => console.log(err));
  }

  addTask(event) {
    var { title, description, _id } = this.state;
    if (_id === "") {
      fetch("/api/v1/task", {
        method: "POST",
        body: JSON.stringify({ title, description }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          M.toast({ html: "Task Saved" });
          this.setState({
            title: "",
            description: ""
          });
        })
        .catch(err => console.log(err));
    } else {
      fetch(`/api/v1/task/${_id}`, {
        method: "PUT",
        body: JSON.stringify({ title, description }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          M.toast({ html: "Task Updated" });
          this.setState({ title: "", description: "", _id: "" });
        });
    }
    this.fetchtasks();
    event.preventDefault();
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  componentDidMount() {
    this.fetchtasks();
  }

  render() {
    return (
      <div>
        <nav className="light-blue darken-4">
          <div className="container">
            <a className="brand-logo" href="/">
              Mern Stack
            </a>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addTask}>
                    <div className="row">
                      <div className="input-field cols12">
                        <input
                          name="title"
                          type="text"
                          placeholder="Task Title"
                          onChange={this.handleChange}
                          value={this.state.title}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field cols12">
                        <textarea
                          name="description"
                          placeholder="Task Description"
                          className="materialize-textarea"
                          onChange={this.handleChange}
                          value={this.state.description}
                        />
                      </div>
                    </div>
                    <button type="Submit" className="btn light-blue darken-4">
                      Sent
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col s7">
              <table>
                <thead>
                  <tr key="header">
                    <th>Title</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.tasks.map(t => {
                    return (
                      <tr key={t._id}>
                        <td>{t.title}</td>
                        <td>{t.description}</td>
                        <td>
                          <button
                            className="btn light-blue darken-4"
                            onClick={() => this.editTask(t._id)}
                          >
                            <i className="material-icons">edit</i>
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn light-blue darken-4"
                            style={{ margin: "4px" }}
                            onClick={() => this.deleteTask(t._id)}
                          >
                            <i className="material-icons">delete</i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
