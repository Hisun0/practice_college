import { useState } from "react";
import { GrClose } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegHeart, FaUserCircle } from 'react-icons/fa';
import { BiBasket } from "react-icons/bi";

function Header({ isLoggedIn }) {
  const [showMenu, setShowMenu] = useState(false);

  const renderLogInOrNo = () => {
    if (isLoggedIn) {
      return (
        <>
          <a href="/additem">
            <button className="text-white font-medium bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded-lg">Выставить лот
            </button>
          </a>
          <FaUserCircle />
        </>
      );
    }

    return (
      <>
        <a href="/auth/login">
          <button className="text-white font-medium bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded-lg">Войти
          </button>
        </a>
      </>
    );
  };

  return (
    <header className="flex flex-row items-center justify-between sm:justify-around p-2 py-4 bg-white drop-shadow">
      <a href="/">
        <h1 className="">Аукцион</h1>
      </a>

      <div>
        <form>
          <div className="flex flex-row">
            <input className="rounded-l-lg border-2 border-indigo-600" type="text"/>
            <button className="text-white bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded-r-lg" type="submit">Найти</button>
          </div>
        </form>
      </div>

      <nav className="hidden sm:flex justify-between items-center gap-4 font-semibold">
        <a href="/my/wishlist" className="text-xs font-light tracking-tight">
          <div className="flex flex-col items-center">
            <FaRegHeart className="mb-1" size={20}/>
            <p>Избранное</p>
          </div>
        </a>
        <a href="/my/bet" className="text-xs font-light tracking-tight">
          <div className="flex flex-col items-center">
            <BiBasket className="mb-1" size={20}/>
            <p>Ставки</p>
          </div>
        </a>
        {renderLogInOrNo()}
      </nav>
      <nav className="sm:hidden flex flex-col items-end gap-1 font-semibold">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="sm:hidden font-bold text-xl hover:text-gray-500"
        >
          {showMenu ? <GrClose /> : <GiHamburgerMenu />}
        </button>
        {showMenu && (
          <>
            <a href="/" className="hover:text-gray-500">
              На главную
            </a>
            <a href="/auth/register" className="hover:text-gray-500">
              Создать аккаунт
            </a>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
