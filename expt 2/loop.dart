import 'dart:io';

void main() {
  // Prompt user for input
  print('Enter a number: ');
  
  // Read user input
  String? input = stdin.readLineSync();

  // Convert input to integer
  int number = int.parse(input!);

  // Print numbers from 1 to entered number
  print('Numbers from 1 to $number:');
  for (int i = 1; i <= number; i++) {
    print(i);
  }
}
