import React, { Component } from 'react';
import { Form, Input, Button, Icon } from 'antd';
// import Icon from '@ant-design/icons';

import './login.less';
import logo from './images/logo.png';

// login route component
class Login extends Component {
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(
                    'Verification succeed. Received values of form: ',
                    values
                );
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
                        <Form.Item>
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
                        </Form.Item>
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
const WrapLogin = Form.create()(Login);
export default WrapLogin;
// 1. frontend form verification
// 2. frontend form data collection
