import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { saveAs } from "file-saver";

type Etiqueta = {
  nome: string;
  codigo: string;
  base64: string;
};

// Função para desenhar uma única etiqueta no PDF
// Supondo que no PDF você deseja desenhar a imagem do barcode e, logo abaixo, centralizar o nome.
async function drawEtiqueta(
  page: any,
  etiqueta: Etiqueta,
  x: number,
  y: number,
  font: any,
  pdfDoc: PDFDocument
) {
  const barcodeWidth = 120;
  const barcodeHeight = 50;
  const gap = 5;
  const fontSize = 10;
  
  // Primeiro, desenha a imagem do código de barras.
  const imageBytes = await fetch(etiqueta.base64).then((res) => res.arrayBuffer());
  const image = await pdfDoc.embedPng(imageBytes);
  page.drawImage(image, {
    x,
    y: y - barcodeHeight,
    width: barcodeWidth,
    height: barcodeHeight,
  });
  
  // Em seguida, calcula a largura do texto do nome.
  const textWidth = font.widthOfTextAtSize(etiqueta.nome, fontSize);
  // Posiciona o texto centralizando-o em relação à largura do barcode.
  const textX = x + (barcodeWidth - textWidth) / 2;
  
  // Desenha o nome centralizado logo abaixo do barcode.
  page.drawText(etiqueta.nome, {
    x: textX,
    y: y - barcodeHeight - gap - fontSize,
    size: fontSize,
    font,
    color: rgb(0, 0, 0)
  });
}


// Função para verificar se há espaço na página para desenhar a próxima linha de etiquetas
function needsNewPage(currentY: number, margin: number, etiquetaHeight: number): boolean {
  return currentY < margin + etiquetaHeight;
}

// Função para gerar o PDF com múltiplas etiquetas, criando novas páginas se necessário
export async function gerarPdfEtiquetas(etiquetas: Etiqueta[]) {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Dimensões da página A4 (em pontos)
  const pageWidth = 595;
  const pageHeight = 842;
  const margin = 30;

  // Configuração da grade de etiquetas
  const etiquetasPorLinha = 3;
  const etiquetaWidth = 170;   // Espaço alocado para cada etiqueta (horizontalmente)
  const etiquetaHeight = 100;  // Espaço alocado para cada etiqueta (verticalmente)
  const horizontalGap = 10;
  const verticalGap = 20;

  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let currentY = pageHeight - margin;

  // Itera pelas etiquetas e posiciona cada uma na grade
  for (let i = 0; i < etiquetas.length; i++) {
    const etiqueta = etiquetas[i];
    const col = i % etiquetasPorLinha;

    // Se for o início de uma nova linha
    if (i !== 0 && col === 0) {
      currentY -= etiquetaHeight + verticalGap;
      
      // Se não houver espaço suficiente na página, cria uma nova
      if (needsNewPage(currentY, margin, etiquetaHeight)) {
        page = pdfDoc.addPage([pageWidth, pageHeight]);
        currentY = pageHeight - margin;
      }
    }

    const x = margin + col * (etiquetaWidth + horizontalGap);
    const y = currentY;

    await drawEtiqueta(page, etiqueta, x, y, font, pdfDoc);
  }

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  saveAs(blob, "etiquetas_supervisores.pdf");
}
