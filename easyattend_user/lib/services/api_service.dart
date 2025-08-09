import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/user.dart';
import '../models/attendance.dart';
import 'package:intl/intl.dart';


const String baseUrl = 'http://192.168.43.248:5000/api'; // Replace with your IP

class ApiService {
  static Future<List<User>> getUsers() async {
    final response = await http.get(Uri.parse('$baseUrl/users'));
    if (response.statusCode == 200) {
      List jsonData = json.decode(response.body);
      return jsonData.map((e) => User.fromJson(e)).toList();
    } else {
      throw Exception('Failed to load users');
    }
  }

  static Future<void> markAttendance(int userId, String status) async {
    final response = await http.post(
      Uri.parse('$baseUrl/attendance'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({
        'user_id': userId,
        'status': status, // No date sent here
      }),
    );

    if (response.statusCode != 200) {
      print('Error: ${response.statusCode} - ${response.body}');
      throw Exception('Failed to mark attendance');
    } else {
      print('Attendance marked successfully: ${response.body}');
    }
  }


  static Future<List<Attendance>> getAttendanceHistory(int userId) async {
    final response = await http.get(Uri.parse('$baseUrl/attendance/user/$userId'));

    if (response.statusCode == 200) {
      List jsonData = json.decode(response.body);
      return jsonData.map((e) => Attendance.fromJson(e)).toList();
    } else {
      throw Exception('Failed to load attendance');
    }
  }
}
