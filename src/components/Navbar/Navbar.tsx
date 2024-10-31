import olxLogo from '../../assets/symbol.png';
import lens from '../../assets/search1.svg';
import arrow from '../../assets/arrow-down.svg';
import search from "../../assets/search.svg";
import sellButton from '../../assets/addButton.png';
import locationIcon from '../../assets/location.svg';
import { useState } from 'react';
import Login from '../Login/Login';
import { userAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [location, setLocation] = useState("Search city, area or locality");
    const [loginPop, setLoginPop] = useState(false);
    const auth = userAuth(); 
    const navigate = useNavigate()

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const selectLocation = (selectedLocation: string) => {
        setLocation(selectedLocation);
        setIsDropdownOpen(false);
    };

    const handleAuthClick = () => {
        if (auth?.user) {
            auth.logout();
        } else {
            setLoginPop(true);
        }
    };

    const handleSellClick = () => {
      if (auth?.user) {
        navigate('/sell');
      } else {
        setLoginPop(true); 
      }
    };
    return (
        <>
            <nav className="flex items-center fixed z-50 w-full p-3 pr-3 pl-3 shadow-md bg-slate-100 border-b-4 border-solid border-b-white">
                <img src={olxLogo} alt="Logo" className="w-14" />

                <div className="relative ml-4">
                    <img src={lens} alt="Lens" className="absolute w-5 top-4 left-2" />
                    <input
                        placeholder={location}
                        className="w-[50px] sm:w-[150px] md:w-[250] lg:w-[270px] p-3 pl-8 pr-8 border-black border-solid border-2 rounded-md placeholder:text-ellipsis focus:outline-none focus:border-teal-300"
                        type="text"
                    />
                    <img
                        src={arrow}
                        alt="Arrow"
                        className={`w-5 top-4 right-3 absolute cursor-pointer transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                        onClick={toggleDropdown}
                    />
                    {isDropdownOpen && (
                        <div className="fixed z-50 top-16 left-20 pt-4 pb-4 rounded-md bg-white shadow-xl h-[215px] w-[270px] overflow-x-hidden overflow-auto">
                            <ul className="text-gray-700">
                                {["Kerala", "Mumbai", "Delhi", "Banglore", "Chennai"].map((loc) => (
                                    <li
                                        key={loc}
                                        className="p-3 flex items-center hover:bg-teal-100 cursor-pointer"
                                        onClick={() => selectLocation(loc)}
                                    >
                                        <img src={locationIcon} className="w-6 h-6 mr-2" alt="Location Icon" />
                                        {loc}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="ml-5 mr-3 w-full relative">
                    <input
                        placeholder="Find Cars,Mobile Phones and More...."
                        className="w-full p-3 border-black border-solid border-2 rounded-md placeholder:text-ellipsis focus:outline-none focus:border-teal-300"
                    />
                    <div
                        style={{ backgroundColor: '#002f34' }}
                        className="flex justify-center items-center absolute top-0 right-0 h-full rounded-e-md w-12"
                    >
                        <img className="w-6" src={search} alt="Search Icon" />
                    </div>
                </div>

                <div className="mx-1 sm:ml-5 sm:mr-5 relative flex">
                    <p style={{ color: '#002f34' }} className="font-bold mr-3 cursor-pointer">
                        ENGLISH
                    </p>
                    <img className="w-5 cursor-pointer mr-3" src={arrow} alt="Arrow Icon" />
                </div>
                {auth?.user ?  <svg width="64px" height="24px" viewBox="0 0 1024 1024" data-aut-id="icon"  fillRule="evenodd"><path className="rui-w4DG7" d="M730.855 763.955h-435.559c-0.833-87.945-2.676-279.627-2.676-289.496 0-119.351 98.911-216.463 220.498-216.463s220.455 97.112 220.455 216.463c0 10-1.843 201.594-2.72 289.496v0zM819.282 748.603c0.92-93.341 2.062-266.38 2.062-274.144 0-141.589-98.692-260.545-231.64-294.319 2.192-7.237 3.684-14.782 3.684-22.765 0-44.345-35.969-80.27-80.27-80.27-44.345 0-80.27 35.923-80.27 80.27 0 7.983 1.491 15.483 3.684 22.765-132.948 33.731-231.64 152.687-231.64 294.319 0 7.721 1.14 182.339 2.019 276.030l-90.27 36.581 0.92 64.609h316.032c3.729 40.881 37.679 73.031 79.523 73.031s75.794-32.151 79.523-73.031h312.962l1.754-64.523-88.078-38.556z"></path></svg> : ''}
               
                <p
                    className="font-bold underline ml-4 cursor-pointer"
                    style={{ color: '#002f34' }}
                    onClick={handleAuthClick}
                >
                    {auth?.user ? 'Logout' : 'Login'}
                </p>
                <img
                    src={sellButton}
                    alt="Sell Button"
                    className="w-24 mx-1 sm:ml-5 sm:mr-5 shadow-xl rounded-full cursor-pointer"
                    onClick={handleSellClick}
                />

                {loginPop && !auth?.user && <Login setLoginPop={setLoginPop} />}
            </nav>

            <div className="w-full relative z-0 flex shadow-md p-2 pt-24 pl-10 pr-10 sm:pl-44 md:pr-44 sub-lists">
                <ul className="list-none flex items-center justify-between w-full">
                    <div className="flex flex-shrink-0">
                        <p className="font-semibold uppercase all-cats">All categories</p>
                        <img className="w-4 ml-2" src={arrow} alt="Arrow" />
                    </div>
                    {[
                        "Cars",
                        "Motorcycles",
                        "Mobile Phones",
                        "For sale : Houses & Apartments",
                        "Scooter",
                        "Commercial & Other Vehicles",
                        "For rent : Houses & Apartments",
                    ].map((category) => (
                        <li key={category}>{category}</li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Navbar;
