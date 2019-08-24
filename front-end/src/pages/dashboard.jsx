import React from "react";
import Main from "./main";
import DBToolBar from "../components/dashboard-toolbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import Profile from "../components/profile";
import Leaderboard from "../components/leader-board";
import NewRoomModal from "../components/new-room-modal";
import ListRoom from "../components/list-room";
import { initialSocketIO, onLogOut } from "../actions/room";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import BackgroundIcon from "../components/background-icon";

class DashBoard extends React.Component {


    componentDidMount() {
        this.props.initialSocketIO();
    }

    render() {
        if (!this.props.logout && this.props.authenticated !== 2) {
            return (
                <Main>
                    <div className="min-vh-100 flex-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                    {this.props.authenticated === 1 && <Redirect to="/login"/>}
                </Main>
            );
        }

        return (
            <Main>
                <div className="min-vh-100 flex-center">
                    <div className="card db-border">
                        <div className="db ">
                            <div className="db-leftbar">
                                <DBToolBar />
                                <div className="db-listroomscroll position-relative">
                                    <BackgroundIcon
                                        name="swords-bg.svg"
                                        color="#00333333"
                                    />
                                    <PerfectScrollbar>
                                        <ListRoom />
                                    </PerfectScrollbar>
                                </div>
                            </div>
                            <div className="db-rightbar">
                                <Profile onLogOut={this.props.onLogOut} />
                                <Leaderboard />
                            </div>
                        </div>
                    </div>
                    <div><NewRoomModal/></div>
                   
                </div>
                {this.props.roomId !== "" && <Redirect to="/play" />}
                {this.props.logout && <Redirect to="/login" />}
                {/* {this.props.authenticated === false && <Redirect to="/login" />} */}
            </Main>
        );
    }
}

const mapStateToProps = state => ({
    roomId: state.room.roomId,
    authenticated: state.room.authenticated,
    logout: state.room.logout
});

const mapDispatchToProps = dispatch => ({
    initialSocketIO: () => dispatch(initialSocketIO()),
    onLogOut: () => dispatch(onLogOut())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashBoard);
