const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full h-24 flex justify-center items-center bg-transparent transition-all duration-300">
      <ul className="flex gap-12 text-sm font-manrope font-medium tracking-[0.2em] text-white uppercase opacity-90 hover:opacity-100">
        <li className="cursor-pointer hover:text-gray-300 transition-colors">Home</li>
        <li className="cursor-pointer hover:text-gray-300 transition-colors">About</li>
        <li className="cursor-pointer hover:text-gray-300 transition-colors">Works</li>
        <li className="cursor-pointer hover:text-gray-300 transition-colors">Contact</li>
      </ul>
    </nav>
  );
};

export default Navbar;
