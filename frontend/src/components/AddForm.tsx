import { useAppDispatch } from '../redux';
import { createProduct } from '../redux/productSlice';

const AddForm = () => {
  const dispatch = useAppDispatch();

  const onSubmit = async (event: Event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const accessToken = localStorage.getItem('accessToken');
    const [userId] = Object.keys(accessToken);

    dispatch(createProduct({
      id: 1,
      name: formData.get('name').toString(),
      price: parseInt(formData.get('price').toString()),
      description: formData.get('description').toString(),
    }));
  };

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
      <div>
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Название лота</label>
        <input type="text" name="name" id="name"
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
               required={ true }/>
      </div>
      <div>
        <label htmlFor="expires"
               className="block mb-2 text-sm font-medium text-gray-900">Длительность лота</label>
        <select name="expires" id="expires"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required={ true }>
          <option value="">1 день</option>
          <option value="">3 дня</option>
          <option value="">7 дней</option>
        </select>
      </div>
      <div>
        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">
          Стоимость лота
        </label>
        <div className="relative">
          <input
            type="number"
            name="price"
            id="price"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10"
            required
          />
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">₽</span>
        </div>
      </div>
      <div>
        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Описание лота</label>
        <textarea name="description" id="description"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required={ true }></textarea>
      </div>
      <button type="submit"
              className="w-full text-white bg-indigo-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Создать лот
      </button>
    </form>
  );
};

export default AddForm;
