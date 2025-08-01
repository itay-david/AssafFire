type Props = {
  title: string;
  youtubeUrl: string;
};

export default function VideoCard({ title, youtubeUrl }: Props) {
  const videoId = youtubeUrl.split("v=")[1];
  return (
    <div className="bg-white shadow rounded p-3">
      <iframe
        className="w-full aspect-video"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allowFullScreen
      ></iframe>
      <h3 className="mt-2 text-right font-bold">{title}</h3>
    </div>
  );
}
