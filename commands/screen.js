const { allowUsers } = require("../config.json");
const screenshot = require('screenshot-desktop');
const { AttachmentBuilder } = require('discord.js');

module.exports = async (bot, message, args, argsF) => {
    if (!allowUsers.includes(message.author.id)) {
        return message.reply({
            content: "Вам это незя",
            ephemeral: true
        });
    }

    try {
        const img = await screenshot();
        const attachment = new AttachmentBuilder(img, { name: 'screenshot.png' });
        return message.reply({
            content: 'Вот ваш скриншот:',
            files: [attachment],
            ephemeral: true
        });
    } catch (err) {
        console.error('Ошибка при создании или отправке скриншота:', err);
        return message.reply({
            content: 'Произошла ошибка при создании скриншота.',
            ephemeral: true
        });
    }
};

module.exports.names = ["screen"];
module.exports.interaction = {
    name: 'screen',
    description: 'Сделать скриншот с сервера',
    defaultPermission: true,
};
