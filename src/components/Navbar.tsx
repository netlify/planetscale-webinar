import AddToSlack from "./AddToSlack";

const Navbar = () => {
  return (
    <nav className="border-b shadow border-gray-100 w-full">
      <div className="container mx-auto px-2">
        <div className="flex items-center h-16">
          <h1>Slackers</h1>
          <div className="ml-auto flex items-center h-16">
            <AddToSlack />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
