import axiosInstance from '../../axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux';
import { addToken } from '../redux/tokenSlice';

const RegisterForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
      const response = await axiosInstance.post('api/auth/signUp', {
        email: formData.get("email"),
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        password: formData.get("password"),
      }, {headers: {'Content-Type': 'application/json'}});

      const { accessToken, user: { id, email, firstName, lastName } } = response.data;
      const userBody = { accessToken, id, email, firstName, lastName };

      localStorage.setItem("accessToken", JSON.stringify(userBody));
      setIsLoggedIn(true);

      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Электронная почта</label>
        <input type="email" name="email" id="email"
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
               placeholder="name@company.com" required=""/>
      </div>
      <div className="flex flex-row justify-between">
        <div>
          <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900">Имя</label>
          <input type="text" name="firstName" id="firstName"
                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                 placeholder="Ivan" required=""/>
        </div>
        <div>
          <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900">Фамилия</label>
          <input type="text" name="lastName" id="lastName"
                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                 placeholder="Smith" required=""/>
        </div>
      </div>
      <div>
        <label htmlFor="password"
               className="block mb-2 text-sm font-medium text-gray-900">Пароль</label>
        <input type="password" name="password" id="password" placeholder="••••••••"
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
               required=""/>
      </div>
      <div>
        <label htmlFor="confirm-password"
               className="block mb-2 text-sm font-medium text-gray-900">Подтвердите пароль</label>
        <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••"
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
               required=""/>
      </div>
      <button type="submit"
              className="w-full text-white bg-indigo-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Создать
        аккаунт
      </button>
      <p className="text-sm font-light text-gray-500">
        Уже есть аккаунт? <a href="/auth/login"
                             className="font-medium text-primary-600 hover:underline">Войдите здесь</a>
      </p>
    </form>
  );
}

export default RegisterForm;
