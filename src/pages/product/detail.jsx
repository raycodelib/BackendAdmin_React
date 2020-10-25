import React, { Component } from "react";
import { Card, Icon, List } from "antd";

import LinkButton from "../../components/link-button";
// import { BASE_IMG_URL } from "../../utils/constants";
import { reqProductCategory } from "../../api";

const Item = List.Item;

export default class ProductDetail extends Component {
  state = {
    cName1: "",
    cName2: "",
  };

  // async componentDidMount() {
  //   const { pCategoryId, categoryId } = this.props.location.state.product;
  //   if (pCategoryId === "0") {
  //     const result = await reqProductCategory(categoryId);
  //     const cName1 = result.data.name;
  //     this.setState({ cName1 });
  //   } else {
  //     // const result1 = await reqProductCategory(pCategoryId);
  //     // const result2 = await reqProductCategory(categoryId);
  //     // const cName1 = result1.data.name;
  //     // const cName2 = result2.data.name;
  //     const results = await Promise.all([
  //       reqProductCategory(pCategoryId),
  //       reqProductCategory(categoryId),
  //     ]);
  //     const cName1 = results[0].data.name;
  //     const cName2 = results[1].data.name;

  //     this.setState({ cName1, cName2 });
  //   }
  // }

  render() {
    // const {
    //   name,
    //   desc,
    //   price,
    //   detail,
    //   imgs,
    // } = this.props.location.state.product;

    // const { cName1, cName2 } = this.state;

    const title = (
      <span>
        <LinkButton>
          <Icon
            type="arrow-left"
            style={{ marginRight: 10, fontSize: 20 }}
            onClick={() => this.props.history.goBack()}
          />
        </LinkButton>

        <span>Item Details</span>
      </span>
    );
    return (
      <Card title={title} className="product-detail">
        <List>
          <Item>
            <span className="left">Product Name: </span>
            <span>Lenovo ThinkPad Y480</span>
            {/* <span>{name}</span> */}
          </Item>
          <Item>
            <span className="left">Product Desc: </span>
            <span>RTX3080</span>
            {/* <span>{desc}</span> */}
          </Item>
          <Item>
            <span className="left">Product Price: </span>
            <span>$1500</span>
            {/* <span>{price}</span> */}
          </Item>
          <Item>
            <span className="left">Product Category: </span>
            <span>PC</span>
            {/* <span>
              {cName1} {cName2 ? "-->" + cName2 : ""}
            </span> */}
          </Item>
          <Item>
            <span className="left">Product Picture:</span>
            <span>
              <img
                className="product-img"
                src="https://www.notebookcheck.net/typo3temp/_processed_/7/8/csm_lenoY480_2167dec854.jpg"
                alt="y480"
              />
              <img
                className="product-img"
                src="https://www.notebookcheck.net/typo3temp/_processed_/7/8/csm_lenoY480_2167dec854.jpg"
                alt="y480"
              />
              {/* {imgs.map((img) => (
                <img
                  key={img}
                  src={BASE_IMG_URL + img}
                  alt=""
                  className="product-img"
                />
              ))} */}
            </span>
          </Item>
          <Item>
            <span className="left">Product Details:</span>
            <span
              dangerouslySetInnerHTML={{
                __html: '<h1 style="color: red">hello react</h1>',
              }}
            ></span>
          </Item>
        </List>
      </Card>
    );
  }
}
