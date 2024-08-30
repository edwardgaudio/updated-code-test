require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getDB } = require('../db/index');

const { JWT_SECRET } = process.env;
const db = getDB();
const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{6,}$/;

const signup = async (body) => {
  const { username, password, is_test } = body;
  
  if (!username || !password) {
    // console.warn('Missing Usernamelkjljkljj or password', username, password);
    return {
      status: 422,
      message: 'Missing Username or password',
    }
  } else {
    const passwordPasses = passRegex.test(password);
    if (!passwordPasses) {
      // console.warn('Password didnt pass regex');
      return {
        status: 422,
        message: 'Password can only contain letters, numbers or @$#!%*?& special characters. Password must contain and uppercase letter and number.',
      }
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const exists = await db('users')
    .select('username')
    .where('username', username)
    .first();

  if (exists) {
    // console.warn('user already exists');
    return {
      status: 422,
      message: 'User already exists',
    }
  }

  const results = await db('users')
    .insert({
      username,
      password: hashedPassword,
      is_test,
    })
    .returning('*');

  const tokenData = {
    id: results[0].id,
    username: results[0].username,
    is_test: results[0].is_test,
  }

  const token = jwt.sign(tokenData, JWT_SECRET);

  return {
    status: 200,
    data: {
      userData: tokenData,
      token,
    }
  }
}

const login = async (body) => {
  const { username, password } = body;

  if (!username || !password) {
    return {
      status: 422,
      message: 'Missing username or password',
    }
  }

  const user = await db('users')
    .select(['*'])
    .where({ username })
    .first();
    
  if (!user) {
    return {
      status: 401,
      message: 'Mismatching username and username',
    }
  }

  const isUser = await bcrypt.compare(password, user.password);

  if (!isUser) {
    return {
      status: 401,
      message: 'Mismatching password and username',
    }
  }

  const tokenData = {
    id: user.id,
    username: user.username,
  }

  const token = jwt.sign(tokenData, JWT_SECRET);
  
  return {
    status: 200,
    data:{
      token,
    }
  }
}

module.exports = {
  signup,
  login,
}