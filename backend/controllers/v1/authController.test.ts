import request from 'supertest';
import app from '../../server';
import User from '../../models/v1/userModel';

describe('Authentication Controller', () => {
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/auth/sign-up')
            .send({
                fullName: 'John Doe',
                email: 'john.doe@example.com',
                password: 'password123',
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', 'User registered successfully');
    });

    it('should handle missing fields in the request body', async () => {
        const response = await request(app)
            .post('/api/auth/sign-up')
            .send({});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Missing required fields in the request body');
    });

    it('should handle existing user', async () => {
        // You may need to create a user in the database or use a mock/stub for User.findOne
        // to simulate an existing user.
        // This example assumes a mock implementation.
        jest.mock('../../models/v1/userModel', () => {
            return {
                findOne: jest.fn().mockResolvedValue({ email: 'existing@example.com' }),
            };
        });

        const response = await request(app)
            .post('/api/auth/sign-up')
            .send({
                fullName: 'John Doe',
                email: 'existing@example.com',
                password: 'password123',
            });

        expect(response.status).toBe(409);
        expect(response.body).toHaveProperty('error', 'User with this email already exists');
    });
});

