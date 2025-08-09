class Attendance {
  final int id;
  final int userId;
  final String date; // Still store as String
  final String status;

  Attendance({
    required this.id,
    required this.userId,
    required this.date,
    required this.status,
  });

  factory Attendance.fromJson(Map<String, dynamic> json) {
    return Attendance(
      id: json['id'],
      userId: json['user_id'],
      date: json['created_at'], // Support both keys
      status: json['status'],
    );
  }
}
