import React, { Component } from 'react';
import { Form, Input, Button, Icon, message } from 'antd';
// import Icon from '@ant-design/icons';

import './login.less';
import logo from '../../assets/images/logo.png';
import { reqLogin } from '../../api';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import { Redirect } from 'react-router-dom';

const Item = Form.Item;

// login route component
class Login extends Component {
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const { username, password } = values;
                // reqLogin(username, password)
                //     .then((response) => {
                //         console.log('reqLogin success:', response.data);
                //     })
                //     .catch((error) => {
                //         console.log('reqLogin failed:', error);
                //     });

                // const response = await reqLogin(username, password);
                // const result = response.data; // {status: 0, data: user}   {status: 1, msg: 'failed'}
                const result = await reqLogin(username, password);
                if (result.status === 0) {
                    message.success('Login successfully');
                    const user = result.data;
                    memoryUtils.user = user;
                    storageUtils.saveUser(user);
                    this.props.history.replace('/');
                } else {
                    message.error('Invalid username or password');
                }
            } else {
                console.log('verification failed!');
            }
        });
        // const form = this.props.form;
        // const values = form.getFieldsValue();
        // console.log('handleSubmit()', values);
    };

    validatePwd = (rule, value, callback) => {
        console.log('validatePwd()', rule, value, callback);
        if (!value) {
            callback('Please input password!');
        } else if (value.length < 4) {
            callback('Your username must be more than 4 characters.');
        } else if (value.length > 12) {
            callback('Your username must be less than 12 characters.');
        } else if (!/^[a-zA-Z0-9_]+$/) {
            callback(
                'Your username should only contain underscore, letters, numbers.'
            );
        } else {
            callback();
        }
    };

    render() {
        const user = memoryUtils.user;
        if (user && user._id) {
            return <Redirect to='/' />;
        }
        const form = this.props.form; // this form object provides form verification and collection function
        const { getFieldDecorator } = form;

        return (
            <div className='login'>
                <header className='login-header'>
                    <img src={logo} alt='logo' />
                    <h1>Order Management System</h1>
                </header>
                <section className='login-content'>
                    <h2>Login</h2>
                    <Form onSubmit={this.handleSubmit} className='login-form'>
                        <Item>
                            {getFieldDecorator('username', {
                                rules: [
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: 'Please input your username!',
                                    },
                                    {
                                        min: 4,
                                        message:
                                            'Your username must be more than 4 characters.',
                                    },
                                    {
                                        max: 12,
                                        message:
                                            'Your username must be less than 12 characters.',
                                    },
                                    {
                                        pattern: /^[a-zA-Z0-9_]+$/,
                                        message:
                                            'Your username should only contain underscore, letters, numbers.',
                                    },
                                ],
                                initialValue: 'admin',
                            })(
                                <Input
                                    prefix={
                                        <Icon
                                            type='user'
                                            style={{ color: 'rgba(0,0,0,.25)' }}
                                        />
                                    }
                                    placeholder='Username'
                                />
                            )}
                        </Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ validator: this.validatePwd }],
                            })(
                                <Input
                                    prefix={
                                        <Icon
                                            type='lock'
                                            style={{ color: 'rgba(0,0,0,.25)' }}
                                        />
                                    }
                                    placeholder='Password'
                                    type='password'
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type='primary'
                                htmlType='submit'
                                className='login-form-button'
                            >
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        );
    }
}

/*
    advanced function:
    1. the input type is function
    or 2. return value is function
    
    examples:
    setTimeout() / setInterval()
    Promise: Promise(()=>{}) then (value => {}, reason => {})
    forEach() filter()      map()   find()   reduce()
    function.bind()


    advanced component
    1. is a function
    2. input is a component, return a new component, which is wrapped by adding particular attributes
    3. expand features of component

*/

//  create() is a advanced function as it returns a function
//  wrap Form component will generate a new component: Form(Login)
//    which passes a object attribute: form
// 1. frontend form verification
// 2. frontend form data collection
const WrapLogin = Form.create()(Login);
export default WrapLogin;
