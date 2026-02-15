const BackgroundVideo = () => (
  <video
    autoPlay
    loop
    muted
    playsInline
    preload="metadata"
    className="absolute inset-0 w-full h-full object-cover z-0"
  >
    <source src="/videos/mainPoster.mp4" type="video/mp4" />
    <source src="/videos/mainPoster.webm" type="video/webm" />
  </video>
);

export default BackgroundVideo;
