import { AudioPlayer } from "@/components/AudioPlayer";

const tracks = [
  "NM-205", "NM-209", "NM-208", "NM-197", "NM-153", "NM-155", 
  "NM-157", "NM-156", "NM-158", "NM-120", "NM-092", "NM-087",
  "NM-046", "NM-027", "NM-044", "NM-042", "NM-064", "NM-084",
  "NM-079", "NM-073", "NM-072", "NM-020", "NM-037"
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <header className="container mx-auto px-8 py-12 flex justify-between items-start">
        <h1 className="text-3xl font-semibold tracking-tight">
          𝐃𝐀𝐍𝐀 𝐍'𝐊𝐀𝐒𝐒𝐀
        </h1>
        <a 
          href="mailto:contact.danankassa@gmail.com"
          className="text-sm text-foreground/50 hover:text-foreground transition-colors duration-300 font-medium"
        >
          contact.danankassa@gmail.com
        </a>
      </header>

      <main className="container mx-auto px-8 pb-32">
        <div className="max-w-3xl mx-auto space-y-4">
          {tracks.map((trackId) => (
            <AudioPlayer key={trackId} trackId={trackId} />
          ))}
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 py-8 text-center pointer-events-none">
        <p className="text-xs text-foreground/30 font-medium tracking-wide">
          © Dana N'Kassa
        </p>
      </footer>
    </div>
  );
};

export default Index;
