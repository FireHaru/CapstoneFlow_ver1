                                                             

export const DEMO_LOGIN = { email: "an.nguyen@capstoneflow.edu.vn", password: "demo1234" };

export const lecturers             = [
  { id: 1, fullName: "TS. Nguyễn Văn An", title: "Tiến sĩ", department: "Khoa Công nghệ Phần mềm", email: "an.nguyen@capstoneflow.edu.vn" },
  { id: 2, fullName: "ThS. Trần Thị Bích Ngọc", title: "Thạc sĩ", department: "Khoa Hệ thống Thông tin", email: "ngoc.tran@capstoneflow.edu.vn" },
  { id: 3, fullName: "PGS.TS. Lê Minh Quân", title: "Phó Giáo sư", department: "Khoa Khoa học Máy tính", email: "quan.le@capstoneflow.edu.vn" },
];

export const seedTopics          = [
  {
    id: 1, lecturerId: 1,
    title: "Hệ thống gợi ý khóa học cá nhân hóa dựa trên hành vi học tập",
    description: "Xây dựng nền tảng web thu thập dữ liệu tương tác của sinh viên với học liệu và đề xuất lộ trình khóa học phù hợp bằng các kỹ thuật lọc cộng tác và nội dung.",
    objectives: "Thiết kế pipeline thu thập dữ liệu hành vi.\nTriển khai mô hình gợi ý và đánh giá độ chính xác.\nXây dựng dashboard trực quan cho sinh viên.",
    requirements: "Nắm vững JavaScript/React.\nCó kiến thức cơ bản về SQL.\nƯu tiên sinh viên đã học môn Học máy.",
    technologies: ["Next.js", "PostgreSQL", "Python", "Prisma"],
    maxStudents: 3, status: "OPEN", createdAt: "2026-10-02T08:00:00Z", updatedAt: "2026-11-05T09:30:00Z",
  },
  {
    id: 2, lecturerId: 1,
    title: "Ứng dụng quản lý phòng lab và đặt lịch thiết bị thời gian thực",
    description: "Phát triển ứng dụng giúp sinh viên đặt lịch sử dụng phòng lab, thiết bị; giảng viên duyệt và theo dõi tình trạng thiết bị theo thời gian thực.",
    objectives: "Phân tích quy trình đặt lịch hiện tại.\nXây dựng hệ thống đặt lịch tránh trùng lặp.\nTích hợp thông báo qua email.",
    requirements: "Biết React hoặc Vue.\nHiểu REST API.",
    technologies: ["React", "Node.js", "PostgreSQL"],
    maxStudents: 2, status: "OPEN", createdAt: "2026-10-10T08:00:00Z", updatedAt: "2026-11-01T10:00:00Z",
  },
  {
    id: 3, lecturerId: 1,
    title: "Nền tảng số hóa hồ sơ đồ án tốt nghiệp của khoa",
    description: "Lưu trữ, tra cứu và trình bày các đồ án tốt nghiệp đã bảo vệ giúp sinh viên khóa sau tham khảo, hỗ trợ tìm kiếm toàn văn theo chủ đề và công nghệ.",
    objectives: "Thiết kế cơ sở dữ liệu hồ sơ đồ án.\nXây dựng tìm kiếm toàn văn.",
    requirements: "Có kinh nghiệm làm web cơ bản.",
    technologies: ["Next.js", "Prisma", "Neon"],
    maxStudents: 2, status: "CLOSED", createdAt: "2026-09-12T08:00:00Z", updatedAt: "2026-10-20T08:00:00Z",
  },
  {
    id: 4, lecturerId: 2,
    title: "Phân tích cảm xúc phản hồi sinh viên về chất lượng giảng dạy",
    description: "Thu thập phản hồi khảo sát cuối kỳ, áp dụng mô hình xử lý ngôn ngữ tự nhiên tiếng Việt để phân loại cảm xúc và tổng hợp báo cáo cho khoa.",
    objectives: "Xây dựng bộ dữ liệu phản hồi tiếng Việt.\nHuấn luyện và so sánh các mô hình phân loại.\nTrực quan hóa kết quả theo học phần.",
    requirements: "Biết Python.\nĐã học Xử lý ngôn ngữ tự nhiên là lợi thế.",
    technologies: ["Python", "PhoBERT", "FastAPI"],
    maxStudents: 2, status: "OPEN", createdAt: "2026-10-05T08:00:00Z", updatedAt: "2026-11-03T08:00:00Z",
  },
  {
    id: 5, lecturerId: 2,
    title: "Hệ thống quản lý thư viện số tích hợp mã QR",
    description: "Ứng dụng web và di động hỗ trợ mượn trả sách bằng mã QR, theo dõi hạn trả và gợi ý sách theo ngành học của sinh viên.",
    objectives: "Xây dựng quy trình mượn trả bằng QR.\nThiết kế giao diện thân thiện trên di động.",
    requirements: "Biết JavaScript.\nCó tinh thần làm việc nhóm.",
    technologies: ["React Native", "Node.js", "MongoDB"],
    maxStudents: 3, status: "OPEN", createdAt: "2026-10-15T08:00:00Z", updatedAt: "2026-10-28T08:00:00Z",
  },
  {
    id: 6, lecturerId: 3,
    title: "Nhận diện biển số xe trong bãi giữ xe của trường bằng thị giác máy tính",
    description: "Ứng dụng mô hình phát hiện và nhận dạng ký tự để tự động ghi nhận xe ra vào bãi giữ xe, giảm thời gian chờ và hạn chế sai sót.",
    objectives: "Thu thập và gán nhãn dữ liệu ảnh biển số.\nHuấn luyện mô hình YOLO và OCR.\nTriển khai demo thời gian thực.",
    requirements: "Thành thạo Python.\nĐã học Thị giác máy tính hoặc Học sâu.",
    technologies: ["Python", "YOLO", "OpenCV"],
    maxStudents: 2, status: "OPEN", createdAt: "2026-10-01T08:00:00Z", updatedAt: "2026-11-06T08:00:00Z",
  },
  {
    id: 7, lecturerId: 3,
    title: "Chatbot hỗ trợ tư vấn tuyển sinh dựa trên mô hình ngôn ngữ lớn",
    description: "Xây dựng chatbot trả lời câu hỏi tuyển sinh dựa trên tài liệu chính thức của trường bằng kỹ thuật truy xuất tăng cường (RAG).",
    objectives: "Xây dựng kho tri thức tuyển sinh.\nTriển khai RAG và đánh giá chất lượng câu trả lời.",
    requirements: "Biết Python hoặc TypeScript.\nQuan tâm đến AI ứng dụng.",
    technologies: ["Next.js", "LLM", "PostgreSQL"],
    maxStudents: 3, status: "OPEN", createdAt: "2026-10-20T08:00:00Z", updatedAt: "2026-11-08T08:00:00Z",
  },
  {
    id: 8, lecturerId: 2,
    title: "Dashboard theo dõi tiến độ học tập cho cố vấn học tập",
    description: "Tổng hợp điểm, tín chỉ và cảnh báo học vụ giúp cố vấn học tập nắm bắt nhanh tình hình của từng sinh viên trong lớp phụ trách.",
    objectives: "Thiết kế dashboard trực quan.\nXây dựng cảnh báo học vụ tự động.",
    requirements: "Biết React và SQL.",
    technologies: ["React", "Recharts", "PostgreSQL"],
    maxStudents: 2, status: "CLOSED", createdAt: "2026-09-20T08:00:00Z", updatedAt: "2026-10-18T08:00:00Z",
  },
];

export const seedRegistrations                 = [
  { id: 1, topicId: 1, studentName: "Phạm Gia Huy", studentCode: "SE170123", studentEmail: "huy.pg@student.edu.vn", studentPhone: "0901234567", studentClass: "SE1701", message: "Em đã làm đồ án môn về hệ thống gợi ý phim, rất mong được tham gia đề tài của thầy.", status: "NEW", createdAt: "2026-11-09T14:20:00Z" },
  { id: 2, topicId: 1, studentName: "Võ Thị Mai Anh", studentCode: "SE170456", studentEmail: "anh.vtm@student.edu.vn", studentPhone: "0912345678", studentClass: "SE1702", message: "Em có kinh nghiệm với React và PostgreSQL.", status: "CONTACTED", createdAt: "2026-11-07T09:05:00Z" },
  { id: 3, topicId: 2, studentName: "Đỗ Minh Khang", studentCode: "SE170789", studentEmail: "khang.dm@student.edu.vn", studentPhone: "0987654321", studentClass: "SE1701", message: "Nhóm em gồm 2 bạn, muốn trao đổi thêm về phạm vi.", status: "NEW", createdAt: "2026-11-10T08:40:00Z" },
  { id: 4, topicId: 1, studentName: "Ngô Thanh Tâm", studentCode: "SE171011", studentEmail: "tam.nt@student.edu.vn", studentPhone: "0934567890", studentClass: "SE1703", message: "", status: "NEW", createdAt: "2026-11-10T16:10:00Z" },
  { id: 5, topicId: 3, studentName: "Bùi Quốc Bảo", studentCode: "SE170222", studentEmail: "bao.bq@student.edu.vn", studentPhone: "0909888777", studentClass: "SE1702", message: "Em quan tâm phần tìm kiếm toàn văn.", status: "CONTACTED", createdAt: "2026-10-15T10:00:00Z" },
  { id: 6, topicId: 4, studentName: "Lý Hoàng Yến", studentCode: "IS170333", studentEmail: "yen.lh@student.edu.vn", studentPhone: "0977111222", studentClass: "IS1701", message: "", status: "NEW", createdAt: "2026-11-08T11:00:00Z" },
  { id: 7, topicId: 6, studentName: "Trịnh Đức Long", studentCode: "AI170444", studentEmail: "long.td@student.edu.vn", studentPhone: "0966333444", studentClass: "AI1701", message: "Em đã từng làm dự án YOLO.", status: "NEW", createdAt: "2026-11-09T13:00:00Z" },
];
