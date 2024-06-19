'use client'

import LoginForm from "@/components/LoginForm";

const Page = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-slate-50">
      <div
        className="w-full bg-white rounded-3xl shadow md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Войдите в аккаунт
          </h1>
          <LoginForm />
        </div>
      </div>
    </main>
  )
}

export default Page;
