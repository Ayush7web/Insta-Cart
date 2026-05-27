import { ArrowRightIcon, LeafIcon } from 'lucide-react'
import heroSectionData from '../../assets/hero_bg.jpeg'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className="relative overflow-hidden min-h-105 mb-10 rounded-3xl flex items-center">
      <img
        src={heroSectionData}
        alt="hero"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-linear-to-r from-green-900 to-transparent" />

      {/* ab rakhege apne text or... chizon ko */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-7xl xl:pl-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-semibold text-orange-300 bg-orange-300/10 rounded-full mb-5">
            <LeafIcon className="size-5" /> Farm-Fresh & Organic
          </span>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-5 ">
            Nourish Your Home with{" "}
            <span className="text-orange-300"> Earth's Finest</span>
          </h1>

          {/* for desciption */}
          <p className="text-base text-white/70 leading-relaxed mb-8 max-w-md">
            Food is any nutritious substance consumed to provide energy,
            maintain life, and stimulate growth. It is primarily composed of
            water, carbohydrates, proteins, and fats. 
          </p>

          <div className='flex flex-wrap gap-3'>
            {/* 1111111111111111111111 */}
            <Link
              to="/products"
              className="px-7 py-3 bg-orange-400 text-white font-semibold rounded-full hover:bg-orange-500 transition-all flex items-center  gap-4 active:scale-[0.98]"
            >
              Shop Now <ArrowRightIcon className="size-5" />
            </Link>
            {/* 22222222222222222222222222222 */}
            <Link
              to="/products"
              className="px-7 py-3 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 transition-all border border-white/20"
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero