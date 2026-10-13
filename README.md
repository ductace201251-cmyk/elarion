# ELARION: War of Six Elements — Website giới thiệu

Website frontend 4 trang dành cho dự án boardgame fantasy chiến thuật **ELARION**, sử dụng bộ ảnh ELARION gốc do nhóm cung cấp.

## Các trang

- **`elarion.html` — Home:** hero/banner, giới thiệu thế giới, 6 tộc hệ, preview 6 nhân vật và board game.
- **`character.html` — Character:** 6 thẻ nhân vật; nhấp thẻ để xem hồ sơ gồm tổng quan, năng lực, cốt truyện. Đường dẫn trực tiếp: `character.html?character=noctis#profile` (thay `noctis` bằng `veyron`, `selphira`, `fenrir`, `inazumi`, `druvis`).
- **`product.html` — Product:** giới thiệu game, đặc điểm chiến thuật và 9 hạng mục trong hộp game.
- **`about.html` — About Us:** thông tin dự án, 5 thành viên theo thứ tự, chức vụ và liên hệ.

## Chạy thử trên laptop

1. Giải nén file ZIP.
2. Mở thư mục `ELARION_Website` rồi mở file `elarion.html` bằng Chrome, Edge hoặc Firefox.
3. Có thể sử dụng máy chủ cục bộ để các liên kết và lịch sử trang hoạt động ổn định hơn:

   ```bash
   cd ELARION_Website
   python -m http.server 8000
   ```

   Sau đó mở `http://localhost:8000/elarion.html` trên trình duyệt.

## Đưa lên Internet

Toàn bộ là **website tĩnh**, không yêu cầu Node, cơ sở dữ liệu hay backend. Có thể upload nguyên các file trong thư mục `ELARION_Website` lên GitHub Pages, Netlify, Cloudflare Pages hoặc một dịch vụ hosting web tĩnh khác. Trang chủ chính là `elarion.html`; giữ `index.html` làm file chuyển hướng tương thích cho hosting tĩnh.

> Gói này **chưa được đưa lên hosting/công khai** và không có URL công khai. Cần triển khai riêng nếu muốn người khác truy cập qua Internet.

## Ghi chú

- Màu chủ đạo: xanh navy / xanh lam và vàng kim; tương thích desktop/tablet/mobile.
- Bộ ảnh nhân vật, ảnh game, banner và chân dung thành viên dùng WebP đã được tối ưu; riêng logo dùng PNG gốc trong suốt để bảo toàn chi tiết hình và tỷ lệ.
- Mẫu hiển thị đầy đủ văn bản tiểu sử của tài liệu; phần hình **Inazumi** được dùng ở dạng minh họa chân dung trong hồ sơ thay vì ảnh toàn thân vì bộ gốc có bản poster nhân vật.
- Đã sửa lỗi font tiếng Việt: toàn bộ website dùng hệ font hỗ trợ dấu tiếng Việt (`Segoe UI`, `Noto Sans`, `Tahoma`, `Arial`) — không cần Internet hoặc Google Fonts, không bị ghép font khác nhau giữa các chữ có dấu.
- Tất cả trang sử dụng mã hóa UTF-8 và khai báo `lang="vi"`.
- Liên kết fanpage: https://www.facebook.com/Elarionboardgame ; email: Elarion.boardgame@gmail.com.
- `assets/js/characters.js` chứa toàn bộ thông tin nhân vật; có thể sửa nội dung tại đây.
- Đây là website giới thiệu, **chưa có đặt hàng/giỏ hàng hoặc chức năng thanh toán**.

## Cấu trúc thư mục

```text
ELARION_Website/
├── elarion.html (trang chủ chính)
├── index.html (chuyển hướng đến elarion.html)
├── character.html
├── product.html
├── about.html
├── assets/
│   ├── css/style.css
│   ├── js/app.js
│   ├── js/characters.js
│   ├── js/character-page.js
│   └── images/ (21 hình)
└── README.md
```

- Đã sửa logo ELARION trên Home, Character, Product, About Us: dùng ảnh logo gốc do nhóm cung cấp (`assets/images/elarion-logo-original.png`), không kéo dãn chiều dọc; giữ tỷ lệ tự nhiên trên desktop và mobile.
