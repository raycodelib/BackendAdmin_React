import React, { Component } from 'react';

import './home.less';
import homepage from '../../assets/images/homepage.png';

export default class Home extends Component {
    render() {
        return (
            <div className='home'>
                <img src={homepage} alt='logo1' />
            </div>
        );
    }
}
