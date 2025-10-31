import React from "react";
import {
  ChevronRight,
  CheckCircle,
  Target,
  User,
  HeartPulse,
  Stethoscope,
} from "lucide-react";

// --- Data extracted directly from the image (HIV Treatment Cascade) ---
const CASCADE_DATA = [
  {
    title: "Estimated PLHIV (2025)",
    value: 252800,
    keyMetric: "Base Population",
    icon: Target,
    color: "text-red-600",
    bg: "bg-gray-50",
    topLabel: null,
    secondaryValue: null,
  },
  {
    title: "Diagnosed PLHIV",
    value: 144192,
    keyMetric: "57%",
    retentionFromPrev: 57,
    gapToFill: 95968,
    gapLabel: "PLHIV to be diagnosed",
    icon: User,
    color: "text-orange-600",
    bg: "bg-gray-50",
    topLabel: "PLHIV who know their HIV status",
    secondaryValue: 240160,
  },
  {
    title: "PLHIV on ART",
    value: 95556,
    keyMetric: "66%",
    retentionFromPrev: 66,
    gapToFill: 96771 + 35825,
    gapLabel:
      "PLHIV to be enrolled/returned to ART (96,771 enrolled, 35,825 returned)",
    icon: HeartPulse,
    color: "text-yellow-600",
    bg: "bg-gray-50",
    topLabel: "PLHIV on ART",
    secondaryValue: 228152,
  },
  {
    title: "Tested for VL",
    value: 51206,
    keyMetric: "54%",
    retentionFromPrev: 54,
    gapToFill: 165538,
    gapLabel: "PLHIV to be tested for viral load",
    icon: Stethoscope,
    color: "text-blue-600",
    bg: "bg-gray-50",
    topLabel: "PLHIV on ART who were tested for viral load",
    secondaryValue: 216744,
  },
  {
    title: "VL Suppressed",
    value: 44714,
    keyMetric: "47% of Tested",
    retentionFromPrev: 47,
    gapToFill: 172030,
    gapLabel: "PLHIV not virally suppressed",
    icon: CheckCircle,
    color: "text-green-600",
    bg: "bg-green-50",
    topLabel: "PLHIV on ART who are virally suppressed",
    secondaryValue: 44714,
  },
];

// Helper component for each stage in the cascade
const CascadeStep = ({ data }) => {
  // Check if this is the last step for rendering the connector
  const isLast = data.title === CASCADE_DATA[CASCADE_DATA.length - 1].title;
  const retention = data.retentionFromPrev;

  // Custom percentage display logic
  let percentLabel = data.keyMetric;
  if (retention && data.title !== CASCADE_DATA[0].title) {
    percentLabel = `${retention}% retained`;
  } else if (retention && isLast) {
    percentLabel = `Overall Success: ${retention}%`;
  }

  // Format numbers with commas
  const formattedValue = data.value.toLocaleString();
  const formattedSecondaryValue = data.secondaryValue
    ? data.secondaryValue.toLocaleString()
    : null;
  const formattedGap = data.gapToFill ? data.gapToFill.toLocaleString() : null;

  // Icons and colors
  const Icon = data.icon;

  return (
    <div className='relative flex flex-col items-stretch'>
      {/* 0. Top Label/Total */}
      {data.topLabel && (
        <div className='text-center mb-1 p-2 bg-indigo-50 border border-indigo-200 rounded-t-lg'>
          <p className='text-xs font-semibold text-red-700'>
            {formattedSecondaryValue}
          </p>
          <p className='text-xs text-red-600 italic leading-tight'>
            {data.topLabel}
          </p>
        </div>
      )}
      {/* 1. Main Step Card */}
      <div
        className={`flex-shrink-0 w-full p-5 rounded-b-xl ${
          !data.topLabel && "rounded-t-xl"
        } ${data.bg} border-2 border-dashed ${data.color.replace(
          "text-",
          "border-"
        )} shadow-md`}
      >
        {/* IMPROVEMENT START: Changed layout for better mobile stacking */}
        <div className='flex flex-col md:flex-row md:items-center items-start justify-start md:justify-between space-y-2 md:space-y-0'>
          <div className='flex items-center space-x-3'>
            <div className={`p-2 rounded-full ${data.bg} ${data.color} border`}>
              <Icon size={24} />
            </div>
            <div>
              <p className='text-sm font-medium text-gray-600'>{data.title}</p>
              <h4 className={`text-2xl font-bold ${data.color}`}>
                {formattedValue}
              </h4>
            </div>
          </div>
          <p className='text-xl font-extrabold text-gray-500 md:text-2xl'>
            {percentLabel}
          </p>
        </div>
        {/* IMPROVEMENT END */}
      </div>

      {/* 2. Gap to Fill / Retention Connector */}
      {!isLast && (
        <div className='relative flex flex-col items-center py-4'>
          {/* Chevron */}
          <div className='absolute left-1/2 -ml-3 transform -translate-x-1/2'>
            <ChevronRight className='w-6 h-6 text-gray-900 rotate-90' />
          </div>
          {/* Retention Line/Label */}
          <div className='text-center py-1'>
            {retention && (
              <p className='text-sm font-semibold text-gray-900 pt-5'>
                {retention}% retained from previous step
              </p>
            )}
            {data.gapLabel && (
              <p className='text-xs text-red-500 italic'>
                {formattedGap} {data.gapLabel}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const HIVCare = () => {
  return (
    // Responsive padding
    <div className='p-4 pt-30 md:p-8 md:pt-30'>
      <h1 className='text-3xl font-bold text-center text-gray-900 mb-8'>
        Philippine HIV Treatment and Care Progress
      </h1>

      {/* START: Side-by-Side Container (Stacks on mobile, row on lg) */}
      <div className='flex flex-col lg:flex-row max-w-7xl mx-auto gap-8'>
        {/* 1. Text and Definitions Container (Full width on all sizes) */}
        <div className='lg:w-5/12 w-full flex-shrink-0'>
          <h2 className='text-2xl font-bold text-gray-900 mb-4'>
            Overview and Progress
          </h2>
          {/* START: User's provided text and definitions */}
          <p className='text-gray-700 mb-3 border-t border-black pt-3'>
            The latest Philippine HIV estimates show that by the end of 2025,
            there will be 252,800 estimated People Living with HIV (PLHIV) in
            the country.
          </p>
          <p className='text-gray-700 mb-3'>
            As of June 2025, 144,192 (57% of the estimated) PLHIV have been
            diagnosed or laboratory-confirmed, and are currently living or not
            reported to have died. Further, 95,556 (66% of the diagnosed) PLHIV
            are currently on life-saving Antiretroviral Therapy (ART), of which
            51,206 (54%) PLHIV have been tested for viral load (VL) in the past
            12 months.
          </p>
          <p className='text-gray-700 mb-3'>
            Among those tested for VL, 44,714 (87%) were virally suppressed.
            However, only 47% were virally suppressed among PLHIV on ART [Figure
            1].
          </p>
          <p className='text-sm text-gray-500 italic border-t pt-3 mt-3'>
            Compared to the previous reporting period, diagnosis coverage
            increased by 2%, and viral suppression among PLHIV on ART increased
            by 7%, which can be attributed to more complete report submissions.
            Treatment coverage remained the same.
          </p>

          <h3 className='text-lg font-semibold text-gray-900 mb-2 mt-4'>
            Definitions
          </h3>
          <ul className='list-disc pl-5 text-gray-700 text-sm space-y-1'>
            <li>
              Diagnosed PLHIV: The total number of diagnosed or
              laboratory-confirmed HIV cases reported in the HIV/AIDS Registry
              who are currently alive or not yet reported to have died.
            </li>
            <li>
              PLHIV on ART: A PLHIV who is currently on ART is defined as having
              visited the facility for an antiretroviral (ARV) refill or
              accessed ARV refill, and has not run-out of pill for 30 days.
            </li>
            <li>
              Virally Suppressed PLHIV: PLHIV on ART who have viral load of ≤50
              copies/ml. Viral load refers to the amount of human
              immunodeficiency virus (HIV) present in an infected person's
              blood.
            </li>
          </ul>

          {/* START: Goal Status */}
          <p className='text-sm text-gray-600 border-t border-black pt-3 mt-3'>
            Goal Status: From an estimated <span> </span>
            <span className='font-semibold'>
              {CASCADE_DATA[0].value.toLocaleString()}
            </span>{" "}
            people, only <span> </span>
            <span className='font-semibold'>
              {CASCADE_DATA[CASCADE_DATA.length - 1].value.toLocaleString()}
            </span>{" "}
            are virally suppressed.
          </p>
          {/* END: Goal Status */}

          {/* END: User's provided text and definitions */}
        </div>

        {/* 2. Cascade Flow Container (Full width on all sizes) */}
        <div className='lg:w-7/12 w-full space-y-8 flex-shrink-0'>
          <h2 className='text-2xl font-bold text-gray-900 text-center lg:text-left'>
            HIV Treatment Cascade
          </h2>
          {CASCADE_DATA.map((data) => (
            <CascadeStep key={data.title} data={data} />
          ))}
        </div>
      </div>
      {/* END: Side-by-Side Container */}

      {/* START: New 95-95-95 Accomplishment Section */}
      <div className='mt-16 max-w-7xl mx-auto'>
        <h2 className='text-2xl font-bold text-center text-gray-900 mb-8'>
          95-95-95 ACCOMPLISHMENT, as of June 2025
        </h2>

        {/* 95-95-95 Progress Cards (Stacks on mobile, 3 columns on medium screens) */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          {/* 1st 95 */}
          <div className='bg-red-50 border border-red-300 rounded-lg p-6 text-center shadow-md'>
            <h3 className='text-lg font-semibold text-red-700 mb-2'>1ˢᵗ 95</h3>
            <p className='text-sm text-red-600 mb-4'>
              Diagnosing 95% of Estimated PLHIV
            </p>
            <p className='text-5xl font-extrabold text-red-800'>57%</p>
            <p className='text-xs text-gray-600 mt-4'>
              <span className='font-bold'>D :</span> Number of Diagnosed PLHIV
            </p>
            <p className='text-xs text-gray-600'>
              <span className='font-bold'>N :</span> Estimated Number of PLHIV
            </p>
          </div>

          {/* 2nd 95 */}
          <div className=' border border-blue-300 rounded-lg p-6 text-center shadow-md'>
            <h3 className='text-lg font-semibold text-blue-700 mb-2'>2ⁿᵈ 95</h3>
            <p className='text-sm text-blue-600 mb-4'>
              95% of Diagnosed PLHIV on Treatment
            </p>
            <p className='text-5xl font-extrabold text-blue-800'>66%</p>
            <p className='text-xs text-gray-600 mt-4'>
              <span className='font-bold'>D :</span> Number of PLHIV on ART
            </p>
            <p className='text-xs text-gray-600'>
              <span className='font-bold'>N :</span> Number of Diagnosed PLHIV
            </p>
          </div>

          {/* 3rd 95 */}
          <div className='bg-green-50 border border-green-300 rounded-lg p-6 text-center shadow-md'>
            <h3 className='text-lg font-semibold text-green-700 mb-2'>
              3ʳᵈ 95
            </h3>
            <p className='text-sm text-green-600 mb-4'>
              95% of Testing and Suppressing the viral load of PLHIV on
              treatment
            </p>
            <p className='text-5xl font-extrabold text-green-800'>47%</p>
            <p className='text-xs text-gray-600 mt-4'>
              <span className='font-bold'>D :</span> Number of VL Supp. PLHIV on
              ART
            </p>
            <p className='text-xs text-gray-600'>
              <span className='font-bold'>N :</span> Number of PLHIV on ART
            </p>
          </div>
        </div>

        {/* 95-95-95 Targets and Explanations (Already mobile-friendly, full-width) */}
        <div className='bg-white p-6 rounded-lg shadow-md border border-gray-200'>
          <h3 className='text-xl font-bold text-gray-900 mb-4'>
            The 95-95-95 Targets
          </h3>
          <p className='text-gray-700 mb-4'>
            The 95-95-95 by 2025 is the global targets set by the Joint United
            Nations Programme on HIV and AIDS (UNAIDS). The Philippines, as one
            of the states who committed to the "Political Declaration on HIV and
            AIDS: Ending Inequalities and Getting on Track to End AIDS by 2030"
            adopted during the General Assembly in June 2021, integrated these
            high-level targets in the 7th AIDS Medium Term Plan - 2023 to 2028
            Philippines Fast Tracking to 2030. It aims that by 2030, 95% of
            people living with HIV (PLHIV) know their HIV status or are
            diagnosed, 95% of PLHIV who know their status are receiving
            treatment (ART), and 95% of PLHIV on ART have a suppressed viral
            load so their immune system remains strong, and the likelihood of
            their infection being passed on is greatly reduced
            (Undetectable=Untransmissible).
          </p>

          <h3 className='text-xl font-bold text-gray-900 mb-4 mt-6'>
            The Philippine People Living with HIV (PLHIV) Estimates
          </h3>
          <p className='text-gray-700 mb-4'>
            The Philippines has been using the national PLHIV estimates to
            determine the state and trend of the epidemic in the country, to aid
            programmatic response and develop strategic plans, and to monitor
            progress towards the 95-95-95 targets. Annually, the National
            HIV/AIDS & STI Surveillance and Strategic Information Unit of the
            Department of Health-Epidemiology Bureau leads the process of
            developing the PLHIV estimates, which was modeled through the AIDS
            Epidemic Model (AEM) and Spectrum. The latest PLHIV estimates were
            updated in May 2024 with analyzed and triangulated data from the
            2023 HIV/AIDS & ART Registry of the Philippines (HARP), 2022
            Integrated HIV Behavioral and Serologic Surveillance (IHBSS), 2018
            and 2020 Online Survey among Males having Sex with Males and
            Transgender Women (MSM & TGW), 2019 facility-based survey, 2022
            Laboratory and Blood Bank Surveillance (LABBS), 2020 population
            census, and other program data. Further, the development of PLHIV
            estimates underwent comprehensive consultation, validation, and
            vetting process with technical experts from EastWest Center, UNAIDS,
            WHO, and key national, regional, and local program implementers and
            stakeholders. Previously released estimates in May 2023 were based
            on the IHBSS 2018, HARP December 2022, and Population Census 2020.
          </p>

          <h3 className='text-xl font-bold text-gray-900 mb-4 mt-6'>
            Definitions
          </h3>
          <ul className='list-disc pl-5 text-gray-700 space-y-2'>
            <li>
              <span className='font-semibold'>Diagnosed PLHIV:</span> The total
              number of diagnosed or laboratory-confirmed HIV cases reported in
              the HIV/AIDS Registry who are currently alive or not yet reported
              to have died.
            </li>
            <li>
              <span className='font-semibold'>PLHIV on ART:</span> A PLHIV who
              is currently on ART is defined as having visited the facility for
              an antiretroviral (ARV) refill or accessed ARV refill, and has not
              run-out of pill for 30 days.
            </li>
            <li>
              <span className='font-semibold'>Virally Suppressed PLHIV:</span>{" "}
              PLHIV on ART who have viral load of ≤50 copies/mL. Viral load
              refers to the amount of human immunodeficiency virus (HIV) present
              in an infected person’s blood.
            </li>
          </ul>
        </div>
      </div>
      {/* END: New 95-95-95 Accomplishment Section */}
    </div>
  );
};

export default HIVCare;
