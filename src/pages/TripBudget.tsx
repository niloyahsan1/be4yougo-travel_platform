import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TripBudgetCalculator from "@/components/TripBudgetCalculator";
import { Calculator } from "lucide-react";

const TripBudget = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/60 via-white to-white">
      <Navbar />
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase text-blue-700 bg-blue-100 px-3 py-1 rounded-full mb-3">
              <Calculator className="h-3 w-3" /> Trip Budget
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-3 tracking-tight">
              Heading to <span className="text-blue-600">Cox's Bazar</span>, <span className="text-blue-600">Bandarban</span> or <span className="text-blue-600">Tanguar Haor</span>?
            </h1>
            <p className="text-base text-slate-600 max-w-xl mx-auto">
              Plan it here — real hotel prices, real transport fares, all added up for you.
            </p>
          </div>
          <TripBudgetCalculator />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TripBudget;