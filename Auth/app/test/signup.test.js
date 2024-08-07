const { BadRequestError,DatabaseConnectionError } = require('@sumanauth/common'); 
require('dotenv').config();
const {signup} = require('../api/authentication.api');
const {dbSync} = require('../lib/db-handeler') 

describe('signup', () => {
  test('should create a new user successfully', async () => {
    const userData = {
        Username: 'testuser1',
        password: 'testpassword',
        Email: 'test@example.com',
        FullName: 'Test User'
      };
    const result = await signup(userData);
    expect(result).toBe('user created successfully');
  });

  test('should throw BadRequestError if user already exists', async () => {
    const userData = {
        Username: 'testuser1',
        password: 'testpassword',
        Email: 'test@example.com',
        FullName: 'Test User'
      };

    await expect(signup(userData)).rejects.toThrow(BadRequestError);
  });

  // test('should throw an error if any error occurs during signup', async () => {
  //   const userData = {
  //     Username: 'testuser',
  //     password: 'testpassword',
  //     Email: 'test@example.com',
  //     FullName: 'Test User'
  //   };

  //   // Assuming a mock implementation of users.create() that throws an error
  //   users.create = jest.fn().mockRejectedValue(new DatabaseConnectionError());

  //   await expect(signup(userData)).rejects.toThrow(DatabaseConnectionError);
  // });

    test('dataBase clear', async () => {
      const result = await dbSync(); 
      expect(result).toBe('Database recreated');
  });
});
