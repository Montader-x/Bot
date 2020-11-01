const db = require("quick.db");
const moment = require("moment");
const storeModel = require('../models/store')
const userModel = require('../models/userEco')
/**
 * @param {string} guildId
 * @param {string} userId
 * @returns {Promise}
 */
const getUserMoney = async (guildId, userId) => {
  const user = await userModel.findOne({ userID: userId })
  if(!user) {
    const aa = new userModel({ userID: userId})
    aa.save()
  }
  
  return user.money
}
/**
 * @param {string} guildId
 * @param {string} userId
 * @returns {Promise}
 */
const getUserBank = async (guildId, userId) => {
  const user = await userModel.findOne({ userID: userId })
  if(!user) {
    const aa = new userModel({ userID: userId})
    aa.save()
  }
  
  return user.bank
}

/**
 * @param {string} guildId
 * @param {string} userId
 * @param {number} amount
 */
const addUserMoney = async (guildId, userId, amount) => {
  const user = await userModel.findOne({ userID: userId })
  if(!user) {
    const aa = new userModel({ userID: userId})
    aa.save()
  }
  const currentMon = user.money
  return user.updateOne({ userID: userId, money: currentMon + amount})
}

/**
 * @param {string} guildId
 * @param {string} userId
 * @param {number} amount
 */
const addUserBank = async (guildId, userId, amount) => {
  const user = await userModel.findOne({ userID: userId })
  if(!user) {
    const aa = new userModel({ userID: userId})
    aa.save()
  }
  const current = user.bank
  return user.updateOne({ userID: userId, bank: current + amount})
}

/**
 * @param {String} guildId
 * @param {String} userId
 * @param {Number} amount
 */
const removeUserBank = async (guildId, userId, amount) => {
  const user = await userModel.findOne({ userID: userId })
  if(!user) {
    const aa = new userModel({ userID: userId})
    aa.save()
  }
  const current = user.bank
  return user.updateOne({ userID: userId, bank: current - amount})
}

/**
 * @param {string} guildId
 * @param {string} userId
 * @param {number} amount
 */
const removeUserMoney = async (guildId, userId, amount) => {
  const user = await userModel.findOne({ userID: userId })
  if(!user) {
    const aa = new userModel({ userID: userId})
    aa.save()
  }
  const currentMon = user.money
  return user.updateOne({ userID: userId, money: currentMon - amount})
}

/**
 * @param {string} guildId
 * @param {string} userId
 */
const getUserDaily = (guildId, userId) =>
  db.fetch(`daily_${guildId}_${userId}`);

/**
 * @param {string} guildId
 * @param {string} userId
 * @param {string} date
 */
const setUserDaily = (guildId, userId, date) =>
  db.set(`daily_${guildId}_${userId}`, date);

/**
 * @param {string} guildId
 * @param {string} userId
 */
const getUserWork = (guildId, userId) => db.fetch(`work_${guildId}_${userId}`);

/**
 * @param {string} guildId
 * @param {string} userId
 * @param {string} date
 */
const setUserWork = (guildId, userId, date) =>
  db.set(`work_${guildId}_${userId}`, date);

/**
 * @param {string} guildId
 * @param {string} userId
 */
const getUserInventory = (guildId, userId) =>
  db.fetch(`inventory_${guildId}_${userId}`);

/**
 * @param {string} guildId
 * @param {string} userId
 * @param {string} newItem
 */
const setUserInventory = (guildId, userId, newItem) =>
  db.push(`inventory_${guildId}_${userId}`, newItem);

/**
 * @param {string} guildId
 */
const getStoreItems = (guildId) => db.fetch(`store_${guildId}`);

/**
 * @param {string} guildId
 * @param {string} newItem
 */
const setStoreItems = (guildId, newItem) =>
  db.push(`store_${guildId}`, newItem);

/**
 * @param {string} guildId
 * @param {Array} updatedItems
 */
const removeStoreItem = (guildId, updatedItems) =>
  db.set(`store_${guildId}`, updatedItems);
  module.exports = {
    getUserMoney,
    getUserBank,
    addUserMoney,
    addUserBank,
    removeUserBank,
    removeUserMoney,
    getUserDaily,
    setUserDaily,
    getUserWork,
    setUserWork,
    getUserInventory,
    getStoreItems,
    setStoreItems,
    removeStoreItem,
    setUserInventory
}