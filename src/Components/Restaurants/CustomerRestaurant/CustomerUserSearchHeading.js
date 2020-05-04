import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../../Images/nueats.png';

class CustomerUser extends React.Component {

    render() {
        return (
            <dl className="row">
                <dt className="col-sm-3">
                    <Link to = {`/`}>
                        <img src={logo} style={{height:"70px", width:"300px"}}/>
                    </Link>
                </dt>
                <dd className="col-sm-9">
                    <div className="float-right">
                        <ul className="list-inline">
                            <li className="list-inline-item">
                                <Link to={`/profile/customer/${this.props.currentUser.username}`}>
                                    <h4>
                                        {this.props.currentUser.username}
                                    </h4>
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <h5>|</h5>
                            </li>
                            <li className="list-inline-item">
                                <a onClick={this.props.logOut}
                                        className="btn btn-outline-danger">
                                    Log Out
                                </a>
                            </li>
                        </ul>
                    </div>
                </dd>
            </dl>
        );

    }
}

export default CustomerUser;