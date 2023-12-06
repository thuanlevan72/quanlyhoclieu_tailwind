import React, { useState } from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

function DepositModel({ isModalOpen, onOK, onCancel }) {
  const [amount, setAmount] = useState('');
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  return (
    <>
      <Modal
        title="Payment methods"
        open={isModalOpen}
        onOk={onOK}
        onCancel={onCancel}
        okButtonProps={{ className: 'bg-orange-400 text-black hover:text-white' }}
      >
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-wrap gap-3 w-full p-5">
          <div className="flex-1 flex flex-col">
            <input
              onChange={handleAmountChange}
              value={amount}
              className="rounded-md peer p-[20px] py-2 border-2 border-gray-200"
              type="text"
              placeholder="Amount Deposit"
            />
            {amount && (
              <div>
                <p>Số tiền: {amount}</p>
                <img
                  src={`https://img.vietqr.io/image/mbbank-0329615098-compact2.jpg?amount=${amount}&addInfo=test&accountName=Dang%20Manh%20Hien`}
                  alt="QR Code"
                />
              </div>
            )}
          </div>
        </form>
      </Modal>
    </>
  );
}

DepositModel.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  onOK: PropTypes.bool.isRequired,
  onCancel: PropTypes.bool.isRequired,
};

export default DepositModel;
