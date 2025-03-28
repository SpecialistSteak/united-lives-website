import Image from "next/image";
import "@/styles/loading-component.css";

export default function LoadingComponent() {
  return (
    <div className="loading-component">
      <Image
        src="/Images/loading.webp"
        alt=""
        // alt="Loading..."
        width={50}
        height={50}
      />
      <p>Loading...</p>
    </div>
  );
}
