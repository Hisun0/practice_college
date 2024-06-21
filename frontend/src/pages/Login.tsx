import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="container flex items-center justify-center">
        <div
          className="w-full bg-white rounded-3xl shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Войти в аккаунт
            </h1>
            <LoginForm/>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Login;