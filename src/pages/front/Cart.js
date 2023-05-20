import axios from "axios";
import { useState } from "react";
import { useOutletContext, Link } from "react-router-dom";

function Cart() {
    const { cartData, getCart } = useOutletContext();
    // console.log(cartData);
    const [losdingItems, setLosdingItems] = useState([]);

    const removeCartItem = async (id) => {
        try {
            const res = await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/cart/${id}`);
            console.log('remove', res);
            // 取出最外層的購物資料重整
            getCart();
        } catch (error) {
            console.log(error);
        }
    }

    const updateCartItem = async (item, quantity) => {
        const data = {
            data: {
                // item.product_id跟item.id不一樣
                product_id: item.product_id,
                qty: quantity,
            },
        };
        setLosdingItems([...losdingItems, item.id])
        try {
            const res = await axios.put(`/v2/api/${process.env.REACT_APP_API_PATH}/cart/${item.id}`
                , data);
            console.log('remove', res);

            setLosdingItems(losdingItems.filter((losdingObject) => losdingObject !== item.id));

            // 取出最外層的購物資料重整
            getCart();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="mt-3 my-5 container">
            <div className="row">

                {cartData?.carts?.length === 0 ? (<>
                <div className="col-6 mx-auto">
                        <h1>購物車為空</h1>
                    <Link
                        to='/products'
                        className='btn btn-dark mt-4 py-3 fs-5'
                    >
                     繼續購物
                    </Link>
                </div>
                </>) : (<>
                    <div className="col-md-8">
                        <h3 className="mt-3 my-4">您的購物清單</h3>
                        <table className="table border">
                            <thead>
                                <tr>
                                    <th scope="col" >商品</th>
                                    <th scope="col">數量</th>
                                    <th scope="col" >單價</th>
                                    <th scope="col" >小計</th>
                                    <th scope="col" ></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartData?.carts?.map((item) => {
                                    return (
                                        <tr className="border-bottom border-top"
                                            key={item.id}
                                        >
                                            <th scope="romaxWidthstyw" className="border-0 px-0 font-weight-normal py-4">
                                                <img src={item.product.imageUrl} alt="" style={{ width: '72px', height: '72px', objectFit: 'cover' }} />
                                                <p className="mb-0 fw-bold ms-3 d-inline-block">
                                                    {item.product.title}
                                                </p>
                                            </th>
                                            <td className="border-0 align-middle" style={{ maxWidth: '160px' }}>
                                                <div className="input-group pe-5">
                                                    <select
                                                        name=''
                                                        className='form-select'
                                                        id=''
                                                        value={item.qty}
                                                        disabled={losdingItems.includes(item.id)}
                                                        onChange={(e) => {
                                                            updateCartItem(item, e.target.value * 1);
                                                        }}
                                                    >
                                                        {[...new Array(20)].map((i, num) => {
                                                            return (
                                                                <option value={num + 1} key={num}>
                                                                    {num + 1}
                                                                </option>
                                                            );
                                                        })}
                                                    </select>
                                                </div>
                                            </td>
                                            <td className="border-0 align-middle"><p className="mb-0 ms-auto">
                                                NT$ {item.product.price}
                                            </p></td>
                                            <td className="border-0 align-middle"><p className="mb-0 ms-auto">
                                                NT$ {item.total}
                                            </p></td>
                                            <td className="border-0 align-middle">
                                                <button type="button"
                                                    className="btn btn-secondary"
                                                    onClick={() => removeCartItem(item.id)}>
                                                    <i className="bi bi-x-lg"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}


                            </tbody>
                        </table>
                        <div className="input-group w-50 mb-3">
                            <input type="text" className="form-control rounded-0 border-bottom border-top-0 border-start-0 border-end-0 shadow-none" placeholder="Coupon Code" aria-label="Recipient's username" aria-describedby="button-addon2" />
                            <div className="input-group-append">
                                <button className="btn btn-outline-dark border-bottom border-top-0 border-start-0 border-end-0 rounded-0" type="button" id="button-addon2"><i className="fas fa-paper-plane"></i></button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="border p-4 mb-4">
                            <h4 className="fw-bold mb-4">Order Detail</h4>
                            <table className="table text-muted border-bottom">
                                <tbody>
                                    <tr>
                                        <th scope="row" className="border-0 px-0 pt-4 font-weight-normal">Subtotal</th>
                                        <td className="text-end border-0 px-0 pt-4">NT$ {cartData.total}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="border-0 px-0 pt-0 pb-4 font-weight-normal">Payment</th>
                                        <td className="text-end border-0 px-0 pt-0 pb-4">ApplePay</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="d-flex justify-content-between mt-4">
                                <p className="mb-0 h4 fw-bold">Total</p>
                                <p className="mb-0 h4 fw-bold">NT$ {cartData.final_total}</p>
                            </div>
                            <Link to="/checkout" className="btn btn-dark w-100 mt-4">確認</Link>
                        </div>
                    </div>
                </>)}

            </div>

        </div>
    )
}


export default Cart;

