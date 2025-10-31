import React from "react";

// --- Helper Component for the Video Embed ---
/**
 * A reusable component for embedding a single YouTube video using an iframe.
 * Uses Tailwind classes to enforce a 16:9 aspect ratio and add styling.
 * Now accepts and displays an optional 'description' field.
 */
const YouTubeEmbed = ({
  videoId,
  title,
  url,
  channel,
  description, // <-- Added description prop
  isFeatured = false,
}) => (
  <div className='flex flex-col h-full'>
    {/* Aspect ratio wrapper (56.25% padding-bottom = 16:9 ratio) */}
    {/* Setting aspect ratio to 16:9 */}
    <div className='relative w-full pb-[56.25%] rounded-lg shadow-xl overflow-hidden transform transition duration-300 hover:scale-[1.02] hover:shadow-2xl'>
      <iframe
        className='absolute top-0 left-0 w-full h-full'
        // Use the video ID for a clean embed source
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      ></iframe>
    </div>
    {/* Video Metadata for context (This is the standard YouTube style: title, channel, and description below the video) */}
    <div
      className={`mt-4 p-2 ${
        isFeatured ? "text-left" : "text-center md:text-left"
      }`}
    >
      <a
        href={url}
        target='_blank'
        rel='noopener noreferrer'
        // Larger title for featured video
        className={`font-semibold text-gray-800 hover:text-red-600 transition duration-150 block ${
          isFeatured ? "text-xl md:text-2xl" : "text-lg"
        }`}
      >
        {title}
      </a>
      <p className='text-sm text-gray-500'>{channel}</p>
      {/* Description display for non-featured videos */}
      {!isFeatured && description && (
        <p className='mt-2 text-sm text-gray-600'>{description}</p>
      )}
    </div>
  </div>
);

// --- The HIV-Connect Section Component ---
/**
 * Component for the HIV Awareness & Prevention Videos section (HIV-Connect).
 */
const VideoSection = () => {
  // Video data with added description field for all videos
  const videoData = [
    {
      id: "9zJHwHOZEZE",
      title: "Pia Wurtzbach HIV 101",
      channel: "LoveYourselfTV",
      url: "https://www.youtube.com/watch?v=9zJHwHOZEZE",
      description:
        "A simple and direct awareness video produced by LoveYourself Inc. featuring Pia Wurtzbach explaining the basics of HIV — what it is, how it’s transmitted, and why knowing one’s status matters. The goal is to demystify the subject and reduce stigma.",
    },
    {
      id: "xey9_igenyw",
      title: "#LightUpPH2020: Red Ribbon",
      channel: "LoveYourselfTV",
      url: "https://www.youtube.com/watch?v=xey9_igenyw",
      description:
        "A campaign video tied to the Red Ribbon symbol for HIV / AIDS awareness in the Philippines. It features visuals and messages encouraging solidarity, remembrance, and collective action in the face of HIV.",
    },
    {
      id: "sbXqV1I39Co",
      title: "PrEPPY Camber updated",
      channel: "LoveYourselfTV",
      url: "https://www.youtube.com/watch?v=sbXqV1I39Co",
      description:
        "An awareness video promoting Pre-Exposure Prophylaxis (PrEP) as a highly effective tool for preventing HIV. It focuses on accessibility and normalizing the conversation around PrEP.",
    },
    {
      id: "fbHy2OjPgLM",
      title: "Acting on HIV: Questions about Love",
      channel: "LoveYourselfTV",
      url: "https://www.youtube.com/watch?v=fbHy2OjPgLM",
      description:
        "A short film or public service announcement discussing relationship dynamics, love, and sexual health in the context of HIV, promoting safe practices and open communication.",
    },
    {
      id: "OWvhVfp9ONc", // Extracted from the long Facebook URL
      title:
        "#WorldAIDSDay: We Stand With You by Pia Wurtzbach and Catriona Gray",
      channel: "LoveYourselfTV",
      url: "https://www.youtube.com/watch?v=OWvhVfp9ONc",
      description:
        "A campaign video released for World AIDS Day featuring Pia Wurtzbach and Catriona Gray. It emphasizes solidarity with people living with HIV, the message that they are not alone, and reinforces themes of testing, treatment, and the principle “Undetectable = Untransmittable” (U=U).",
    },
  ];

  // Separate the featured video and the remaining videos
  const featuredVideo = videoData[0];
  const remainingVideos = videoData.slice(1);

  // Use the description directly from the featuredVideo object for the sidebar
  const featuredDescription = featuredVideo.description;

  return (
    <section className='pt-30 pb-12 md:pb-16 min-h-screen bg-gray-50'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <header className='text-center mb-10'>
          <h2 className='text-3xl font-extrabold text-gray-900 sm:text-3xl tracking-tight'>
            HIV Awareness & Prevention Videos
          </h2>
          <p className='mt-4 text-xl text-gray-600 max-w-3xl mx-auto'>
            Informative campaigns and short films to help demystify HIV, reduce
            stigma, and promote testing and treatment.
          </p>
        </header>

        {/* --- Featured Video Section --- */}
        <div className='max-w-6xl mx-auto mb-16'>
          <h3 className='text-2xl font-bold text-gray-800 mb-4 text-center md:text-left'>
            Featured Video: HIV 101
          </h3>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Featured video takes 2/3rds of the width on large screens */}
            <div className='lg:col-span-2'>
              <YouTubeEmbed
                videoId={featuredVideo.id}
                title={featuredVideo.title}
                url={featuredVideo.url}
                channel={featuredVideo.channel}
                isFeatured={true}
                // Description is not passed here as it's displayed in the sidebar
              />
            </div>
            {/* Quick Info Sidebar/List of all videos takes 1/3rd */}
            <div className='lg:col-span-1 p-8 bg-white rounded-lg shadow-md border-l-4 border-black'>
              <h4 className='text-3x1 font-bold text-gray-800 mb-4'>Details</h4>
              <ul className='space-y-3 text-sm text-gray-700'>
                <li className='flex items-start'>
                  {/* Using the description from the videoData object */}
                  <span>{featuredDescription}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* --- Remaining Videos Grid (YouTube Style) --- */}
        <div className='max-w-6xl mx-auto'>
          <h3 className='text-2xl font-bold text-gray-800 mb-6 text-center md:text-left'>
            More Awareness Videos
          </h3>
          {/* Reverting to a standard grid: 1 column on mobile, 2 columns on PC */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {remainingVideos.map((video, index) => (
              <YouTubeEmbed
                key={index}
                videoId={video.id}
                title={video.title}
                url={video.url}
                channel={video.channel}
                description={video.description} // <-- Passing the description here
                // isFeatured is false by default, allowing the title/channel/description to show underneath
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
