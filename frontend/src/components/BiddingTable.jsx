import React from 'react';

const BiddingTable = () => {
  return (
    <>
    <div className="flex w-auto justify-evenly border p-4 rounded-lg mb-4 bg-gray-100">
      <p>3 участника</p>
      <p>3 ставки</p>
      <p>осталось дней: 2д 4ч 5м</p>
    </div>
    <div className="border p-4 rounded-lg bg-gray-100">
      <h4 className="font-semibold text-gray-600 mb-2">Ставки</h4>
      <table className=" table-auto w-full">
        <thead>
          <tr>
            <th className="text-left">Пользователь</th>
            <th className="text-left">Ставка</th>
            <th className="text-left">Дата</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Виктор
              <button className="text-white mx-32 font-medium bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded-lg">перебить</button>
            </td>
            <td>34266</td>
            <td>12-03-24 11:32:11</td>
          </tr>
          <tr>
            <td>Катя</td>
            <td>265</td>
            <td>14-03-24 12:34:05</td>
          </tr>
          <tr>
            <td>Михаил</td>
            <td>72</td>
            <td>15-03-24 15:36:45</td>
          </tr>
        </tbody>
      </table>
    </div>
    </>
  );
};

export default BiddingTable;
