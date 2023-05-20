import { NavLink } from "react-router-dom";

function Navbar({cartData}) {
    return (
        <div className="position-relative">
            <div className="position-absolute" style={{
                top: 0, bottom: 0, left: 0, right: 0, backgroundImage: 'url(https://img.freepik.com/free-photo/coffee-shop-cafe-latte-cappuccino-newspaper-concept_53876-16322.jpg?w=826&t=st=1684392024~exp=1684392624~hmac=dc7d8528a8563248f82d4bf1035ff376171eeacf70cd8adca6779b0c48024771)',
                backgroundPosition: 'center center', backgroundSize: 'cover', opacity: '0.2'
            }}>
            </div>
            <div className="container d-flex flex-column" style={{ minHeight: '100 vh' }}>

                <nav className="navbar navbar-expand-lg navbar-light " >
                    <NavLink className="navbar-brand" to='/' >
                        Navbar
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <NavLink className="nav-item nav-link me-4 active" to='/' >
                                首頁
                            </NavLink>
                            <NavLink className="nav-item nav-link me-4 active" to='/products' >
                                產品
                            </NavLink>
                            <NavLink className="nav-item nav-link me-4 active" to='/cart' >
                                <div className='position-relative'>
                                    <i className="bi bi-bag-fill  position-relative"></i>
                                    
                                        {cartData.carts?.length !==0 && (<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {cartData.carts?.length}
                                        </span>)}
                                    
                                </div>
                            </NavLink>

                        </div>
                    </div>
                </nav>
                <div className="row justify-content-center my-auto">
                    <div className="col-md-6 text-center">
                        <h2 className="mb-0">來自世界各地的豆子
                            為您帶來一杯獨一無二的咖啡</h2>
                        <button className="btn btn-dark  my-5 btn-lg w-50">領取優惠券</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
