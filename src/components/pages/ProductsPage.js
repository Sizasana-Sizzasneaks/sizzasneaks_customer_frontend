import React from 'react'
import product_card from "../data/product_data";

const ProductsPage = () => {
    console.log(product_card);
    const listItems = product_card.map((item) =>
        <div className="card" key={item.id}>
            <div className="card_img">
                <img src={item.thumb} />
            </div>
            <div className="card_header">
                <h2>{item.product_name}</h2>
                <p>{item.brand}</p>
                <p className="price">{item.currency}<span>{item.price}</span><div className="btn">Add to cart</div></p>

            </div>
        </div>

    );
    return (
        <div className="products_page">
            {listItems}
        </div>
    )
}
export default ProductsPage;
