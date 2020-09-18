const db = require("quick.db");
const moment = require("moment");
/**
 * @param {string} guildId
 * @param {string} userId
 * @returns {Promise}
 */
const getUserMoney = (guildId, userId) =>
  db.fetch(`money_${guildId}_${userId}`);
/**
 * @param {string} guildId
 * @param {string} userId
 * @returns {Promise}
 */
const getUserBank = (guildId, userId) => db.fetch(`bank_${guildId}_${userId}`);

/**
 * @param {string} guildId
 * @param {string} userId
 * @param {number} amount
 */
const addUserMoney = (guildId, userId, amount) =>
  db.add(`money_${guildId}_${userId}`, amount);

/**
 * @param {string} guildId
 * @param {string} userId
 * @param {number} amount
 */
const addUserBank = (guildId, userId, amount) =>
  db.add(`bank_${guildId}_${userId}`, amount);

/**
 * @param {String} guildId
 * @param {String} userId
 * @param {Number} amount
 */
const removeUserBank = (guildId, userId, amount) =>
  db.subtract(`bank_${guildId}_${userId}`, amount);

/**
 * @param {string} guildId
 * @param {string} userId
 * @param {number} amount
 */
const removeUserMoney = (guildId, userId, amount) =>
  db.subtract(`money_${guildId}_${userId}`, amount);

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