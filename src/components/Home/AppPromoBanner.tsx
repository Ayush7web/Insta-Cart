import Truck from "../../assets/truck.jpg";

const AppPromoBanner = () => {
  const appPromoBanner = {
    title: "Get Fresh Groceries in Minutes",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore culpa, nostrum porro maiores minima id magni. Repellat, at! Eius quas ex ab fuga vel. Molestiae autem inventore eligendi molestias cum. lorem encapsulate Lore",
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 my-14 bg-green-950 rounded-2xl ">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 xl:px-10">
        {/* left side content */}
        <div className="text-center md:text-left">
          <h2 className="font-serif text-3xl sm:text-4xl mb-3 text-white">
            {appPromoBanner.title}
          </h2>
          <p className="text-white/70 mb-6 max-w-md">
            {appPromoBanner.description}
          </p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <button className="px-6 py-3 bg-white text-green-950 font-semibold rounded-xl hover:bg-orange-600">
              App Store
            </button>
            <button className="px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transform-colors border border-white/20">
              Google Play
            </button>
          </div>
        </div>

        {/* right side content */}
        <img
          src={Truck}
          alt="Delivery trck"
          className="max-w-1/2 sm:max-w-1/3 pr-10 sm:rounded-2xl rounded-3xl "
        />
      </div>
    </section>
  );
};

export default AppPromoBanner;
