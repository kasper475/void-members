const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');

const app = express();
const PORT = process.env.PORT || 3000;

// ===== بياناتك =====
const TOKEN = 'MTUwNTIzMDg3NjE2MDgyMzUwOQ.GnHsmI.K-e3TxhL-KvqXFckypLCXooVtjbY1v2XH8I1Wk';     // 🔑 التوكن بعد ما تسوي Reset
const SERVER_ID = '1229170988672094329';   // ✅ ID السيرفر
// ==================

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

let totalMembers = 0;

client.once('ready', async () => {
    console.log(`✅ البوت شغال كـ ${client.user.tag}`);
    
    try {
        const guild = await client.guilds.fetch(SERVER_ID);
        await guild.members.fetch();
        totalMembers = guild.memberCount;
        console.log(`📊 عدد الأعضاء الكلي: ${totalMembers}`);
        
        setInterval(async () => {
            const updatedGuild = await client.guilds.fetch(SERVER_ID);
            await updatedGuild.members.fetch();
            totalMembers = updatedGuild.memberCount;
            console.log(`🔄 تم التحديث: ${totalMembers} عضو`);
        }, 5 * 60 * 1000);
        
    } catch (error) {
        console.error('❌ خطأ:', error);
    }
});

app.get('/api/members', (req, res) => {
    res.json({ 
        totalMembers: totalMembers,
        serverId: SERVER_ID
    });
});

app.listen(PORT, () => {
    console.log(`🚀 البوت شغال على المنفذ ${PORT}`);
});

client.login(TOKEN);