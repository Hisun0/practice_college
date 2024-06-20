const AddForm = () => {
  return (
    <form className="space-y-4 md:space-y-6">
      <div>
        <label htmlFor="lot" className="block mb-2 text-sm font-medium text-gray-900">Название лота</label>
        <input type="text" name="lot" id="lot"
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
               placeholder="Ваше название" required=""/>
      </div>
      <div>
        <label htmlFor="dateSelect"
               className="block mb-2 text-sm font-medium text-gray-900">Длительность вашего лота</label>
        <select name="dateSelect" id="dateSelect"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
          <option value="1 день">1 день</option>
          <option value="3 дня">3 дня</option>
          <option value="7 дней">7 дней</option>
        </select>
      </div>
      <div>
        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">Ваша начальная цена</label>
        <input type="number" name="price" id="price"
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
               placeholder="" required=""/>
      </div>
      <div>
        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">Описание лота</label>
        <textarea name="price" id="price"
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
               placeholder="" required=""/>
      </div>
      <button type="submit"
              className="w-full text-white bg-indigo-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Разместить лот
      </button>
    </form>
  );
};

export default AddForm;
