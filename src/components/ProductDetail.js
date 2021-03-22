import { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { Select } from 'antd';
import AddToCart from "./AddToCart"

const { Option } = Select;

function ProductDetail({ product }) {
   const [typ, setTyp] = useState(0);
   const [clr, setClr] = useState(0);
   const [qty, setQty] = useState(product.countInStock[0] > 0 ? 1 : 0);
   const handleChange = value => {
      setQty(value);
    };
   const typeChange = valu => {
      setTyp(valu);
   };
   const colorChange = val => {
      setClr(val);
   };

   useEffect(()=>{
      console.log(`The selected qty = ${qty}`)
   },[qty]);

   return (
      <Row gutter={[32, 32]}>
        <Col 
          lg={{ span: 8, offset: 2 }}
        >
         <img
            alt=""
            className="product-image"
            src={product.image}
         />           
        </Col>
        <Col 
          lg={{ span: 12 }}
        >
         <div className="product-info--detail">
            <h2 className="product-category">
               {product.category}
            </h2>
            <h1 className="product-name product-name--large">
               {product.name}
            </h1>
            <p className="product-description">{product.description_long}</p>
            <div className="product-price-wrap">
               <p className="product-price product-price--large">
                  US${product.price[clr][typ]}.00
               </p>
               <p className="product-status">
                  Status: {product.countInStock[clr][typ] > 0 ? "In Stock" : "Unavailable."}
               </p>
               <p className="product-qty">
                  Color: {"   "}
                  <Select 
                     defaultValue={clr} 
                     className="select-style"
                     onChange={colorChange}
                  >
                     {[...Array(product.color.length).keys()].map((x) => (
                        <Option key={x} value={x}>
                           {product.color[x]}
                        </Option>
                     ))}
                  </Select>
               </p>
               <p className="product-qty">
                  Type: {"   "}
                  <Select 
                     defaultValue={typ} 
                     className="select-style"
                     onChange={typeChange}
                  >
                     {[...Array(product.type.length).keys()].map((x) => (
                        <Option key={x} value={x}>
                           {product.type[x]}
                        </Option>
                     ))}
                  </Select>
               </p>
               <p className="product-qty">
                  Quantity: {"   "}
                  <Select 
                     defaultValue={qty} 
                     className="select-style"
                     onChange={handleChange}
                  >
                     {[...Array(product.countInStock[clr][typ]).keys()].map((x) => (
                        <Option key={x + 1} value={x + 1}>
                           {x + 1}
                        </Option>
                     ))}
                  </Select>
               </p>
               <p className="product-qty">

                  Total Price: {product.price[clr][typ] * qty}
               </p>
                  {[(product.countInStock[clr][typ])].map((x) => (
                        product.countInStock[clr][typ] > 0 ? <AddToCart /> :  <p />
                  ))}               
            </div>
         </div>           
        </Col>
      </Row>
   );
}

export default ProductDetail;