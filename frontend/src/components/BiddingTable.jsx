import React from 'react';

const BiddingTable = () => {
  return (
    <>
    <div className="border p-4 rounded-lg mb-4">
      <h4 className="font-semibold mb-2">Сделано ставок:</h4>
      <p>3 ставки</p>
      <p>3 участника</p>
      <p>осталось дней: 2д 4ч 5м</p>
    </div>
    <div className="border p-4 rounded-lg">
      <h4 className="font-semibold mb-2">Ставки</h4>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Пользователь</th>
            <th className="text-left">Ставка</th>
            <th className="text-left">Дата</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Виктор</td>
            <td>34266</td>
            <td>12-03-24 11:32:11</td>
          </tr>
          <button className="text-white font-medium bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded-lg">перебить</button>
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
