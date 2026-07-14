const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const WORKFLOW_DIR = path.join(__dirname, 'workflow');

// Khởi tạo thư mục workflow nếu chưa có
if (!fs.existsSync(WORKFLOW_DIR)) {
    fs.mkdirSync(WORKFLOW_DIR, { recursive: true });
}

console.log('🚀 Đang xuất các workflow từ n8n...');
try {
    execSync('docker exec -i hotel-chatbot-n8n n8n export:workflow --backup --output=/home/node/workflow/', { stdio: 'inherit' });
} catch (error) {
    console.error('❌ Xuất workflow thất bại:', error.message);
    process.exit(1);
}

console.log('🔄 Đang đổi tên file theo tên đặt trên n8n...');
const files = fs.readdirSync(WORKFLOW_DIR);

files.forEach(file => {
    // Chỉ xử lý các file JSON có tên dạng ID (16 ký tự chữ và số) do n8n sinh ra
    if (file.endsWith('.json') && file !== 'workflows_backup.json' && /^[a-zA-Z0-9]{16}\.json$/.test(file)) {
        const filePath = path.join(WORKFLOW_DIR, file);
        try {
            const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            if (content && content.name) {
                // Loại bỏ các ký tự đặc biệt không hợp lệ trong đặt tên file của Windows
                const safeName = content.name.replace(/[\\/:*?"<>|]/g, '_').trim();
                const newFileName = `${safeName}.json`;
                const newFilePath = path.join(WORKFLOW_DIR, newFileName);
                
                // Thực hiện đổi tên và ghi đè nếu trùng
                fs.renameSync(filePath, newFilePath);
                console.log(`✅ Đã đổi: ${file} -> ${newFileName}`);
            }
        } catch (e) {
            console.error(`❌ Lỗi xử lý file ${file}:`, e.message);
        }
    }
});

console.log('🎉 Hoàn thành backup!');
