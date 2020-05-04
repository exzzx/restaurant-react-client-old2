import React, {Component} from 'react';
import UserService from '../../Services/UserServiceClient';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.selectUserType = this.selectUserType.bind(this);
        this.userSignUp = this.userSignUp.bind(this);
        this.userService = UserService.instance;
        this.state = {
            userType: 'CUSTOMER_USER',
            username: "",
            password: ""
        };
    }

    selectUserType(event) {
        this.setState({
                          userType: event.target.value
                      });
    }

    userSignUp() {
        let user = {
            userType: this.state.userType,
            username: this.state.username,
            password: this.state.password
        };
        this.userService.userSignUp(user).then(() => {
            this.props.history.push('/');
        });
    }

    render() {
        return (
            <div className="container">
                <h2>Sign up</h2>
                <br/>
                <form>
                    <div className="form-group row">
                        <label htmlFor="username" className="col-sm-2 col-form-label">
                            Username
                        </label>
                        <div className="col-sm-10">
                            <input onChange={(event) => {
                                this.setState({
                                                  username: event.target.value

                                              })
                            }}
                                   type="text" className="form-control" id="username"
                                   placeholder="user name"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="password" className="col-sm-2 col-form-label">
                            Password
                        </label>
                        <div className="col-sm-10">
                            <input onChange={(event) => {
                                this.setState({
                                                  password: event.target.value

                                              })
                            }}
                                   type="password" className="form-control" id="password"
                                   placeholder="Password"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="userType" className="col-sm-2 col-form-label">
                            User Type
                        </label>
                        <div className="col-sm-10">
                            <select onChange={this.selectUserType}
                                    className="custom-select-sm  wbdv-btn-right-margin form-control"
                                    id="userType">
                                <option value={'CUSTOMER_USER'}>Customer</option>
                                <option value={'OWNER_USER'}>Restaurant Owner</option>
                                <option value={'DELIVERER_USER'}>Deliverer</option>
                                <option value={'ADMIN_USER'}>Admin</option>
                            </select>
                        </div>
                    </div>
                </form>
                <div className="row">
                    <label className="col-sm-2 col-form-label"/>
                    <div className="col-sm-10">
                        <button onClick={this.userSignUp} className="btn btn-primary btn-block">
                            Sign up
                        </button>
                        <div>
                            <a href={"/login"}>Already have an account? Log in here!</a>
                            <a href={"/"} className="float-right">Back to main page</a>
                        </div>

                    </div>
                </div>

            </div>

        )
    }
}

export default SignUp;