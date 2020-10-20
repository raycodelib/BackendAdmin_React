import React, { Component } from "react";
import { Modal, Card, Table, Button, Icon, message } from "antd";

import LinkButton from "../../components/link-button";
import { reqCategory, reqAddCategory, reqUpdateCategory } from "../../api";
import AddForm from "./add-form";
import UpdateForm from "./update-form";

export default class Category extends Component {
  state = {
    // categories: [
    //     {
    //         parentId: "0",
    //         _id: "aaa",
    //         name: "Home Appliances",
    //         subcategories: [
    //             {
    //                 parentId: "aaa",
    //                 _id: "aaa1",
    //                 name: "TV",
    //             },
    //             {
    //                 parentId: "aaa",
    //                 _id: "aaa2",
    //                 name: "fridge",
    //             },
    //         ],
    //     },
    //     {
    //         parentId: "1",
    //         _id: "bbb",
    //         name: "Computers",
    //     },
    //     {
    //         parentId: "2",
    //         _id: "ccc",
    //         name: "Books",
    //     },
    //     {
    //         parentId: "3",
    //         _id: "ddd",
    //         name: "Food",
    //     },
    //     {
    //         parentId: "4",
    //         _id: "eee",
    //         name: "Tools",
    //     },
    // ],
    categories: [],
    loading: false,
    subcategories: [],
    parentId: "0",
    parentName: "",
    showStatus: 0,
  };

  initColumns = () => {
    this.columns = [
      { title: "Categories", dataIndex: "name" },
      {
        title: "action",
        width: 500,
        render: (category) => (
          <span>
            <Button onClick={() => this.showUpdate(category)}>Modify</Button>
            &nbsp;&nbsp;
            {this.state.parentId === "0" ? (
              <Button
                onClick={() => {
                  this.showSubCategories(category);
                }}
              >
                Sub-category
              </Button>
            ) : null}
          </span>
        ),
      },
    ];
  };

  getCategories = async (parentId) => {
    this.setState({ loading: true });
    // const { parentId } = this.state;
    parentId = parentId || this.state.parentId;
    const result = await reqCategory(parentId);
    this.setState({ loading: false });

    if (result.status === 0) {
      const categories = result.data;

      if (parentId === "0") {
        this.setState({ categories });
      } else {
        this.setState({
          subcategories: categories,
        });
      }
    } else {
      message.error("Failed: getCategories()");
    }
  };

  showCategories = () => {
    this.setState({
      subcategories: [],
      parentId: "0",
      parentName: "",
    });
  };

  showSubCategories = (category) => {
    this.setState(
      {
        parentId: category._id,
        parentName: category.name,
      },
      () => {
        // console.log("parentId :>> ", this.state.parentId);
        this.getCategories();
      }
    );
  };

  handleCancel = () => {
    this.form.resetFields();
    this.setState({ showStatus: 0 });
  };

  showAdd = () => {
    this.setState({ showStatus: 1 });
  };

  addCategory = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({
          showStatus: 0,
        });
        const { parentId, categoryName } = this.form.getFieldsValue();

        this.form.resetFields();
        const result = await reqAddCategory(categoryName, parentId);
        if (result.status === 0) {
          if (parentId === this.state.parentId) {
            this.getCategories();
          } else if (parentId === "0") {
            this.getCategories("0");
          }
        }
      }
    });
  };

  showUpdate = (category) => {
    this.category = category;
    this.setState({ showStatus: 2 });
  };

  updateCategory = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({
          showStatus: 0,
        });

        const categoryId = this.category._id;
        // const categoryName = this.form.getFieldValue("categoryName");
        // const { categoryName } = this.form.getFieldsValue();
        const { categoryName } = values;
        this.form.resetFields();

        const result = await reqUpdateCategory({
          categoryId,
          categoryName,
        });
        if (result.status === 0) {
          this.getCategories();
        }
      }
    });
  };

  componentWillMount() {
    this.initColumns();
  }

  componentDidMount() {
    this.getCategories();
  }

  render() {
    const {
      categories,
      loading,
      subcategories,
      parentId,
      parentName,
      showStatus,
    } = this.state;

    const category = this.category || {};

    // console.log("category :>> ", category);
    const title =
      parentId === "0" ? (
        "Categories"
      ) : (
        <span>
          <LinkButton onClick={this.showCategories}>Categories</LinkButton>
          <Icon type="arrow-right" style={{ marginRight: 5 }}></Icon>
          <span>{parentName}</span>
        </span>
      );

    const extra = (
      <Button type="primary" onClick={this.showAdd}>
        <Icon type="plus" />
        Add
      </Button>
    );

    return (
      <Card title={title} extra={extra}>
        <Table
          rowKey="_id"
          dataSource={parentId === "0" ? categories : subcategories}
          columns={this.columns}
          bordered
          loading={loading}
          pagination={{ defaultPageSize: 5, showQuickJumper: true }}
        />
        <Modal
          title="Add Category"
          visible={showStatus === 1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
        >
          <AddForm
            categories={categories}
            parentId={parentId}
            setForm={(form) => {
              this.form = form;
            }}
          />
        </Modal>

        <Modal
          title="Modify Category"
          visible={showStatus === 2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
        >
          <UpdateForm
            categoryName={category.name}
            setForm={(form) => {
              this.form = form;
            }}
          />
        </Modal>
      </Card>
    );
  }
}
