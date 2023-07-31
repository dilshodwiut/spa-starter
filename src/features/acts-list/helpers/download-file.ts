import { uid } from "radash";

export default function downloadFile(url: string, filename: string): void {
  const xhr = new XMLHttpRequest();
  xhr.responseType = "blob";
  xhr.open("GET", url, true);
  xhr.onload = () => {
    if (xhr.status === 200) {
      const blob = xhr.response;
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `violation_file_${uid(16, "-")}_${filename}`;
      link.click();
    }
  };
  xhr.send();
}
