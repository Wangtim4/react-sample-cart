import axios from "axios";
import { useEffect, useState } from "react";

function CouponModal({ closeModal, getCoupons, type, tempCoupon }) {
  const [tempData, setTempData] = useState({
    title: "",
    is_enabled: 1,
    percent: 80,
    due_date: 1555459200,
    code: "testCode"
  });

  const [date, setDate] = useState(new Date());
  // console.log(date);

  useEffect(() => {
    // console.log(type, tempCoupon);
    if (type === 'create') {
      setTempData({
        title: "",
        is_enabled: 1,
        percent: 80,
        due_date: 1555459200,
        code: "testCode"
      });
      setDate(new Date());
    } else if (type === 'edit') {
      setTempData(tempCoupon);
      setDate(new Date(tempCoupon.due_date))     
    }
  }, [type, tempCoupon])

  const handleChange = (e) => {
    // console.log(e);
    const { name, value } = e.target;
    // console.log(name , value);

    // 價格轉數字型別
    // includes(name)內包含'price','origin_price'價格轉數字型別
    if (['percent'].includes(name)) {
      setTempData({
        ...tempData,
        [name]: Number(value),
      });
    } else if (name === 'is_enabled') {
      setTempData({
        ...tempData,
        [name]: +e.target.checked,
        // e.target.checked為boolen，透過+轉數字
      });
    } else {
      setTempData({
        ...tempData,
        [name]: value,
      });
    }
  }

  const submit = async () => {
    try {
      let api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon`;
      let method = 'post';
      if (type === 'edit') {
        api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${tempCoupon.id}`;
        method = 'put';
      }
      const res = await axios[method](api,
        {
          data: {
            ...tempData,
            // 轉乘unix time 
            due_date: date.getTime()
          }
        }
      );
      console.log(res);
      closeModal();
      getCoupons();
    } catch (error) {
      console.log('err', error);
    }
  }

  return (
    <div
      className='modal fade'
      tabIndex='-1'
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'
      id="couponModal"
    >
      <div className='modal-dialog modal-lg'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='exampleModalLabel'>
              {type === 'create' ? ' 建立新優惠券' : `編輯 ${tempData.title}`}
            </h1>
            <button
              type='button'
              className='btn-close'
              aria-label='Close'
              onClick={closeModal}
            />
          </div>
          <div className='modal-body'>
            <div className='mb-2'>
              <pre>
                {JSON.stringify(tempData)}
              </pre>
              <label className='w-100' htmlFor='title'>
                標題
                <input
                  type='text'
                  id='title'
                  placeholder='請輸入標題'
                  name='title'
                  className='form-control mt-1'
                  value={tempCoupon.title}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className='row'>
              <div className='col-md-6 mb-2'>
                <label className='w-100' htmlFor='percent'>
                  折扣(%)
                  <input
                    type='number'
                    name='percent'
                    id='percent'
                    placeholder='請輸入折扣(%)'
                    className='form-control mt-1'
                    value={tempCoupon.percent}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className='col-md-6 mb-2'>
                <label className='w-100' htmlFor='due_date'>
                  到期日
                  <input
                    type='date'
                    id='due_date'
                    name='due_date'
                    placeholder='請輸入到期日'
                    className='form-control mt-1'
                    value={
                      `${date.getFullYear().toString()}-${(
                        date.getMonth() + 1
                      )
                        .toString()
                        .padStart(2, 0)}-${date
                          .getDate()
                          .toString()
                          .padStart(2, 0)}`
                          // 轉成yyy-mm-dd
                    }
                    onChange={(e) => {
                      setDate(new Date(e.target.value));
                      // console.log(e.target.value);
                    }}
                  />
                </label>
              </div>
              <div className='col-md-6 mb-2'>
                <label className='w-100' htmlFor='code'>
                  優惠碼
                  <input
                    type='text'
                    id='code'
                    name='code'
                    placeholder='請輸入優惠碼'
                    className='form-control mt-1'
                    value={tempCoupon.code}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
            <label className='form-check-label' htmlFor='is_enabled'>
              <input
                className='form-check-input me-2'
                type='checkbox'
                id='is_enabled'
                name='is_enabled'
                value={tempCoupon.is_enabled}
                onChange={handleChange}
              />
              是否啟用
            </label>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-secondary'
              onClick={closeModal}>
              關閉
            </button>
            <button type='button' className='btn btn-primary'
              onClick={submit}>
              儲存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CouponModal;