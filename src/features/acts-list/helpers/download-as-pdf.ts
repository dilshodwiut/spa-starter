import html2canvas from "html2canvas";
import { jsPDF as JsPDF } from "jspdf";

export default function downloadAsPdf(
  element: HTMLElement,
  filename: string,
): void {
  void html2canvas(element).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new JsPDF();
    pdf.addImage({
      imageData: imgData,
      format: "JPEG",
      x: 0,
      y: 0,
      width: 0, // ?
      height: 0, // ?
    });
    pdf.save(`${filename}.pdf`);
  });
}
