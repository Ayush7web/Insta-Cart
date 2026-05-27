

import {   LeafIcon, LucideBike, TruckElectricIcon, VeganIcon, type LucideIcon } from "lucide-react";


type Feature = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

// const PlaceholderIcon : String 

const heroSectionData: { hero_features: Feature[] } = {
  hero_features: [
    {
      icon: TruckElectricIcon,
      title: "Fast Delivery",
      desc: "Get your groceries delivered quickly and reliably.",
    },
    {
      icon: LeafIcon,
      title: "100% Organic",
      desc: "Get your groceries delivered quickly and reliably.",
    },
    {
      icon: VeganIcon,
      title: "Fresh Items",
      desc: "Get your groceries delivered quickly and reliably.",
    },
    {
      icon: LucideBike,
      title: "Free Delivery",
      desc: "Get your groceries delivered quickly and reliably.",
    },
  ],
};

const Features = () => {
  return (
    <section className="bg-white py-5 border/80 rounded-xl">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {heroSectionData.hero_features.map((feature, i) => (
            <div key={i} className="flex items-center gap-3 py-3">
              <div className="size-10 rounded-lg flex items-center shrink-0">
                {(() => {
                  const Icon = feature.icon;
                  return <Icon className="size-5" />;
                })()}
              </div>

              <div>
                <p className="text-sm font-semibold text-red-500">
                  {feature.title}
                </p>
                <p className="text-sm text-lime-700 font-semibold">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
