const { promisify } = require('util');
const execAsync = promisify(require('child_process').exec);

const { writeFileSync, unlinkSync } = require('fs');
const { tmpdir } = require('os');
const { join } = require('path');

const { blockedCommands, allowUsers } = require("../config.json");

module.exports = async (bot, message, args, argsF) => {
    if (!allowUsers.includes(message.author.id)) {
        return message.reply({
            content: "Отказано в доступе.",
            ephemeral: true
        });
    }

    const cmd = args.command.toLowerCase();

    if (blockedCommands.some(el => cmd.includes(el))) {
        return message.reply({
            content: "Заблокированная команда.",
            ephemeral: true
        });
    }

    const batFilePath = join(tmpdir(), 'temp_batch_file.bat');

    writeFileSync(batFilePath, cmd);

    try {
        await execAsync(batFilePath);
        return message.reply({
            content: "Наверно готово",
            ephemeral: true
        });
    } catch (error) {
        return message.reply({
            content: `Ошибка:\n${error}`,
            ephemeral: true
        });
    } finally {
        unlinkSync(batFilePath);
    }
};
module.exports.names = ["eval"];
module.exports.interaction = {
    name: 'eval',
    description: 'Выполнить команду на сервере',
    options: [
        {
            name: "command",
            description: "Команда для выполнения",
            type: 3,
            required: true
        }
    ],
    defaultPermission: true,
};