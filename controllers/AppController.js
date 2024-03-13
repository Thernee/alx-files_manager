// import express from 'express';
import db from '../utils/db';
import redisClient from '../utils/redis';

export const getStatus = (req, res) => res.status(200).json({
  redis: db.isAlive(),
  db: redisClient.isAlive(),
});

export const getStats = (req, res) => res.status(200).json({
  users: db.nbUsers(),
  files: db.nbFiles(),
});
