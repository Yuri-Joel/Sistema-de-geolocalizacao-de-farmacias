 import { PDFDocument, rgb } from 'pdf-lib';
import * as htmlToImage from 'html-to-image';
import logo from '../assets/Geo Farma/Geo Farma.png'  
 

export  const generatePDF = async (chartRef, tipo) => {

 
 // Capturar a imagem do gráfico Recharts
  const chartImage = await htmlToImage.toPng(chartRef.current);

  // Criar um novo documento PDF
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();

  // Adicionar a imagem ao documento PDF
  const chartPng = await pdfDoc.embedPng(chartImage);
  
  page.drawImage(chartPng, {
   x: 50,
   y: 500,
   width: chartPng.width / 2,
   height: chartPng.height / 2,
   colorRgb: rgb(0, 0, 0), // Cor da imagem
  });

  const logoData = await fetch(logo).then((res) => res.arrayBuffer());
    const logoPng = await pdfDoc.embedPng(logoData); // Use a imagem importada aqui
  page.drawImage(logoPng, {
    x: page.getWidth() - 200,
    y: page.getHeight() - 150, // Ajustando a posição vertical
    width: 100,
    height: 100,
    colorRgb: rgb(0, 0, 0),
  });
// Adicionar frases de relatório com a data
const currentDate = new Date().toLocaleDateString();
page.drawText(`Relatório gerado em: ${currentDate}`, {
 x: 50,
 y: 470,
 size: 12,
});


  // Adicionar informações adicionais ao relatório com indentação
  const additionalInfo = `Esta folha impresso serve como um recurso valioso para profissionais
de saúde, autoridades locais e membros da comunidade, fornecendo informações 
essenciais sobre a infraestrutura farmacêutica disponível. A análise
dos dados contidos nesta folha impresso pode orientar políticas e iniciativas destinadas 
a melhorar o acesso e a disponibilidade de serviços farmacêuticos em nossa comunidade.`;

  page.drawText(additionalInfo, {
    x: 50,
    y: 400,
    size: 12,
  });
  page.drawText(`Titulo: ${tipo}`, {
    x: 50,
    y: 250,
    size: 12,
  });

  // Adicionar espaço para o Gestor ou admin digitar seu nome
  page.drawText('Nome: ___________________________________', {
    x: 50,
    y: 200,
    size: 12,
  });
  // Salvar o documento PDF
  const pdfBytes = await pdfDoc.save();

  // Criar um Blob para o arquivo PDF
  const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

  // Criar um URL para o Blob
  const pdfUrl = URL.createObjectURL(pdfBlob);

  // Criar o link para download do PDF
  const downloadLink = document.createElement('a');
  downloadLink.href = pdfUrl;
  downloadLink.download = 'grafico.pdf'; // Nome do arquivo PDF
  downloadLink.click(); 
 }
