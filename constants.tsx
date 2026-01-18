
import { Factor, Category, Fact } from './types';

export const LLSX_FACTORS: Factor[] = [
  { id: 'l-1', name: 'Intern Logic', description: 'Cơ bản, mới bắt đầu', weight: 5, category: Category.LLSX, icon: '🐣', tooltip: 'Sức lao động sơ khai.' },
  { id: 'l-2', name: 'Senior Architect', description: 'Thiết kế hệ thống lớn', weight: 40, category: Category.LLSX, icon: '🏗️', tooltip: 'LLSX trình độ cao.' },
  { id: 'l-3', name: 'AI Mastery', description: 'Tối ưu hóa bằng AI', weight: 35, category: Category.LLSX, icon: '🧬', tooltip: 'Trí tuệ cách mạng.' },
  { id: 'l-4', name: 'Cloud Expert', description: 'AWS/Azure/GCP', weight: 25, category: Category.LLSX, icon: '☁️', tooltip: 'Công cụ số hiện đại.' },
  { id: 'l-5', name: 'Nhiệt huyết FPT', description: 'Tinh thần "FPT-er"', weight: 15, category: Category.LLSX, icon: '🔥', tooltip: 'Yếu tố con người quyết định.' },
  { id: 'l-6', name: 'IELTS 7.5+', description: 'Năng lực hội nhập', weight: 20, category: Category.LLSX, icon: '🌍', tooltip: 'Mở rộng phạm vi LLSX.' },
  { id: 'l-7', name: 'Java/C# Hard-core', description: 'Kỹ năng cốt lõi', weight: 30, category: Category.LLSX, icon: '💻', tooltip: 'Công cụ lao động kỹ thuật.' },
  { id: 'l-8', name: 'Tiếng Nhật N2', description: 'Thị trường Nhật Bản', weight: 18, category: Category.LLSX, icon: '🗾', tooltip: 'Kỹ năng chuyên biệt.' }
];

export const QHSX_FACTORS: Factor[] = [
  { id: 'q-1', name: 'Lương 5 Triệu', description: 'Phân phối lạc hậu', weight: 5, category: Category.QHSX, icon: '🍜', tooltip: 'Kìm hãm con người.' },
  { id: 'q-2', name: 'Lương Senior USD', description: 'Đãi ngộ xứng tầm', weight: 45, category: Category.QHSX, icon: '💰', tooltip: 'Phân phối hiện đại.' },
  { id: 'q-3', name: 'Micro-management', description: 'Quản lý gò bó', weight: -15, category: Category.QHSX, icon: '👁️', tooltip: 'Quan hệ quản lý lỗi thời.' },
  { id: 'q-4', name: 'Quy trình Agile', description: 'Linh hoạt, tự chủ', weight: 25, category: Category.QHSX, icon: '🌀', tooltip: 'Hình thức tổ chức tiến bộ.' },
  { id: 'q-5', name: 'Thưởng Performance', description: 'Khuyến khích nỗ lực', weight: 20, category: Category.QHSX, icon: '🏆', tooltip: 'Quan hệ phân phối động lực.' },
  { id: 'q-6', name: 'Career Path', description: 'Lộ trình thăng tiến', weight: 30, category: Category.QHSX, icon: '🚀', tooltip: 'Định hướng phát triển.' },
  { id: 'q-7', name: 'Văn hóa Creative', description: 'Tự do sáng tạo', weight: 22, category: Category.QHSX, icon: '🎨', tooltip: 'Môi trường lý tưởng.' },
  { id: 'q-8', name: 'OKR Framework', description: 'Quản trị theo mục tiêu', weight: 15, category: Category.QHSX, icon: '🎯', tooltip: 'Tổ chức quản lý chuẩn quốc tế.' }
];

export const REAL_FACTS: Fact[] = [
  { id: 1, content: "LLSX quyết định QHSX. Khi LLSX thay đổi, QHSX sớm muộn cũng phải thay đổi theo.", source: "Nguyên lý Triết học" },
  { id: 2, content: "Nếu QHSX 'vượt trước' trình độ LLSX quá xa, nó sẽ dẫn đến bệnh hình thức và lãng phí.", source: "Kinh nghiệm thực tiễn" },
  { id: 3, content: "Mâu thuẫn giữa LLSX và QHSX là động lực của mọi cuộc cách mạng xã hội.", source: "Học thuyết Mác-Lênin" }
];
