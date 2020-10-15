import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal } from 'antd';

import { formatDate } from '../../utils/dateUtils';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import { reqWeather } from '../../api';
import menuList from '../../config/menuConfig';
import './index.less';
import LinkButton from '../link-button';

class Header extends Component {
    state = {
        currentTime: formatDate(Date.now()),
        dayPictureUrl: '',
        weather: '',
    };

    getTime = () => {
        this.intervalId = setInterval(() => {
            const currentTime = formatDate(Date.now());
            this.setState({ currentTime });
        }, 1000);
    };

    getWeather = async () => {
        const { dayPictureUrl, weather } = await reqWeather('北京');
        this.setState({ dayPictureUrl, weather });
    };

    getTitle = () => {
        const path = this.props.location.pathname;
        let title = '';
        menuList.forEach((item) => {
            if (item.key === path) {
                title = item.title;
            } else if (item.children) {
                const cItem = item.children.find((cItem) => cItem.key === path);
                if (cItem) {
                    title = cItem.title;
                }
            }
        });
        return title;
    };

    logout = () => {
        Modal.confirm({
            title: 'Logout',
            content: 'Are you sure to log out?',
            onOk: () => {
                console.log('ok', this);
                storageUtils.removeUser();
                memoryUtils.user = {};
                this.props.history.replace('/login');
            },
            // onCancel() {
            //     console.log('cancel');
            // },
        });
    };
    componentDidMount() {
        this.getTime();
        this.getWeather();
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {
        // const { currentTime, dayPictureUrl, weather } = this.state;
        const { currentTime, dayPictureUrl } = this.state;
        const { username } = memoryUtils.user;
        const title = this.getTitle();
        return (
            <div className='header'>
                <div className='header-top'>
                    <span>Welcome, {username}</span>
                    <LinkButton onClick={this.logout}>Logout</LinkButton>
                    {/* <button onClick={this.logout}>Logout</button> */}
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>{title}</div>
                    <div className='header-bottom-right'>
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt='weather' />
                        {/* <span>{weather}</span> */}
                        <span>Sunny</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Header);
