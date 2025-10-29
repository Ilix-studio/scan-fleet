import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, User, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const DecisionPage = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSelection = (option: string) => {
    setSelectedOption(option);
  };

  const handleContinue = () => {
    if (selectedOption === "B2B") {
      navigate("/signup");
    } else if (selectedOption === "B2C") {
      navigate("/dashboard");
    }
  };

  const options = [
    {
      id: "B2B",
      title: "B2B",
      subtitle: "Unlimited Tokens",
      description: "API Integration",
      features: ["Dashboard", "Analytics", "Bulk Generation"],
      icon: Building2,
      gradient: "from-cyan-500 to-blue-600",
      bgGlow: "bg-cyan-500/20",
    },
    {
      id: "B2C",
      title: "B2C",
      subtitle: "15 tokens",
      description: "Personal Use",
      features: ["Easy Setup", "Family Safety", "Emergency Features"],
      icon: User,
      gradient: "from-purple-500 to-pink-600",
      bgGlow: "bg-purple-500/20",
    },
  ];

  return (
    <div className='min-h-screen w-full relative bg-black flex items-center justify-center'>
      {/* Background gradient */}
      <div
        className='absolute inset-0 z-0'
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 50% 50%, rgba(255, 20, 147, 0.15), transparent 50%),
            radial-gradient(ellipse 160% 130% at 10% 10%, rgba(0, 255, 255, 0.12), transparent 60%),
            radial-gradient(ellipse 160% 130% at 90% 90%, rgba(138, 43, 226, 0.18), transparent 65%),
            radial-gradient(ellipse 110% 50% at 80% 30%, rgba(255, 215, 0, 0.08), transparent 40%),
            #000000
          `,
        }}
      />

      <div className='relative z-10 max-w-4xl mx-auto px-4'>
        {/* Header */}
        <div className='text-center mb-16'>
          <h1 className='text-4xl sm:text-5xl font-bold mb-4 text-white'>
            Select One
          </h1>
          <p className='text-white/70 text-lg max-w-2xl mx-auto'>
            Choose the plan that best fits your needs
          </p>
        </div>

        {/* Options Grid */}
        <div className='grid md:grid-cols-2 gap-9 mb-15'>
          {options.map((option) => {
            const Icon = option.icon;
            const isSelected = selectedOption === option.id;

            return (
              <div
                key={option.id}
                onClick={() => handleSelection(option.id)}
                className={`relative group cursor-pointer transition-all duration-300 px-4 ${
                  isSelected ? "scale-105" : "hover:scale-102"
                }`}
              >
                {/* Glow Effect */}
                <div
                  className={`absolute -inset-1 ${
                    option.bgGlow
                  } rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300  px-4 ${
                    isSelected ? "opacity-60" : ""
                  }`}
                ></div>

                {/* Main Card */}
                <div
                  className={`relative bg-white/5 backdrop-blur-xl border rounded-2xl p-8 transition-all duration-300  ${
                    isSelected
                      ? "border-white/30 bg-white/10"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  {/* Selection Indicator */}
                  {isSelected && (
                    <div className='absolute top-4 right-4'>
                      <CheckCircle size={24} className='text-green-400' />
                    </div>
                  )}

                  {/* Icon */}
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${option.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                  >
                    <Icon size={32} className='text-white' />
                  </div>

                  {/* Content */}
                  <div className='space-y-4'>
                    <div>
                      <h3 className='text-2xl font-bold text-white mb-1'>
                        {option.title}
                      </h3>
                      <p className='text-lg text-white/80'>{option.subtitle}</p>
                      <p className='text-sm text-white/60'>
                        {option.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className='space-y-2'>
                      {option.features.map((feature, index) => (
                        <div key={index} className='flex items-center gap-2'>
                          <div className='w-1.5 h-1.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full'></div>
                          <span className='text-sm text-white/70'>
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Continue Button */}
        {selectedOption && (
          <div className='text-center'>
            <Button
              onClick={handleContinue}
              className='bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white border-0 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200'
            >
              <span className='flex items-center gap-2'>
                Continue
                <ArrowRight size={20} />
              </span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DecisionPage;
