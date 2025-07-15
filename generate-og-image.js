const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generateOGImage() {
  console.log('OG 이미지 생성을 시작합니다...');
  
  // 브라우저 실행
  const browser = await puppeteer.launch({
    headless: 'new', // 새로운 headless 모드 사용
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    // 새 페이지 열기
    const page = await browser.newPage();
    
    // 뷰포트 설정 (OG 이미지 크기)
    await page.setViewport({
      width: 1200,
      height: 630,
      deviceScaleFactor: 1
    });
    
    // HTML 파일 경로
    const htmlPath = path.join(__dirname, 'og-image-template.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    // HTML 콘텐츠 로드
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    // 스크린샷 찍기
    const outputPath = path.join(__dirname, 'public', 'asset', 'og-image.png');
    await page.screenshot({
      path: outputPath,
      type: 'png',
      fullPage: false
    });
    
    console.log(`OG 이미지가 성공적으로 생성되었습니다: ${outputPath}`);
  } catch (error) {
    console.error('OG 이미지 생성 중 오류 발생:', error);
  } finally {
    // 브라우저 닫기
    await browser.close();
  }
}

// 스크립트 실행
generateOGImage();
