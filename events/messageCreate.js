/**
 * @param {import('discord.js').Client} bot 
 * @param {import('discord.js').Message} message 
*/

const { blockedCommands } = require("../config.json");
const { allowUsers } = require("../config.json");

const { exec } = require('child_process');
const { writeFileSync, unlinkSync } = require('fs');
const { tmpdir } = require('os');
const { join } = require('path');

const screenshot = require('screenshot-desktop');
const fs = require('fs');

module.exports = async (bot, message) => {
}
