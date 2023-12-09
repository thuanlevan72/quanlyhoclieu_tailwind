import React from 'react';
import Cards from 'react-credit-cards';
import { number as validateNumber, expirationDate, cvv } from 'card-validator';
import 'react-credit-cards/es/styles-compiled.css';
import DepositModel from '../../page/student/DepositModel';

const authInfo = localStorage.getItem('authInfo');
const authInfoObject = JSON.parse(authInfo);

export default class creditCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cvc: '',
      expiry: '',
      focus: '',
      name: '',
      number: '',
      isModalOpen: false,
    };
  }

  showModal = (e) => {
    e.preventDefault();
    const { name, number, expiry, cvc, amount } = this.state;
    const cardNumberValidation = validateNumber(number);
    const expirationDateValidation = expirationDate(expiry);
    const cvcValidation = cvv(cvc);
    if (!name || !number || !expiry || !cvc || !amount) {
      alert('Vui lòng điền đầy đủ thông tin thẻ tín dụng.');
      this.setState({ isModalOpen: false });
    } else {
      if (cardNumberValidation.isValid && expirationDateValidation.isValid && cvcValidation.isValid) {
        alert('Thanh toán thành công');
      } else {
        alert('Thông tin thẻ không hợp lệ. Vui lòng kiểm tra lại.');
      }
      console.log(this.isModalOpen);
    }
  };

  ShowQRCode = () => {
    this.setState({ isModalOpen: true });
  };

  handleOk = () => {
    this.setState({ isModalOpen: false });
  };

  handleCancel = () => {
    this.setState({ isModalOpen: false });
  };

  handleInputFocus = (e) => {
    const { name } = e.target;
    this.setState({ focus: name });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { cvc, expiry, focus, name, number, isModalOpen } = this.state;

    return (
      <div id="PaymentForm">
        <button type="button" onClick={this.ShowQRCode}>
          Thanh Toán qua QRCode
        </button>
        <DepositModel isModalOpen={isModalOpen} onCancel={this.handleCancel} onOK={this.handleOk} />
        <Cards cvc={cvc} expiry={expiry} focused={focus} name={name} number={number} />
        <form>
          <div className="container mx-auto p4-10">
            <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-xl">
              <div className="md:flex">
                <div className="w-full px-6 py-8 md:p-8">
                  <h2 className="text-2xl font-bold text-gray-800">Checkout</h2>
                  <p className="mt-4 text-gray-600">Please fill out the form below to complete your purchase.</p>
                  <form onSubmit={(e) => e.preventDefault()} className="mt-6">
                    <div className="mb-6">
                      <div className="block text-gray-800 font-bold mb-2">Name</div>
                      <input
                        // value={`${authInfoObject.firstName}${authInfoObject.lastName}`}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Card Holder Name"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <div className="block text-gray-800 font-bold mb-2">Email</div>
                      <input
                        placeholder={authInfoObject.userName}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        disabled
                      />
                    </div>
                    <div className="mb-6">
                      <div className="block text-gray-800 font-bold mb-2">Card Number</div>
                      <input
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="card_number"
                        type="tel"
                        name="number"
                        placeholder="**** **** **** 1234"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                      />
                    </div>
                    <div className="mb-6">
                      <div className="block text-gray-800 font-bold mb-2">Expiration Date</div>
                      <input
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="expiration_date"
                        placeholder="MM / YY"
                        type="tel"
                        name="expiry"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                      />
                    </div>
                    <div className="mb-6">
                      <div className="block text-gray-800 font-bold mb-2">CVV</div>
                      <input
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="cvv"
                        placeholder="***"
                        type="tel"
                        name="cvc"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                      />
                    </div>
                    <div className="mb-6">
                      <div className="block text-gray-800 font-bold mb-2">Amount</div>
                      <input
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="amount"
                        placeholder="0VND"
                        type="tel"
                        name="amount"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                      />
                    </div>
                    <input
                      type="submit"
                      value="Deposit Now"
                      onClick={this.showModal}
                      className="cursor-pointer p-3 rounded-lg hover:text-white bg-orange-400"
                    />
                    {}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
