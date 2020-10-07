import React, { Component } from 'react';

import { Card, Table, Button, Icon } from 'antd';
import LinkButton from '../../components/link-button';

export default class Category extends Component {
    render() {
        const title = 'Lv1 Categories';
        const extra = (
            <Button type='primary'>
                <Icon type='plus' />
                Add
            </Button>
        );

        const dataSource = [
            {
                parentId: '0',
                _id: 'aaa',
                name: 'home appliance0',
            },
            {
                parentId: '1',
                _id: 'bbb',
                name: 'home appliance1',
            },
            {
                parentId: '2',
                _id: 'ccc',
                name: 'home appliance2',
            },
            {
                parentId: '3',
                _id: 'ddd',
                name: 'home appliance3',
            },
        ];

        const columns = [
            { title: 'Categories', dataIndex: 'name' },
            {
                title: 'action',
                width: 500,
                render: () => (
                    <span>
                        <LinkButton>Modify</LinkButton>
                        <LinkButton>Sub-category</LinkButton>
                    </span>
                ),
            },
        ];

        return (
            <Card title={title} extra={extra}>
                <Table
                    rowKey='_id'
                    dataSource={dataSource}
                    columns={columns}
                    bordered
                />
            </Card>
        );
    }
}
