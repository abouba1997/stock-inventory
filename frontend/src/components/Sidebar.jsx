import { Link } from "react-router-dom"; // Assuming you're using React Router

const Sidebar = () => {
  return (
    <div className="flex h-screen fixed">
      <div className="bg-slate-100 w-64 flex flex-col">
        {/* Sidebar Header */}
        <div className="text-white p-4 text-xl font-bold">Your App</div>

        {/* Sidebar Links */}
        <div className="flex flex-col">
          <Link to="/dashboard" className="p-3 text-white hover:bg-gray-700">
            Dashboard
          </Link>
          <Link to="/inventory" className="p-3 text-white hover:bg-gray-700">
            Inventory
          </Link>
          <Link to="/suppliers" className="p-3 text-white hover:bg-gray-700">
            Suppliers
          </Link>
          <Link to="/sell" className="p-3 text-white hover:bg-gray-700">
            Sell
          </Link>
          <Link to="/buy" className="p-3 text-white hover:bg-gray-700">
            Buy
          </Link>
        </div>

        {/* Sidebar Footer */}
        <div className="mt-auto p-4">
          {/* Profile Image */}
          <div className="flex items-center space-x-2">
            <img
              src="path_to_your_profile_image"
              alt="Profile"
              className="h-8 w-8 rounded-full"
            />
            <span className="text-white">Your Name</span>
          </div>

          {/* Logout Button */}
          <button className="bg-red-500 text-white px-4 py-2 mt-4 rounded hover:bg-red-600">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
