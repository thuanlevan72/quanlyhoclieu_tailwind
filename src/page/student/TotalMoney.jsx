import { PageHeader } from 'antd';
import { useState, useRef } from 'react';
import DepositModel from './DepositModel';

const PageRoutes = [
  {
    path: 'student',
    breadcrumbName: 'Home',
  },
  {
    path: 'course',
    breadcrumbName: 'Total Money',
  },
];

const arrDenomination = [1, 5, 10, 50, 100, 200, 500, 1000];

function TotalMoney() {
  const [selectedDenomination, setSelectedDenomination] = useState(null);
  const [depositInput, setDepositInput] = useState('');
  const inputRef = useRef(null);
  const storedAuthInfo = localStorage.getItem('authInfo');

  // Chuyển đổi chuỗi JSON thành mảng đối tượng (nếu có dữ liệu)
  const authInfoObject = JSON.parse(storedAuthInfo);

  // Bây giờ, biến authInfo sẽ chứa mảng đối tượng từ Local Storage
  console.log(authInfoObject.totalMoney);
  console.log(depositInput);
  const handleButtonClick = (value) => {
    inputRef.current.value = value;
    console.log(value);
    setSelectedDenomination(value);
  };
  const color = '#ffa502';

  return (
    <div className="h-screen">
      <PageHeader
        className="flex items-center justify-between px-8 xl:px-[15px] pt-2 pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
        title={`Total Money: ${authInfoObject.totalMoney}`}
        routes={PageRoutes}
      />
      <div className="flex flex-col" style={{ gap: '30px' }}>
        <div className="flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="wallet" style={{ width: '50px' }}>
            <path
              fill="#ffa502"
              d="M19,7H18V6a3,3,0,0,0-3-3H5A3,3,0,0,0,2,6H2V18a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V10A3,3,0,0,0,19,7ZM5,5H15a1,1,0,0,1,1,1V7H5A1,1,0,0,1,5,5ZM20,15H19a1,1,0,0,1,0-2h1Zm0-4H19a3,3,0,0,0,0,6h1v1a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V8.83A3,3,0,0,0,5,9H19a1,1,0,0,1,1,1Z"
            />
          </svg>
          <div className="font-bold">CHOOSE DENOMINATION</div>
        </div>
        <div className="grid w-[50%] mx-auto " style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
          {arrDenomination.map((value) => (
            <button
              key={value}
              onClick={() => {
                handleButtonClick(value);
              }}
              className={`btn-deno p-5 rounded-lg shadow-lg transition duration-300 ease-in-out hover:bg-[${color}] hover:text-white`}
              type="button"
              style={selectedDenomination === value ? { border: `1px solid ${color}` } : { border: '1px solid white' }}
            >
              {value}$
            </button>
          ))}
        </div>
        <div className="flex ml-auto gap-5 w-[50%] items-center">
          <input
            ref={inputRef}
            onChange={(e) => {
              setDepositInput(e.target.value);
            }}
            className="p-2 rounded-lg shadow-lg transition duration-300 ease-in-out"
            id="other"
            name="other"
            type="text"
            placeholder="Amount deposit"
          />
          <button
            aria-label="Expand Arrows"
            className={`rounded-lg shadow-lg transition duration-300 ease-in-out hover:bg-[${color}] hover:text-white`}
            type="button"
          >
            <DepositModel />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TotalMoney;
