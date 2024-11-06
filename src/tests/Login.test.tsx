import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Login  from '../routes/Login/index';
import * as authService from '../services/auth-services';
// import * as walletRepository from '../../localstorage/wallet-repository';
import {expect, jest, test} from '@jest/globals';
import  React from 'react';


jest.mock('../services/auth-services');  
jest.mock('../localstorage/wallet-repository');

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate
}));

const mockSetContextTokenPayload = jest.fn();
jest.mock('../utils/context-token', () => ({
    useContext: () => ({
        setContextTokenPayload: mockSetContextTokenPayload
    })
}));


describe('Login Component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders login form and submits valid data', async () => {
     
        const component = render(<Login />);
        const labelNode = component.getByText("Email:");
        expect(labelNode).toBeDefined();

        fireEvent.change(screen.getByPlaceholderText(/Enter your email.../), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/Enter your password.../), { target: { value: 'password123' } });
        fireEvent.click(screen.getByText(/Authenticate.../));

        await waitFor(() => {
            expect(authService.loginRequest).toHaveBeenCalledWith({ username: 'test@example.com', password: 'password123' });
            expect(mockNavigate).toHaveBeenCalledWith('/operations');
        });
    });

    test('displays error when login fails', async () => {
        jest.mocked(authService.loginRequest).mockRejectedValue({
            message: "Network Error",
            response: { data: { message: 'Access denied' } }
        });

        render(<Login />);

        fireEvent.change(screen.getByPlaceholderText(/Enter your email.../), { target: { value: 'wrong@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/Enter your password.../), { target: { value: 'wrongpassword' } });
        fireEvent.click(screen.getByText(/Authenticate.../));

        await waitFor(() => {
            expect(screen.getByText(/Username or password invalid!/)).toBeCalled();
            expect(mockNavigate).toHaveBeenCalledWith('/home');
        });
    });
});