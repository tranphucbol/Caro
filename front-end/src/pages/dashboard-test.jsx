import React from "react";
import Main from "./main";
import { Link } from "react-router-dom";
import { createRoom, joinRoom } from "../actions/room";
import {connect} from "react-redux"
// import { Redirect } from "react-router-dom"

class DashBoard extends React.Component {

    state = {
        input: '',
        redirect: false
    }

    handleClick = () => {
        console.log("CREATE ROOM")
        this.props.onCreateRoom(1000, 'Test room');
        this.setState({
            redirect: true
        })
    }

    handleInput = (e) => {
        this.setState({
            input: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.onJoinRoom(this.state.input, 'tranphucbol')
    }

    render() {
        if(this.state.redirect) {
            // return <Redirect to="/play"/>
        }
        return (
            <Main>
                <div className="row min-vh-100">
                    <Link to="/login">login</Link>
                    <Link to="/play">login</Link>
                    <div className="d-flex">
                        <div className="mx-3">
                            <button className="btn btn-primary" onClick={this.handleClick}>Create Room</button>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <input value={this.state.input} onChange={this.handleInput} className="form-control mb-3" />
                            <button type="submit" className="btn btn-primary">Mock Join Room</button>
                        </form>
                    </div>
 
                </div>
            </Main>
        );
    }
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
    onCreateRoom: (pet, name) => dispatch(createRoom(pet, name)),
    onJoinRoom: (roomId, host) => dispatch(joinRoom(roomId, host))
})

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);