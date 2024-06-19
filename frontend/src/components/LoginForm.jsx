import axiosInstance from "../../axiosInstance";

const LoginForm = () => {
  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    await axiosInstance.post('api/auth/signIn', {
      email: formData.get("email"),
      password: formData.get("password"),
    }, { headers: { 'Content-Type': 'application/json' } });
  };

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Электронная почта</label>
        <input type="email" name="email" id="email"
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
               placeholder="name@company.com" required=""/>
      </div>
      <div>
        <label htmlFor="password"
               className="block mb-2 text-sm font-medium text-gray-900">Пароль</label>
        <input type="password" name="password" id="password" placeholder="••••••••"
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
               required=""/>
      </div>
      <button type="submit"
              className="w-full text-white bg-indigo-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Войти в аккаунт
      </button>
      <p className="text-sm font-light text-gray-500">
        Нет аккаунта? <a href="/auth/register"
                             className="font-medium text-primary-600 hover:underline">Зарегистрируйтесь</a>
      </p>
    </form>
  );
};

export default LoginForm;
