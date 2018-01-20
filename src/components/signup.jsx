import React, { Component } from "react";

class EditUser extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.getFormData = this.getFormData.bind(this);
        this.state = {
            first: this.props.editingUser.first,
            last: this.props.editingUser.last,
            age: this.props.editingUser.age,
            id: this.props.editingUser.id
        }
    }

    handleChange(ev) {
        let value = ev.target.value;
        this.setState({ [ev.target.id]: value })
    }


    getFormData(ev) {
        ev.preventDefault();
        this.props.updatedValue(this.state);
    }

    renderUsers() {
        return <form onSubmit={this.getFormData}>
            <input type="text" id="first" onChange={this.handleChange} defaultValue={this.state.first} />
            <input type="text" id="last" onChange={this.handleChange} defaultValue={this.state.last} />
            <input type="text" id="age" onChange={this.handleChange} defaultValue={this.state.age} />
            <input type="submit" value="Update User" />
        </form>
    }

    render() {
        return (this.renderUsers())
    }
}
export default EditUser;