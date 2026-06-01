import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

// Signup Step 1: Basic Info
router.post('/signup', async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phone } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, error: 'Email is required' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'User already exists' });
    }

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phoneNumber: phone,
      },
    });

    res.status(201).json({ success: true, data: { email: user.email } });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Signup Step 2: Set Password
router.post('/password/create', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    res.json({ success: true, message: 'Password set successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Forgot Password: Send OTP
router.post('/forgot-password', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, error: 'Email is required' });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // Don't reveal user existence for security, but frontend needs to know where to go
      // For this demo, let's just return success
      return res.json({ success: true, message: 'If email exists, code was sent.' });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    await prisma.user.update({
      where: { email },
      data: {
        verificationCode: code,
        resetTokenExpires: expires,
      },
    });

    console.log(`[EMAIL SIMULATION] Reset code for ${email}: ${code}`);
    res.json({ success: true, message: 'Code sent successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Verify OTP
router.post('/verify-code', async (req: Request, res: Response) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) return res.status(400).json({ success: false, error: 'Email and code are required' });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.verificationCode !== code || !user.resetTokenExpires || user.resetTokenExpires < new Date()) {
      return res.status(400).json({ success: false, error: 'Invalid or expired code' });
    }

    res.json({ success: true, message: 'Code verified' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Reset Password
router.post('/reset-password', async (req: Request, res: Response) => {
  try {
    const { email, code, newPassword } = req.body;
    if (!email || !code || !newPassword) return res.status(400).json({ success: false, error: 'All fields are required' });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.verificationCode !== code || !user.resetTokenExpires || user.resetTokenExpires < new Date()) {
      return res.status(400).json({ success: false, error: 'Invalid or expired session' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        verificationCode: null,
        resetTokenExpires: null,
      },
    });

    res.json({ success: true, message: 'Password reset successful' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
