import React, { Component } from "react";
import { Card, Select, Input, Button, Icon, Table } from "antd";

import LinkButton from "../../components/link-button";
import { reqProducts } from "../../api";
import { PAGE_SIZE } from "../../utils/constants";

const Option = Select.Option;

export default class ProductHome extends Component {
  state = {
    // products: [
    //   {
    //     status: 1,
    //     imgs: [],
    //     _id: "111",
    //     name: "ThinkPad Y480",
    //     desc: "X390 T490 Slim",
    //     price: 1500,
    //     pCategoryId: "aaa",
    //     categoryId: "bbb",
    //     detail: "",
    //     __v: 0,
    //   },
    //   {
    //     status: 1,
    //     imgs: [],
    //     _id: "222",
    //     name: "Alienware S17",
    //     desc: "RTX3080, Intel i9 9900",
    //     price: 5000,
    //     pCategoryId: "ccc",
    //     categoryId: "ddd",
    //     detail: "",
    //     __v: 0,
    //   },
    // ],
    total: 0,
    products: [],
    loading: false,
  };
  initColumns = () => {
    this.columns = [
      {
        title: "Product Name",
        dataIndex: "name",
      },
      {
        title: "Description",
        dataIndex: "desc",
      },
      {
        width: 100,
        title: "Price",
        dataIndex: "price",
        render: (price) => "$" + price,
      },
      {
        width: 100,
        title: "Status",
        dataIndex: "status",
        render: (status) => {
          return (
            <span>
              <Button type="primary">Offline</Button>
              <span>Saling</span>
            </span>
          );
        },
      },
      {
        width: 100,
        title: "Action",
        render: (product) => {
          return (
            <span>
              <LinkButton>Details</LinkButton>
              <LinkButton>Modify</LinkButton>
            </span>
          );
        },
      },
    ];
  };

  getProducts = async (pageNum) => {
    this.setState({ loading: true });
    const result = await reqProducts(pageNum, PAGE_SIZE);
    this.setState({ loading: false });

    if (result.status === 0) {
      const { total, list } = result.data;
      this.setState({ total, products: list });
    }
  };

  componentWillMount() {
    this.initColumns();
  }

  componentDidMount() {
    this.getProducts(1);
  }

  render() {
    const { products, total, loading } = this.state;

    const title = (
      <span>
        <Select value="1" style={{ width: 150 }}>
          <Option value="1">Sort by Name</Option>
          <Option value="2">Sort by Description</Option>
        </Select>
        <Input placeholder="Keyword" style={{ width: 150, margin: "0 15px" }} />
        <Button type="primary">APPLY</Button>
      </span>
    );
    const extra = (
      <Button type="primary">
        <Icon type="plus" />
        Add product
      </Button>
    );
    return (
      <Card title={title} extra={extra}>
        <Table
          loading={loading}
          bordered
          rowKey="_id"
          dataSource={products}
          columns={this.columns}
          pagination={{
            total: total,
            defaultPageSize: PAGE_SIZE,
            showQuickJumper: true,
            // onChange: (pageNum) => {
            //   this.getProducts(pageNum);
            // },
            onChange: this.getProducts,
          }}
        />
      </Card>
    );
  }
}
