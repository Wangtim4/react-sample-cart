import { useState, useEffect } from "react";
import axios from "axios";
import { useOutletContext, useParams } from "react-router-dom";


function ProductDetail() {
    const [product, setProduct] = useState({});
    const [cartQuantity, setCartQuantity] = useState(1);
    const { id } = useParams();
    // console.log(id);
    const [isLoading, setIsLoading] = useState(false);
    // 最外層傳入
    const { getCart } = useOutletContext();

    const getProducts = async (id) => {
        const resProduct = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/product/${id}`);
        console.log(resProduct);
        setProduct(resProduct.data.product);
    };

    const addToCart = async () => {
        const data = {
            data: {
                product_id: product.id,
                qty: cartQuantity
              }
        };
        setIsLoading(true);
        try {
            const res = await axios.post(
                `/v2/api/${process.env.REACT_APP_API_PATH}/cart`
                ,data);
            console.log(res);
            // 取得外層購物車資訊
            getCart();
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getProducts(id);
    }, [id])

    return (<>
        <div className="container">

            <div className="row  my-5">
                <div className="col-md-6">
                    <img src={product.imageUrl} className="object-fit w-100 h-100" alt="" />
                </div>
                <div className="col-md-5 ">
                    {/* <nav aria-label="breadcrumb">
                        <ol className="breadcrumb bg-white px-0 mb-0 py-3">
                            <li className="breadcrumb-item"><a className="text-muted" href="./index.html">Home</a></li>
                            <li className="breadcrumb-item"><a className="text-muted" href="./product.html">Product</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Detail</li>
                        </ol>
                    </nav> */}
                    <div className="">
                        <h2 className="fw-bold h1 mb-1">
                            {product.title}
                        </h2>
                        <p>{product.content}</p>
                        <p>{product.description}</p>
                        <p className="mb-0 text-muted text-end"><del>NT${product.origin_price}</del></p>
                        <p className="h4 fw-bold text-end">NT${product.price}</p>
                        <div className="row align-items-center">
                            <div className="col-6">
                                <div className="input-group my-3 bg-light rounded">
                                    <div className="input-group-prepend">
                                        <button className="btn btn-outline-dark border-0 py-2" type="button" id="button-addon1"
                                            onClick={() => {
                                                setCartQuantity((pre) => pre === 1 ? pre : pre - 1)
                                            }}>
                                            <i className="bi bi-dash"></i>
                                        </button>
                                    </div>

                                    <input type="number"
                                        className="form-control border-0 text-center my-auto shadow-none"
                                        placeholder=""
                                        aria-label="Example text with button addon" aria-describedby="button-addon1"
                                        readOnly
                                        value={cartQuantity} />

                                    <div className="input-group-append">
                                        <button className="btn btn-outline-dark border-0 py-2" type="button" id="button-addon2"
                                            onClick={() => {
                                                setCartQuantity((pre) => pre + 1)
                                            }}>
                                            <i className="bi bi-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <button type="button"
                                    className="text-nowrap btn btn-dark w-100 py-2"
                                    onClick={addToCart}
                                    disabled={isLoading}>
                                    加入購物車
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </>)
}

export default ProductDetail;