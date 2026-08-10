import { Truck, ShieldCheck, RotateCcw, BadgeCheck } from "lucide-react";

const features = [
  {
    id: 1,
    title: "Fast Delivery",
    description:
      "Get your orders delivered quickly with our trusted shipping partners.",
    icon: Truck,
  },
  {
    id: 2,
    title: "Secure Payment",
    description:
      "Your payments are protected with industry-standard encryption.",
    icon: ShieldCheck,
  },
  {
    id: 3,
    title: "Easy Returns",
    description: "Changed your mind? Enjoy hassle-free returns within 7 days.",
    icon: RotateCcw,
  },
  {
    id: 4,
    title: "Premium Quality",
    description:
      "We offer only genuine, high-quality products from trusted brands.",
    icon: BadgeCheck,
  },
];

const WhyChooseUs = () => {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Main Glass Panel */}
        <div
          className="
            overflow-hidden
            rounded-3xl
            border
            border-gray-200/70
            bg-white/60
            backdrop-blur-xl
            shadow-[0_15px_50px_rgba(0,0,0,0.05)]
          "
        >
          {/* Header */}
          <div
            className="
              border-b
              border-gray-200/70
              px-6
              py-12
              text-center
              sm:px-10
              sm:py-14
            "
          >
            <div className="mb-3 flex items-center justify-center gap-2">
              <span className="h-px w-7 bg-blue-600" />

              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                Why Shop With Us
              </span>

              <span className="h-px w-7 bg-blue-600" />
            </div>

            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              Shopping Made Simple
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
              From secure checkout to fast delivery, we're focused on making
              every part of your shopping experience effortless.
            </p>
          </div>

          {/* Features */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.id}
                  className={`
                    group
                    px-6
                    py-9
                    text-center
                    transition-colors
                    duration-300
                    hover:bg-blue-50/40
                    sm:px-8

                    ${
                      index !== features.length - 1
                        ? "border-b border-gray-200/70 lg:border-b-0 lg:border-r"
                        : ""
                    }

                    ${
                      index === 1
                        ? "sm:border-r sm:border-gray-200/70 lg:border-r"
                        : ""
                    }

                    ${index === 2 ? "sm:border-b-0" : ""}
                  `}
                >
                  {/* Icon */}
                  <div
                    className="
                      mx-auto
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-xl
                      bg-blue-50
                      text-blue-600
                      transition-all
                      duration-300
                      group-hover:bg-blue-600
                      group-hover:text-white
                    "
                  >
                    <Icon size={23} strokeWidth={1.6} />
                  </div>

                  {/* Title */}
                  <h3 className="mt-5 text-base font-semibold text-gray-900">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-gray-500">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
